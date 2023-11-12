import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler } from '@Source/utils/supabaseUtils'

export default async function (fastify: FastifyInstance) {
  /*
   * POST /collection
   * Creates a collection
   * @param {string} name
   * @param {string} image
   * @param {string[]} tags
   * @returns {object} collection
   */
  fastify.post(
    '/collection',
    async (req: FastifyRequest<{ Body: { name: string; image: string; tags: string[] } }>) => {
      const token = req.headers['authorization'] as string
      const { name, image, tags } = req.body
      const prisma = await requestHandler(token)

      const collection = await prisma.collection.create({
        data: {
          name: name,
          image: image,
          tags: tags,
          achievement: {
            create: {
              name: name,
              description: 'Complete ' + name,
              image: 'https://archives.bulbagarden.net/media/upload/6/6b/Marsh_Badge.png',
            },
          },
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
      include: {
        collectables: true,
        achievement: true,
      },
    })
    return collection
  })

  /*
   *  PUT
   *  Updates a collection
   *  @param {string} name
   *  @param {string} newName
   *  @param {string} image
   *  @param {string[]} tags
   */
  fastify.put(
    '/collection/:name',
    async (req: FastifyRequest<{ Params: { name: string }; Body: { image: string; tags: string[] } }>) => {
      const token = req.headers['authorization'] as string
      const { name } = req.params
      const { image, tags } = req.body

      const prisma = await requestHandler(token)
      const collection = await prisma.collection.update({
        where: {
          name: name,
        },
        data: {
          image: image,
          tags: tags,
        },
      })
      return collection
    }
  )

  /*
   * PUT /collection/:collectionName/:collectableName
   * Adds a collectable to a collection by name
   * @param {string} name
   * @param {string} image
   * @returns {object} collection
   */
  fastify.put(
    '/collection/:collectionName/:collectableName',
    async (req: FastifyRequest<{ Params: { collectionName: string; collectableName: string } }>) => {
      const token = req.headers['authorization'] as string
      const { collectionName, collectableName } = req.params

      const prisma = await requestHandler(token)
      const collection = await prisma.collection.update({
        where: {
          name: collectionName,
        },
        data: {
          collectables: {
            connect: { name: collectableName },
          },
        },
      })
      return collection
    }
  )

  /*
   * DELETE /collection/:collectionName/:collectableName
   * Removes a collectable from a collection by name
   * @param {string} collection
   * @param {string} collectable
   * @returns {object} collection
   */
  fastify.delete(
    '/collection/:collectionName/:collectableName',
    async (req: FastifyRequest<{ Params: { collectionName: string; collectableName: string } }>) => {
      const token = req.headers['authorization'] as string
      const { collectionName, collectableName } = req.params

      const prisma = await requestHandler(token)
      const collection = await prisma.collection.update({
        where: {
          name: collectionName,
        },
        data: {
          collectables: {
            disconnect: { name: collectableName },
          },
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
