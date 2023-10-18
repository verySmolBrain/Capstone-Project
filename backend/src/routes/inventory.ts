import { FastifyInstance, FastifyRequest } from 'fastify'
import { extractId, requestHandler } from '@Source/utils/supabaseUtils'
import { Id } from '@Source/utils/utils'

export default async function (fastify: FastifyInstance) {
  /*
   *  GET /inventory
   *  Returns the user's inventory
   *  @returns {object} inventory
   */
  fastify.get(
    '/inventory',
    async (req: FastifyRequest<{ Body: { collectableId: string } }>) => {
      const token = req.headers['authorization'] as string

      const prisma = await requestHandler(token)

      const profile = await prisma.profile.findUniqueOrThrow({
        where: {
          id: extractId(token),
        },
        include: { inventory: true },
      })
      return profile.inventory
    }
  )

  /*
   *  PUT /inventory
   *  Update the user's inventory
   *  @param {Id[]} collectableIds
   *  @returns {object} inventory
   */
  fastify.put(
    '/inventory',
    async (req: FastifyRequest<{ Body: { collectableIds: Id[] } }>) => {
      const token = req.headers['authorization'] as string
      const prisma = await requestHandler(token)
      const profile = await prisma.profile.update({
        where: { id: extractId(token) },
        data: {
          inventory: {
            set: req.body.collectableIds,
          },
        },
        include: { inventory: true },
      })
      return profile.inventory
    }
  )
}
