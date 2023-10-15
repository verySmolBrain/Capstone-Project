import Fastify, { FastifyServerOptions } from 'fastify'
import chatRoute from '@Source/routes/chat'
import collectionRoute from '@Source/routes/collection'
import profileRoute from '@Source/routes/profile'
import waresRoute from '@Source/routes/wares'
import wishlistRoute from '@Source/routes/wishlist'

export const build = async (opt: FastifyServerOptions) => {
  const fastify = Fastify(opt)

  fastify.register(chatRoute)
  fastify.register(collectionRoute)
  fastify.register(profileRoute)
  fastify.register(waresRoute)
  fastify.register(wishlistRoute)

  return fastify
}
