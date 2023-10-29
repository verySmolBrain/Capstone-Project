import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler, extractId } from '@Source/utils/supabaseUtils'
import { throwNotUniqueError } from '@Source/utils/error'
import { generateUsername, getUserId } from '@Source/utils/utils'

export default async function (fastify: FastifyInstance) {
  /*
   *  POST /user
   *  Creates a user and profile
   *  @returns {object} user
   */
  fastify.post('/user', async (req: FastifyRequest) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)
    const username = await generateUsername(token)

    const userExists = await prisma.user.findMany({
      where: { id: extractId(token) },
    })

    if (userExists?.length > 0) {
      console.log(userExists[0])
      return userExists[0]
    }

    const user = await prisma.user.create({
      data: {
        id: extractId(token),
        profile: {
          create: {
            name: username,
            description: 'Nice to meet you!',
          },
        },
      },
    })
    return user
  })

  /*
   *  GET /role
   *  Returns the current user's role
   *  @returns {string} role
   */
  fastify.get('/role', async (req) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
    })
    return { role: user.role }
  })

  /*
   *  GET /role
   *  Returns the given user's role
   *  @returns {string} role
   */
  fastify.get('/role/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)
    const id = await getUserId(name, prisma)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    })
    return { role: user.role }
  })

  /*
   *  GET /profile
   *  Returns the current user's profile
   *  @returns {object} user
   */
  fastify.get('/profile', async (req) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)
    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
      include: {
        inventory: true,
        wares: true,
        wishlist: true,
      },
    })
    return profile
  })

  /*
   *  GET /profile/:name
   *  Returns the user's profile by name
   *  @param {string} name
   *  @returns {object} profile
   */
  fastify.get('/profile/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)
    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        name: name,
      },
      include: {
        inventory: true,
        wares: true,
        wishlist: true,
      },
    })
    return profile
  })

  /*
   *  GET /role
   *  Returns the current user's role
   *  @returns {string} role
   */
  fastify.get('/role', async (req) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
    })
    console.log(user.role)
    return { role: user.role }
  })

  /*
   *  PUT /profile/name
   *  Updates the user's name
   *  @param {string} name
   *  @returns {object} profile
   */
  fastify.put('/profile/name', async (req: FastifyRequest<{ Body: { name: string } }>) => {
    const token = req.headers['authorization'] as string

    const { name } = req.body
    const prisma = await requestHandler(token)

    const nameExists = await prisma.profile.findFirst({
      where: { name: name },
    })
    if (nameExists) {
      throwNotUniqueError('name')
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
  })

  /*
   *  PUT /profile/description
   *  Updates the user's description
   *  @param {string} description
   *  @returns a batch payload
   */
  fastify.put('/profile/description', async (req: FastifyRequest<{ Body: { description: string } }>) => {
    const token = req.headers['authorization'] as string
    const { description } = req.body
    const prisma = await requestHandler(token)

    const changedDescription = await prisma.profile.updateMany({
      data: {
        description: description,
      },
    })
    return changedDescription
  })

  /*
   *  PUT /profile/image
   *  Updates the user's image url
   *  @param {string} image url
   *  @returns a batch payload
   */
  fastify.put('/profile/image', async (req: FastifyRequest<{ Body: { image: string } }>) => {
    const token = req.headers['authorization'] as string

    const { image } = req.body
    const prisma = await requestHandler(token)

    const changedImage = await prisma.profile.updateMany({
      data: {
        image: image,
      },
    })
    return changedImage
  })
}
