// @flow

import path from 'path'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export default (fastify: FastifyInstance, opts: Object, next: () => void) => {
    fastify.get('/testauth', async (req: FastifyRequest, reply: FastifyReply) => {

        await req.auth.hasScopes(['moderator'])

        const { dataValues } = await req.model('User').findAll()

        reply.send(dataValues || [])
    })

    next()
}
