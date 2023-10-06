import Fastify, { FastifyRequest } from 'fastify'
import 'dotenv/config'
import { requestHandler, supabase } from '@Source/utils/PrismaHandler'

const fastify = Fastify({
  logger: true,
})

fastify.get('/profile', async (req, reply) => {
  try {
    const token = req.headers['authorization']

    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }

    const prisma = await requestHandler(token)

    const post = await prisma.profile.findMany({})
    reply.send(post)
  } catch (error) {
    console.log(error)
    reply.status(500).send({ error: error })
  }
})

fastify.put(
  '/chat',
  async (req: FastifyRequest<{ Body: { receiverId: string } }>, reply) => {
    try {
      const token = req.headers['authorization']

      const { data: user } = await supabase().auth.getUser(token)
      const { receiverId } = req.body

      if (!token || !user?.user?.id) {
        console.log(token)
        console.log(user?.user?.id)
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const prisma = await requestHandler(token)

      const post = await prisma.chat.create({
        data: {
          users: {
            connect: [
              {
                id: user?.user?.id,
              },
              {
                id: receiverId,
              },
            ],
          },
        },
      })
      reply.send(post)
    } catch (error) {
      console.log(error)
      reply.status(500).send({ error: error })
    }
  }
)

fastify.get('/chat', async (req, reply) => {
  try {
    const token = req.headers['authorization']

    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }

    const prisma = await requestHandler(token)

    const post = await prisma.chat.findMany({})
    reply.send(post)
  } catch (error) {
    console.log(error)
    reply.status(500).send({ error: error })
  }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3001 })
    console.log('Server started')
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

start()
