module.exports = (fastify, opts, next) => {
    
    fastify.get(
        '/hello',
        {
            schema: {
                querystring: {
                    name: { type: 'string' }
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            hello: { type: 'string' }
                        }
                    }
                }
            }
        },
        (req, reply) => {
            req.log.info('Hello', req.query.name)
            reply.send({ hello: req.query.name || 'world' })
        }
    )

    fastify.get(
        '/users',
        {
            schema: {}
        },
        async ({ model, log, sequelize }, reply) => {
            log.info('Finding users...')

            const users = await model('User')
                .findAll()

            reply.send({ users })
        }
    )

    // fastify.get(
    //     '/users/:userId/tasks',
    //     {
    //         schema: {
    //             params: {
    //                 userId: { type: 'integer' }
    //             },
    //             response: {
    //                 200: {
    //                     type: 'array',
    //                     items: {
    //                         type: 'object',
    //                         properties: {
    //                             title: { type: 'string' }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     ({ model, log, sequelize, params }, reply) => {
    //         log.info('Finding tasks...')

    //         return model('Task')
    //             .findAll({ where: { UserId: params.userId } })
    //             .then(data => {
    //                 reply.send(data)

    //                 next()
    //             })
    //     }
    // )

    next()
}
