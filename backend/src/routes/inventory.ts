import { FastifyInstance, FastifyRequest } from 'fastify'
import { extractId, requestHandler } from '@Source/utils/supabaseUtils'
import { collectableCountCreate, collectableCountSelect } from '@Source/utils/types'

export default async function (fastify: FastifyInstance) {
  /*
   *  GET /inventory
   *  Returns the user's inventory
   *  @returns {object} inventory
   */
  fastify.get('/inventory', async (req: FastifyRequest<{ Body: { collectableId: string } }>) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)

    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
      select: { inventory: { select: collectableCountSelect } },
    })
    return profile.inventory
  })

  /*
   *  PUT /inventory
   *  Update the user's inventory
   *  @param {collectableCount[]} collectables
   *  @returns {object} inventory
   */
  fastify.put('/inventory', async (req: FastifyRequest<{ Body: { collectables: collectableCountCreate[] } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const profile = await prisma.profile.update({
      where: { id: extractId(token) },
      data: {
        inventory: {
          create: req.body.collectables,
        },
      },
      select: { inventory: { select: collectableCountSelect } },
    })
    return profile.inventory
  })
}
