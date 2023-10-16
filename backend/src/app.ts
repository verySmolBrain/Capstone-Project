import Fastify, { FastifyServerOptions } from 'fastify'
import chatRoute from '@Source/routes/chat'
import inventoryRoute from '@Source/routes/inventory'
import profileRoute from '@Source/routes/profile'
import waresRoute from '@Source/routes/wares'
import wishlistRoute from '@Source/routes/wishlist'
import { validateUser } from './utils/supabaseUtils'

export const build = async (opt: FastifyServerOptions) => {
  const fastify = Fastify(opt)

  fastify.register(chatRoute)
  fastify.register(inventoryRoute)
  fastify.register(profileRoute)
  fastify.register(waresRoute)
  fastify.register(wishlistRoute)

  // checks if user is authenticated before every request
  // handlers are guaranteed to be given a valid user
  fastify.addHook('onRequest', async (request) => {
    const token = request.headers['authorization']

    if (!token) {
      throw new Error('Unauthorized')
    }

    const isValid = await validateUser(token)

    if (!isValid) {
      throw new Error('Unauthorized')
    }
  })

  return fastify
}
