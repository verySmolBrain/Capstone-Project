import { FastifyInstance, FastifyRequest } from 'fastify'
import { extractId, requestHandler } from '@Source/utils/supabaseUtils'
import { collectableCountCreate, collectableCountSelect } from '@Source/utils/types'
import { throwInvalidActionError } from '@Source/utils/error'

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
   *  @param {collectableCount[]} collectables
   *  @returns {object} wares
   */

  fastify.put('/wares', async (req: FastifyRequest<{ Body: { collectables: collectableCountCreate[] } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const { inventory } = await prisma.profile.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
      select: { inventory: { select: collectableCountSelect } },
    })

    for (const collectable of req.body.collectables) {
      const inventoryCollectable = inventory.find((c) => c.name === collectable.name)

      if (!inventoryCollectable) {
        throwInvalidActionError('update wares', 'Collectable not found in inventory')
      }

      if (inventoryCollectable!.count < collectable.count) {
        throwInvalidActionError('update wares', 'Not enough collectables in inventory')
      }
    }

    const profile = await prisma.profile.update({
      where: { id: extractId(token) },
      data: {
        wares: {
          create: req.body.collectables,
        },
      },
      select: { wares: { select: collectableCountSelect } },
    })
    return profile.wares
  })
}
