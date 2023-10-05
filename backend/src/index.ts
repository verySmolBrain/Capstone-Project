import Fastify, { FastifyRequest } from 'fastify'
import 'dotenv/config'
import { requestHandler } from '@Source/utils/PrismaHandler'

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
    reply.status(500).send({ error: error })
  }
})

fastify.put('/changeName', async (req: FastifyRequest<{ Body: { name: string } }>, reply) => {
  try {
    const token = req.headers['authorization']

    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }

    const prisma = await requestHandler(token)

    const { name } = req.body;
    const nameExists = await prisma.profile.findFirst({
      where: { name: name },
    })
    if (nameExists != null) {
      reply.status(403).send({ error: 'Name is already taken' })
      return
    }

    const user = await prisma.user.findFirst()
    console.log(user)
    const changedName = await prisma.profile.update({
      where: {id: user?.id},
      data: {
        name: name,
      },
    })
    console.log(changedName)
    reply.send(changedName)
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
