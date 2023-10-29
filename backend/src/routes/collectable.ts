import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler } from '@Source/utils/supabaseUtils'

export default async function (fastify: FastifyInstance) {
  /*
   *  GET /collectable
   *  Returns all collectables
   *  @returns {object} collectables
   */
  fastify.get('/collectable', async (req) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const collectables = await prisma.collectable.findMany()
    return collectables
  })

  /*
   *  GET /collectable/:name
   *  Returns a collectable by name
   *  @returns {object} collectable
   */
  fastify.get('/collectable/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)
    const collectable = await prisma.collectable.findFirstOrThrow({
      where: {
        name: name,
      },
    })
    return collectable
  })

  /*
   *  POST
   *  Creates a collectable
   *  @param {string} name
   *  @param {string} image
   *  @param {string[]} tags
   */
  fastify.post(
    '/collectable',
    async (req: FastifyRequest<{ Body: { name: string; image: string; tags: string[] } }>) => {
      const token = req.headers['authorization'] as string
      const { name, image, tags } = req.body

      const prisma = await requestHandler(token)
      const collectable = await prisma.collectable.create({
        data: {
          name: name,
          image: image,
          tags: tags,
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
   *  @param {string[]} tags
   */
  fastify.put(
    '/collectable/:name',
    async (req: FastifyRequest<{ Params: { name: string }; Body: { image: string; tags: string[] } }>) => {
      const token = req.headers['authorization'] as string
      const { name } = req.params
      const { image, tags } = req.body

      const prisma = await requestHandler(token)
      const collectable = await prisma.collectable.update({
        where: {
          name: name,
        },
        data: {
          image: image,
          tags: tags,
        },
      })
      return collectable
    }
  )

  /*
   *  DELETE
   *  Deletes a collectable
   *  @param {string} name
   */
  fastify.delete('/collectable/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)
    const collectable = await prisma.collectable.delete({
      where: {
        name: name,
      },
    })
    return collectable
  })
}
