import { FastifyInstance, FastifyRequest } from 'fastify'
import { extractId, requestHandler } from '@Source/utils/supabaseUtils'
import { Id } from '@Source/utils/utils'

export default async function (fastify: FastifyInstance) {
  /*
   *  GET /wares
   *  Returns the user's wares
   *  @returns {object} wares
   */
  fastify.get('/wares', async (req: FastifyRequest<{ Body: { collectableId: string } }>) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)

    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
      include: { wares: true },
    })
    return profile.wares
  })

  /*
   *  PUT /wares
   *  Update the user's wares
   *  @param {Id[]} collectableIds
   *  @returns {object} wares
   */
  fastify.put('/wares', async (req: FastifyRequest<{ Body: { collectableIds: Id[] } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    // TODO: enforce wares are a subset of inventory
    const profile = await prisma.profile.update({
      where: { id: extractId(token) },
      data: {
        wares: {
          set: req.body.collectableIds,
        },
      },
      include: { wares: true },
    })
    return profile.wares
  })
}
