import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler } from '@Source/utils/supabaseUtils'

export default async function (fastify: FastifyInstance) {
  /*
   * GET /search/collectible/:name
   * Creates a campaign
   * @param {string} name
   * @returns {object} collectibles
   */
  fastify.get('/search/collectable/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const collectible_name = req.params.name

    if (!collectible_name) {
      return await prisma.collectable.findMany()
    }

    const collectibles = await prisma.collectable.findMany({
      where: {
        OR: [
          {
            name: {
              contains: collectible_name,
              mode: 'insensitive',
            },
          },
        ],
      },
    })

    console.log(collectibles)
    console.log(collectible_name)

    return collectibles
  })

  /*
   * GET /search/collection/:name
   * Returns all campaigns
   * @returns {object} collections
   */
  fastify.get('/search/collection/:name', async () => {
    return
  })

  /*
   * GET /search/user/:name
   * Returns all campaigns
   * @returns {object} users
   */
  fastify.get('/search/user/:name', async () => {
    return
  })
}
