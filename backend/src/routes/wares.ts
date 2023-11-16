import { FastifyInstance, FastifyRequest } from 'fastify'
import { extractId, requestHandler } from '@Source/utils/supabaseUtils'
import { collectableCountCreate, collectableCountSelect } from '@Source/utils/types'
import { throwInvalidActionError } from '@Source/utils/error'

export default async function (fastify: FastifyInstance) {
  /**
   *  GET /wares
   *  Returns the user's wares
   *  @returns {object} wares
   */
  fastify.get('/wares', async (req: FastifyRequest) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)

    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
      include: { wares: { select: collectableCountSelect } },
    })
    return profile.wares
  })

  /**
   *  GET /wares/:name
   *  Returns the given users wares
   *  @param {string} name
   *  @returns {object} wares
   */
  fastify.get('/wares/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)

    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        name: name,
      },
      include: { wares: { select: collectableCountSelect } },
    })
    return profile.wares
  })

  /**
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

  /**
   * PUT /wares/:collectable
   * Update the user's wares
   * @param {string} collectable
   * @param {number} count
   * @returns {object} wares
   */
  fastify.put(
    '/wares/:collectable',
    async (req: FastifyRequest<{ Params: { collectable: string }; Body: { count: number } }>) => {
      const token = req.headers['authorization'] as string
      const prisma = await requestHandler(token)

      const collectable = req.params.collectable
      const count = req.body.count

      const collectableCount = await prisma.collectableCount.findFirst({
        where: {
          name: collectable,
          waresId: extractId(token),
        },
      })
      const { inventory } = await prisma.profile.findUniqueOrThrow({
        where: {
          id: extractId(token),
        },
        select: { inventory: { select: collectableCountSelect } },
      })

      const inventoryCollectable = inventory.find((c) => c.name === collectable)
      if (!inventoryCollectable) {
        throwInvalidActionError('update wares', 'Collectable not found in inventory')
      }

      if (inventoryCollectable!.count < count) {
        throwInvalidActionError('update wares', 'Not enough collectables in inventory')
      }

      if (!collectableCount) {
        await prisma.collectableCount.create({
          data: {
            name: collectable,
            count: count,
            waresId: extractId(token),
          },
        })
        return
      }

      prisma.collectableCount.update({
        where: {
          id: collectableCount.id,
        },
        data: {
          count: count,
        },
      })
      return
    }
  )

  /**
   * DELETE /wares/:collectable
   * Update the user's wares
   * @param {string} collectable
   * @returns {object} wares
   */
  fastify.delete('/wares/:collectable', async (req: FastifyRequest<{ Params: { collectable: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const collectableCount = await prisma.collectableCount.findFirst({
      where: {
        name: req.params.collectable,
        waresId: extractId(token),
      },
    })

    if (!collectableCount) {
      throwInvalidActionError('delete collectable', 'Collectable not found in inventory')
    }

    prisma.collectableCount.delete({
      where: {
        id: collectableCount!.id,
      },
    })
    return
  })
}
