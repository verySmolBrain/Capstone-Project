import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler, extractId } from '@Source/utils/supabaseUtils'
import { collectionConnect } from '@Source/utils/types'

export default async function (fastify: FastifyInstance) {
  /*
   * POST /campaign
   * Creates a campaign
   * @param {string} name
   * @param {string} image
   * @param {Date} startDate
   * @param {Date} endDate
   * @param {collection[]} collections
   * @returns {object} campaign
   */
  fastify.post(
    '/campaign',
    async (
      req: FastifyRequest<{
        Body: { name: string; image: string; startDate: Date; endDate: Date; collection: collectionConnect[] }
      }>
    ) => {
      const token = req.headers['authorization'] as string
      const { name, image, startDate, endDate } = req.body
      const prisma = await requestHandler(token)

      const campaign = await prisma.campaign.create({
        data: {
          name: name,
          image: image,
          start: startDate,
          end: endDate,
          collections: {
            connect: req.body.collection,
          },
          managers: { connect: { id: extractId(token) } },
        },
      })
      return campaign
    }
  )

  /*
   * GET /campaign
   * Returns all campaigns
   * @returns {object} campaigns
   */
  fastify.get('/campaign', async (req) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const campaigns = await prisma.campaign.findMany()
    return campaigns
  })

  /*
   * GET /campaign/:name
   * Returns a campaign by name
   * @returns {object} campaign
   */
  fastify.get('/campaign/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params
    const prisma = await requestHandler(token)

    const campaign = await prisma.campaign.findFirstOrThrow({
      where: { name: name },
      include: {
        collections: true,
      },
    })
    return campaign
  })

  /*
   * PUT /campaign/:name
   * Updates a campaign by name
   * @param {string} name
   * @param {string} image
   * @param {Date} startDate
   * @param {Date} endDate
   * @param {collection[]} collections
   * @returns {object} campaign
   */
  fastify.put(
    '/campaign/:name',
    async (
      req: FastifyRequest<{
        Params: { name: string }
        Body: { image: string; startDate: Date; endDate: Date; collections: collectionConnect[] }
      }>
    ) => {
      const token = req.headers['authorization'] as string
      const { name } = req.params
      const { image, startDate, endDate } = req.body
      const prisma = await requestHandler(token)

      const campaign = await prisma.campaign.update({
        where: {
          name: name,
        },
        data: {
          image: image,
          start: startDate,
          end: endDate,
          collections: {
            connect: req.body.collections,
          },
        },
      })
      return campaign
    }
  )

  /*
   * DELETE /campaign/:name
   * Deletes a campaign by name
   * @param {string} name
   * @returns {boolean} success
   */
  fastify.delete('/campaign/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)
    const campaign = await prisma.campaign.delete({
      where: {
        name: name,
      },
    })
    return campaign
  })
}
