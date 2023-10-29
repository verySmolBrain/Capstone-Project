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
   *  GET /wishlist/:name
   *  Returns the given users wishlist
   *  @param {string} name
   *  @returns {object} wishlist
   */
  fastify.get('/wishlist/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)
    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        name: name,
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

      const collectableCount = await prisma.collectableCount.findFirst({
        where: {
          name: req.params.collectable,
          wishlistId: extractId(token),
        },
      })

      if (!collectableCount) {
        console.log('hi')
        await prisma.collectableCount.create({
          data: {
            name: req.params.collectable,
            count: req.body.count,
            wishlistId: extractId(token),
          },
        })
        return
      }

      prisma.collectableCount.update({
        where: {
          id: collectableCount.id,
        },
        data: {
          count: req.body.count,
        },
      })
      return
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

    const collectableCount = await prisma.collectableCount.findFirst({
      where: {
        name: req.params.collectable,
        wishlistId: extractId(token),
      },
    })

    if (!collectableCount) {
      throwInvalidActionError('delete collectable', 'Collectable not found in wishlist')
    }

    prisma.collectableCount.delete({
      where: {
        id: collectableCount!.id,
      },
    })
    return
  })
}
