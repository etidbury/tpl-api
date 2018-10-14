// @flow

import path from 'path'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export default (fastify: FastifyInstance, opts: Object, next: () => void) => {
    fastify.get('/User', async (req: FastifyRequest, reply: FastifyReply) => {
        const { dataValues } = await req.model('User').findAll()

        reply.send(dataValues || [])
    })

    next()
}
