import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler } from '@Source/utils/supabaseUtils'

export default async function (fastify: FastifyInstance) {
  /*
   *  GET /collectable
   *  Returns all collectables
   *  @returns {object} collectables
   */

  /*
   *  GET /collectable/:name
   *  Returns a collectable by name
   *  @returns {object} collectable
   */
  fastify.get(
    '/collectable/:name',
    async (req: FastifyRequest<{ Params: { name: string } }>) => {
      const token = req.headers['authorization'] as string
      const { name } = req.params

      const prisma = await requestHandler(token)
      const collectable = await prisma.collectable.findFirstOrThrow({
        where: {
          name: name,
        },
      })
      return collectable
    }
  )

  /*
   *  POST
   *  Creates a collectable
   *  @param {string} name
   *  @param {string} image
   */
  fastify.post(
    '/collectable',
    async (req: FastifyRequest<{ Body: { name: string; image: string } }>) => {
      const token = req.headers['authorization'] as string
      const { name, image } = req.body

      const prisma = await requestHandler(token)
      const collectable = await prisma.collectable.create({
        data: {
          name: name,
          image: image,
        },
      })
      return collectable
    }
  )

  /*
   *  PUT
   *  Updates a collectable
   *  @param {string} name
   *  @param {string} image
   */

  /*
   *  DELETE
   *  Deletes a collectable
   *  @param {string} name
   */
}
