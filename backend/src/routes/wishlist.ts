import { FastifyInstance, FastifyRequest } from 'fastify'
import { extractId, requestHandler } from '@Source/utils/supabaseUtils'
import { collectableCountCreate, collectableCountSelect } from '@Source/utils/types'

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
}
