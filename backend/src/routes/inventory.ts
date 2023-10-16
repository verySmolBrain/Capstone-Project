import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler } from '@Source/utils/supabaseUtils'

export default async function (fastify: FastifyInstance) {
  // get inventory
  fastify.get(
    '/inventory',
    async (req: FastifyRequest<{ Body: { collectableId: string } }>, reply) => {
      try {
        const token = req.headers['authorization']

        if (!token) {
          reply.status(401).send({ error: 'Unauthorized' })
          return
        }

        const prisma = await requestHandler(token)

        const user = await prisma.user.findFirst()

        const collectables = await prisma.profile.findMany({
          where: {
            inventory: { some: { id: user?.id } },
          },
        })
        reply.send(collectables)
      } catch (error) {
        reply.status(500).send({ error: error })
      }
    }
  )

  // add collectable to inventory
  fastify.put(
    '/inventory',
    async (req: FastifyRequest<{ Body: { collectableId: string } }>, reply) => {
      try {
        const token = req.headers['authorization']

        if (!token) {
          reply.status(401).send({ error: 'Unauthorized' })
          return
        }

        const { collectableId } = req.body
        const prisma = await requestHandler(token)

        const collectableExists = await prisma.collectable.findFirst({
          where: { id: collectableId },
        })
        if (!collectableExists) {
          reply.status(404).send({ error: 'Collectable does not exist' })
          return
        }

        const user = await prisma.user.findFirst()
        const collectable = await prisma.profile.update({
          where: { id: user?.id },
          data: {
            inventory: {
              connect: { id: collectableId },
            },
          },
        })
        reply.send(collectable)
      } catch (error) {
        reply.status(500).send({ error: error })
      }
    }
  )

  // remove collectable from inventory
  fastify.delete(
    '/inventory',
    async (req: FastifyRequest<{ Body: { collectableId: string } }>, reply) => {
      try {
        const token = req.headers['authorization']

        if (!token) {
          reply.status(401).send({ error: 'Unauthorized' })
          return
        }

        const { collectableId } = req.body
        const prisma = await requestHandler(token)

        const collectableExists = await prisma.collectable.findFirst({
          where: { id: collectableId },
        })
        if (!collectableExists) {
          reply.status(404).send({ error: 'Collectable does not exist' })
          return
        }

        const user = await prisma.user.findFirst()
        const collectable = await prisma.profile.update({
          where: { id: user?.id },
          data: {
            inventory: {
              disconnect: { id: collectableId },
            },
          },
        })
        reply.send(collectable)
      } catch (error) {
        reply.status(500).send({ error: error })
      }
    }
  )
}
