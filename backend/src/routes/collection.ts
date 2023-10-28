import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler } from '@Source/utils/supabaseUtils'

export default async function (fastify: FastifyInstance) {
  /*
   * POST /collection
   * Creates a collection
   * @param {string} name
   * @param {string} image
   * @returns {object} collection
   */
  fastify.post('/collection', async (req: FastifyRequest<{ Body: { name: string; image: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.body
    const prisma = await requestHandler(token)

    const collection = await prisma.collection.create({
      data: {
        name: name,
        image: 'https://archives.bulbagarden.net/media/upload/7/7e/SV4_Logo_EN.png',
        tags: [],
      },
    })
    return collection
  })

  /*
   * GET /collection
   * Returns all collections
   * @returns {object} collections
   */
  fastify.get('/collection', async (req) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const collections = await prisma.collection.findMany()
    return collections
  })

  /*
   * GET /collection/:name
   * Returns a collection by name
   * @returns {object} collection
   */
  fastify.get('/collection/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params
    const prisma = await requestHandler(token)

    const collection = await prisma.collection.findFirstOrThrow({
      where: { name: name },
    })
    return collection
  })

  /*
   * PUT /collection/:name
   * Updates a collection by name
   * @param {string} name
   * @param {string} image
   * @returns {object} collection
   */
  fastify.put(
    '/collection/:name',
    async (req: FastifyRequest<{ Params: { name: string }; Body: { image: string } }>) => {
      const token = req.headers['authorization'] as string
      const { name } = req.params
      const { image } = req.body

      const prisma = await requestHandler(token)
      const collection = await prisma.collection.update({
        where: {
          name: name,
        },
        data: {
          image: image,
        },
      })
      return collection
    }
  )

  /*
   * DELETE /collection/:name
   * Deletes a collection by name
   * @param {string} name
   * @returns {boolean} success
   */
  fastify.delete('/collection/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)
    const collection = await prisma.collection.delete({
      where: {
        name: name,
      },
    })
    return collection
  })
}
