import { throwInvalidActionError } from '@Source/utils/error'
import { requestHandler } from '@Source/utils/supabaseUtils'
import { generateUsername } from '@Source/utils/utils'
import { FastifyInstance, FastifyRequest } from 'fastify'

export default async function (fastify: FastifyInstance) {
  /*
   * POST /manager
   * Creates a campaign manager user
   */
  fastify.post('/manager', async (req: FastifyRequest<{ Body: { id: string } }>) => {
    const token = req.headers['authorization'] as string
    const { id } = req.body
    const name = await generateUsername(token)
    console.log(id, name)
    const prisma = await requestHandler(token)
    await prisma.user.create({
      data: {
        id: id,
        role: 'MANAGER',
        profile: {
          create: {
            name: name,
            description: `Hi I'm campaign manager ${name}`,
          },
        },
      },
    })
  })

  /*
   * GET /manager
   * Returns all campaign managers
   */
  fastify.get('/manager', async (req) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const managers = await prisma.user.findMany({
      where: {
        role: 'MANAGER',
      },
      include: {
        profile: true,
      },
    })
    return managers
  })

  /*
   * GET /manager/:name
   * Returns a campaign manager by name
   */

  /*
   * DELETE /manager/:name
   * Deletes a campaign manager by id
   * @param {string} id
   * @returns nothing on success
   */
  fastify.delete('/manager/:id', async (req: FastifyRequest<{ Params: { id: string } }>) => {
    const token = req.headers['authorization'] as string
    const { id } = req.params

    const prisma = await requestHandler(token)

    const { role } = await prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
      select: { role: true },
    })

    if (role !== 'MANAGER') {
      throwInvalidActionError('delete manager', 'Cannot delete non-manager user')
    }

    await prisma.user.delete({
      where: {
        id: id,
      },
    })
  })
}
