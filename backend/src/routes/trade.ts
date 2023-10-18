import { FastifyInstance } from 'fastify'

export default async function (fastify: FastifyInstance) {
  /*
   * GET /trade
   * returns all trades of a user
   * @param {string} query
   * @returns {object} trades
   */
  fastify.get('/trade', async () => {
    return
  })

  /*
   * GET /trade/:id
   * returns a trade by id
   * @param {string} id
   * @returns {object} trade
   */

  /*
   * GET /trade/pending
   * returns all pending trades of a user
   * @returns {object} trades
   */

  /*
   * POST /trade
   * creates a trade
   * @param {string} buyerId
   * @param {string} sellerId
   * @param {string} collectableId
   * @param {number} price
   * @returns {object} trade
   */

  /*
   * PUT /trade/status/:id
   * updates a trade's status by id
   * @param {string} id
   * @param {string} status
   * @returns {object} trade
   */

  /*
   * PUT /trade/collectable/:id
   * updates a trade's collectable by id
   * @param {string} id
   * @param {string} collectableId
   * @returns {object} trade
   */

  /*
   * PUT /trade/price/:id
   * updates a trade's price by id
   * @param {string} id
   * @param {number} price
   * @returns {object} trade
   */
}
