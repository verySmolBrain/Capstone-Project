import { FastifyInstance, FastifyRequest } from 'fastify';
import {
  requestHandler,
} from '@Source/utils/PrismaHandler'

export default async function (fastify: FastifyInstance) {
  // get wares
  fastify.get(
    '/wares',
    async (req: FastifyRequest<{ Body: { collectableId: string } }>, reply) => {
      try {
        const token = req.headers['authorization']

        if (!token) {
          reply.status(401).send({ error: 'Unauthorized' })
          return
        }

        const prisma = await requestHandler(token)

        const user = await prisma.user.findFirst()
        const collectables = await prisma.collectable.findMany({
          where: {
            wares: { some: { id: user?.id } },
          },
        })
        reply.send(collectables)
      } catch (error) {
        reply.status(500).send({ error: error })
      }
    }
  )

  // add collectable to wares
  fastify.put(
    '/addToWares',
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
            wares: {
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

  // remove collectable from wares
  fastify.delete(
    '/removeFromWares',
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
            wares: {
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