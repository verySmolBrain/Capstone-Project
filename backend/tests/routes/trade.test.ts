import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'
import { Status } from '@prisma/client'

/*
 * GET /trade
 * returns all trades of a user
 * @param {string} query
 * @returns {object} trades
 */

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
describe('/trade', () => {
  it('Successfully trade - return 200', async () => {
    // const app = await build({})
    // const response = await app.inject({
    //   method: 'GET',
    //   url: '/trade',
    //   headers: {
    //     Authorization: 'Bearer your-token-here',
    //   },
    // })
    // expect(response.statusCode).toBe(200)
    // expect(response.statusMessage).toBe('OK')
    // await app.close()
  })
})

describe('/trade:collectableName', () => {
  it('Successfully trade - return 200', async () => {
    const app = await build({})
    // @ts-expect-error only populating necessary fields
    prismaMockInstance.trade.findMany.mockResolvedValue([{
      status: Status.FINISHED, 
      collectableName: 'yabba', 
      createdAt: new Date(2023, 10),
      price: 69
    },
    // @ts-expect-error only populating necessary fields
    { status: Status.FINISHED,
      collectableName: 'yabba',
      createdAt: new Date(2023, 11),
      price: 96
    }])

    const response = await app.inject({
      method: 'GET',
      url: '/trade/:collectableName',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        name: 'a'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    // expect(response.body).toBe("[{\"date\":1698796800000,\"price\":69},{\"date\":1701388800000,\"price\":96}]")
    await app.close()
  })
})
