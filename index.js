const { 
    NODE_ENV , 
    DISABLE_LOGS , 
    USE_SEQUELIZE , 
    LOG_LEVEL, 
    HOST , 
    PORT ,
    FIXTURES
} = process.env

const isProd = NODE_ENV === 'production'

// Disable console logs
if (DISABLE_LOGS) {
    
    const noOp = function(){} // no-op function

    const names = ['log', 'debug', 'info', 'warn', 'error',
        'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time',
        'timeEnd', 'count', 'trace', 'profile', 'profileEnd']

    if (typeof window !== 'undefined'){

        names.forEach((name)=>{
            window.console[name] = noOp
        })
      
    }
    
    if (typeof global.console !== 'undefined'){
        names.forEach((name)=>{
            global.console[name] = noOp
        })
    }
      
}

let _log

if (!DISABLE_LOGS) {
    const pino = require('pino')
    const pretty = pino.pretty()
    pretty.pipe(process.stdout)
    _log = pino({ 
        level: LOG_LEVEL || 'info' // @ref: http://getpino.io/#/docs/api?id=level-string
    }, pretty)
}

const fastify = require('fastify')({ logger: _log || false })

// Pretty prints all available routes ( fastify.blipp() inside callback to fastify.listen() )
if (!DISABLE_LOGS) {
    fastify.register(require('fastify-blipp'))
}

// Avoid throwing 404 with /favicon.ico
fastify.register(require('fastify-no-icon'))

// Parse form data
fastify.register(require('fastify-formbody'))

// https://expressjs.com/en/advanced/best-practice-security.html
fastify.register(require('fastify-helmet'))

// tip: set to {global:false} and use reply.compress() where needed
fastify.register(require('fastify-compress'), { global: true })

fastify.use(require('cors')())

fastify.register(require('fastify-multipart'))
fastify.register(require('fastify-sensible'))

if (USE_SEQUELIZE) {
    fastify.register(require('tpl-api-helpers').fastifySequelizeAndRoutesPlugin)
}else {
    fastify.register(require('tpl-api-helpers').routesPlugin)
}

if (!PORT || !PORT.length) {
    throw new TypeError('Required environment variable not set: PORT')
}

// Start server
fastify.listen(
    PORT,
    HOST || '0.0.0.0',
    async (err, address) => {
        try {
        
            if (err) {
                throw err
            }

            if (fastify.blipp) {
                fastify.blipp()
            }else {
                console.info(`> Ready at ${address}`)
            }

        }catch(err){
            console.error(err)
            // console.trace(err)
            process.exit(1)
        }
    }
    
)
