import Fastify from 'fastify'
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
