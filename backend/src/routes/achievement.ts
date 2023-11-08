import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler } from '@Source/utils/supabaseUtils'

export default async function (fastify: FastifyInstance) {
  /*
   * GET /achievement
   * Returns all achievements
   * @returns {object} achievements
   */
  fastify.get('/achievement', async (req) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const achievements = await prisma.achievement.findMany({
      include: { users: true },
    })
    return achievements
  })

  /*
   * GET /achievement/:id
   * Returns an achievement by id
   * @returns {object} achievement
   */
  fastify.get('/achievement/:id', async (req: FastifyRequest<{ Params: { id: string } }>) => {
    const token = req.headers['authorization'] as string
    const { id } = req.params
    const prisma = await requestHandler(token)

    const achievement = await prisma.achievement.findFirstOrThrow({
      where: { id: id },
      include: {
        collection: {
          include: {
            collectables: true,
          },
        },
        users: true,
      },
    })
    return achievement
  })

  /*
   * PUT /achievement/:id
   * Updates an achievement by id
   * @param {string} id
   * @param {string} name
   * @param {string} description
   * @param {string} image
   * @returns {object} achievement
   */
  fastify.put(
    '/achievement/:id',
    async (
      req: FastifyRequest<{
        Params: { id: string }
        Body: {
          name: string
          description: string
          image: string
        }
      }>
    ) => {
      const token = req.headers['authorization'] as string
      const { id } = req.params
      const { name, description, image } = req.body
      const prisma = await requestHandler(token)

      const achievement = await prisma.achievement.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          description: description,
          image: image,
        },
      })
      return achievement
    }
  )

  /*
   * DELETE /achievement/:id
   * Deletes an achievement by id
   * @param {string} id
   * @returns {boolean} success
   */
  fastify.delete('/achievement/:id', async (req: FastifyRequest<{ Params: { id: string } }>) => {
    const token = req.headers['authorization'] as string
    const { id } = req.params

    const prisma = await requestHandler(token)
    const achievement = await prisma.achievement.delete({
      where: {
        id: id,
      },
    })
    return achievement
  })
}
