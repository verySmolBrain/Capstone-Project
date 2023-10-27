import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler, extractId } from '@Source/utils/supabaseUtils'

export default async function (fastify: FastifyInstance) {
  /*
   * POST /campaign
   * Creates a campaign
   * @param {string} name
   * @param {string} image
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {object} campaign
   */
  fastify.post(
    '/campaign',
    async (req: FastifyRequest<{ Body: { name: string; image: string; startDate: Date; endDate: Date } }>) => {
      const token = req.headers['authorization'] as string
      const { name, image, startDate, endDate } = req.body
      const prisma = await requestHandler(token)

      const campaign = await prisma.campaign.create({
        data: {
          name: name,
          image: image,
          start: startDate,
          end: endDate,
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
  /*
   * GET /campaign/:name
   * Returns a campaign by name
   * @returns {object} campaign
   */
  /*
   * PUT /campaign/:name
   * Updates a campaign by name
   * @param {string} name
   * @param {string} image
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {object} campaign
   */
  /*
   * DELETE /campaign/:name
   * Deletes a campaign by name
   * @param {string} name
   * @returns {boolean} success
   */
}
