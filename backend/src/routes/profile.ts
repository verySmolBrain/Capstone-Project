import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler, extractId } from '@Source/utils/supabaseUtils'
import { defaultImage } from '@Source/utils/utils'

export default async function (fastify: FastifyInstance) {
  /*
   *  POST /user
   *  Creates a user and profile
   *  @param {string} name
   *  @returns {object} user
   */
  fastify.post(
    '/user',
    async (req: FastifyRequest<{ Body: { name: string } }>) => {
      const token = req.headers['authorization'] as string

      const prisma = await requestHandler(token)
      const { name } = req.body

      const user = await prisma.user.create({
        data: {
          id: extractId(token),
          profile: {
            create: {
              name: name,
              description: 'im such a goomba',
              image: defaultImage,
              reputation: 69,
            },
          },
        },
      })
      return user
    }
  )

  /*
   *  GET /user
   *  Returns the current user
   *  @returns {object} user
   */
  fastify.get('/profile', async (req) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)
    const profile = await prisma.profile.findFirstOrThrow({
      where: {
        id: extractId(token),
      },
    })
    return profile
  })

  /*
   *  GET /user/:name
   *  Returns the user by name
   *  @param {string} id
   *  @returns {object} profile
   */
  fastify.get(
    '/profile/:name',
    async (req: FastifyRequest<{ Params: { name: string } }>) => {
      const token = req.headers['authorization'] as string
      const { name } = req.params

      const prisma = await requestHandler(token)
      const profile = await prisma.profile.findFirstOrThrow({
        where: {
          name: name,
        },
      })
      return profile
    }
  )

  /*
   *  PUT /profile/name
   *  Updates the user's name
   *  @param {string} id
   *  @returns {object} profile
   */
  fastify.put(
    '/profile/name',
    async (req: FastifyRequest<{ Body: { name: string } }>) => {
      const token = req.headers['authorization'] as string

      const { name } = req.body
      const prisma = await requestHandler(token)

      const nameExists = await prisma.profile.findFirst({
        where: { name: name },
      })
      if (nameExists) {
        throw new Error('Name already exists')
      }

      const profile = await prisma.profile.update({
        where: {
          id: extractId(token),
        },
        data: {
          name: name,
        },
      })
      return profile
    }
  )

  /*
   *  PUT /profile/description
   *  Updates the user by id
   *  @param {string} id
   *  @returns {object} profile
   */
  fastify.put(
    '/profile/description',
    async (req: FastifyRequest<{ Body: { description: string } }>) => {
      const token = req.headers['authorization'] as string
      const { description } = req.body
      const prisma = await requestHandler(token)

      const changedDescription = await prisma.profile.updateMany({
        data: {
          description: description,
        },
      })
      return changedDescription
    }
  )

  // change image of user profile
  fastify.put(
    '/profile/image',
    async (req: FastifyRequest<{ Body: { image: string } }>) => {
      const token = req.headers['authorization'] as string

      const { image } = req.body
      const prisma = await requestHandler(token)

      const changedImage = await prisma.profile.updateMany({
        data: {
          image: image,
        },
      })
      return changedImage
    }
  )

  fastify.setErrorHandler((error, request, reply) => {
    if (error.message === 'Unauthorized') {
      reply.status(401).send({ error: 'User ID is either invalid or missing' })
      return
    }
  })
}
