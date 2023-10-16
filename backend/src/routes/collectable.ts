import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler } from '@Source/utils/supabaseUtils'

export default async function (fastify: FastifyInstance) {
  /*
   *  GET /collectable
   *  Returns a collectable by name
   *  @returns {object} collectable
   */
  fastify.get(
    '/collectable/:name',
    async (req: FastifyRequest<{ Params: { name: string } }>) => {
      const token = req.headers['authorization'] as string
      const { name } = req.params

      const prisma = await requestHandler(token)
      const collectable = await prisma.collectable.findFirstOrThrow({
        where: {
          name: name,
        },
      })
      return collectable
    }
  )
}
