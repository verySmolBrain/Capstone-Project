import { FastifyInstance } from 'fastify'

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
  fastify.post('/campaign', async () => {
    return
  })
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
