import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler, getUserId } from '@Source/utils/PrismaHandler'

export default async function (fastify: FastifyInstance) {
  // create user AND profile
  fastify.post(
    '/createUser',
    async (req: FastifyRequest<{ Body: { name: string } }>, reply) => {
      try {
        const token = req.headers['authorization']

        if (!token) {
          reply.status(401).send({ error: 'Unauthorized' })
          return
        }

        const userId = await getUserId(token)

        const { name } = req.body
        const prisma = await requestHandler(token)

        const user = await prisma.user.create({
          data: {
            id: userId,
            profile: {
              create: {
                name: name,
                description: 'im such a goomba',
                image: 'thisisaurl',
                collection: {},
                achievements: {},
                sales: {},
                purchases: {},
                reputation: 69,
              },
            },
          },
        })
        reply.send(user)
      } catch (error) {
        reply.status(500).send({ error: error })
      }
    }
  )

  // get user profile
  fastify.get('/profile', async (req, reply) => {
    try {
      const token = req.headers['authorization']

      if (!token) {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const prisma = await requestHandler(token)
      const userId = await getUserId(token)
      const profile = await prisma.profile.findFirst({
        where: {
          id: userId,
        },
      })
      reply.send(profile)
    } catch (error) {
      reply.status(500).send({ error: error })
    }
  })

  // get user profile by name
  fastify.get(
    '/getUser/:name',
    async (req: FastifyRequest<{ Params: { name: string } }>, reply) => {
      try {
        const token = req.headers['authorization']
        const { name } = req.params

        if (!token) {
          reply.status(401).send({ error: 'Unauthorized' })
          return
        }

        const prisma = await requestHandler(token)
        const profile = await prisma.profile.findMany({
          where: {
            name: {
              search: name,
            },
          },
        })
        reply.send(profile)
      } catch (error) {
        reply.status(500).send({ error: error })
      }
    }
  )

  // get collectable by name
  fastify.get(
    '/getCollectable/:name',
    async (req: FastifyRequest<{ Params: { name: string } }>, reply) => {
      try {
        const token = req.headers['authorization']
        const { name } = req.params

        if (!token) {
          reply.status(401).send({ error: 'Unauthorized' })
          return
        }
        const prisma = await requestHandler(token)
        const collectable = await prisma.collectable.findMany({
          where: {
            name: {
              search: name,
            },
          },
        })
        reply.send(collectable)
      } catch (error) {
        reply.status(500).send({ error: error })
      }
    }
  )

  // change name of user
  fastify.put(
    '/changeName',
    async (req: FastifyRequest<{ Body: { name: string } }>, reply) => {
      try {
        const token = req.headers['authorization']

        if (!token) {
          reply.status(401).send({ error: 'Unauthorized' })
          return
        }

        const { name } = req.body
        const prisma = await requestHandler(token)

        const nameExists = await prisma.profile.findFirst({
          where: { name: name },
        })
        if (nameExists) {
          reply.status(403).send({ error: 'Name is already taken' })
          return
        }

        const changedName = await prisma.profile.updateMany({
          data: {
            name: name,
          },
        })
        reply.send(changedName)
      } catch (error) {
        reply.status(500).send({ error: error })
      }
    }
  )

  // change description of user profile
  fastify.put(
    '/changeDescription',
    async (req: FastifyRequest<{ Body: { description: string } }>, reply) => {
      try {
        const token = req.headers['authorization']
        if (!token) {
          reply.status(401).send({ error: 'Unauthorized' })
          return
        }

        const { description } = req.body
        const prisma = await requestHandler(token)

        const changedDescription = await prisma.profile.updateMany({
          data: {
            description: description,
          },
        })
        reply.send(changedDescription)
      } catch (error) {
        reply.status(500).send({ error: error })
      }
    }
  )

  // change image of user profile
  fastify.put(
    '/changeImage',
    async (req: FastifyRequest<{ Body: { image: string } }>, reply) => {
      try {
        const token = req.headers['authorization']

        if (!token) {
          reply.status(401).send({ error: 'Unauthorized' })
          return
        }

        const { image } = req.body
        const prisma = await requestHandler(token)

        const changedImage = await prisma.profile.updateMany({
          data: {
            image: image,
          },
        })
        reply.send(changedImage)
      } catch (error) {
        reply.status(500).send({ error: error })
      }
    }
  )
}
