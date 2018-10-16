
// @flow

import path from 'path'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export default (fastify: FastifyInstance, opts: Object, next: () => void) => {
    
    fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
        reply.send({ version: require('../package').version })
    })

    next()
}
