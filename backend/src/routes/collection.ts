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
  fastify.post(
    '/collection',
    async (req: FastifyRequest<{ Body: { name: string; image: string } }>) => {
      const token = req.headers['authorization'] as string
      const { name, image } = req.body
      const prisma = await requestHandler(token)

      const collection = await prisma.collection.create({
        data: {
          name: name,
          image: image,
        },
      })
      return collection
    }
  )

  /*
   * GET /collection
   * Returns all collections
   * @returns {object} collections
   */
  /*
   * GET /collection/:name
   * Returns a collection by name
   * @returns {object} collection
   */
  /*
   * PUT /collection/:name
   * Updates a collection by name
   * @param {string} name
   * @param {string} image
   * @returns {object} collection
   */
  /*
   * DELETE /collection/:name
   * Deletes a collection by name
   * @param {string} name
   * @returns {boolean} success
   */
}
