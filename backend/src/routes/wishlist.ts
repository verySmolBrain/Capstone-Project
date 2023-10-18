import { FastifyInstance, FastifyRequest } from 'fastify'
import { extractId, requestHandler } from '@Source/utils/supabaseUtils'
import { Id } from '@Source/utils/utils'

export default async function (fastify: FastifyInstance) {
  /*
   *  GET /wishlist
   *  Returns the user's wishlist
   *  @returns {object} wishlist
   */
  fastify.get(
    '/wishlist',
    async (req: FastifyRequest<{ Body: { collectableId: string } }>) => {
      const token = req.headers['authorization'] as string

      const prisma = await requestHandler(token)

      const profile = await prisma.profile.findUniqueOrThrow({
        where: {
          id: extractId(token),
        },
        include: { wishlist: true },
      })
      return profile.wishlist
    }
  )

  /*
   *  PUT /wishlist
   *  Update the user's wishlist
   *  @param {Id[]} collectableIds
   *  @returns {object} wishlist
   */
  fastify.put(
    '/wishlist',
    async (req: FastifyRequest<{ Body: { collectableIds: Id[] } }>) => {
      const token = req.headers['authorization'] as string
      const prisma = await requestHandler(token)

      // TODO: enforce wishlist is a subset of inventory
      const profile = await prisma.profile.update({
        where: { id: extractId(token) },
        data: {
          wishlist: {
            set: req.body.collectableIds,
          },
        },
        include: { wishlist: true },
      })
      return profile.wishlist
    }
  )
}
