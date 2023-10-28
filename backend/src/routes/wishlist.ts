import { FastifyInstance, FastifyRequest } from 'fastify'
import { extractId, requestHandler } from '@Source/utils/supabaseUtils'
import { collectableCountCreate, collectableCountSelect } from '@Source/utils/types'
import { throwInvalidActionError } from '@Source/utils/error'

export default async function (fastify: FastifyInstance) {
  /*
   *  GET /wishlist
   *  Returns the user's wishlist
   *  @returns {object} wishlist
   */
  fastify.get('/wishlist', async (req: FastifyRequest<{ Body: { collectableId: string } }>) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)

    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
      select: { wishlist: { select: collectableCountSelect } },
    })
    return profile.wishlist
  })

  /*
   *  PUT /wishlist
   *  Update the user's wishlist
   *  @param {collectableCount[]} collectables
   *  @returns {object} wishlist
   */
  fastify.put('/wishlist', async (req: FastifyRequest<{ Body: { collectables: collectableCountCreate[] } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const profile = await prisma.profile.update({
      where: { id: extractId(token) },
      data: {
        wishlist: {
          create: req.body.collectables,
        },
      },
      select: { wishlist: { select: collectableCountSelect } },
    })
    return profile.wishlist
  })

  /*
   * PUT /wishlist/:collectable
   * Update the user's wishlist
   * @param {string} collectable
   * @param {number} count
   * @returns {object} wishlist
   */
  fastify.put(
    '/wishlist/:collectable',
    async (req: FastifyRequest<{ Params: { collectable: string }; Body: { count: number } }>) => {
      const token = req.headers['authorization'] as string
      const prisma = await requestHandler(token)

      const { wishlist } = await prisma.profile.findUniqueOrThrow({
        where: {
          id: extractId(token),
        },
        select: { wishlist: { select: collectableCountSelect } },
      })

      const collectable = wishlist.find((c) => c.name === req.params.collectable)

      if (!collectable) {
        await prisma.profile.update({
          where: { id: extractId(token) },
          data: {
            wishlist: {
              create: {
                name: req.params.collectable,
                count: req.body.count,
              },
            },
          },
          select: { wishlist: { select: collectableCountSelect } },
        })
        return
      }

      const updatedCollectable = await prisma.collectableCount.update({
        where: {
          id: collectable.id,
        },
        data: {
          count: req.body.count,
        },
        select: collectableCountSelect,
      })

      return updatedCollectable
    }
  )

  /*
   * DELETE /wishlist/:collectable
   * Update the user's wishlist
   * @param {string} collectable
   * @returns {object} wishlist
   */
  fastify.delete('/wishlist/:collectable', async (req: FastifyRequest<{ Params: { collectable: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const { wishlist } = await prisma.profile.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
      select: { wishlist: { select: collectableCountSelect } },
    })

    const wishlistCollectable = wishlist.find((c) => c.name === req.params.collectable)

    if (!wishlistCollectable) {
      throwInvalidActionError('delete collectable', 'Collectable not found in wishlist')
    }

    prisma.collectableCount.delete({
      where: {
        id: wishlistCollectable!.id,
      },
    })
    return
  })
}
