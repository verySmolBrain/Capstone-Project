import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'

  /*
   * GET /achievement
   * Returns all achievements
   * @returns {object} achievements
   */

describe('/campaign - post', () => {
  it('Successful campaign creation - return 200', async () => {
    prismaMockInstance.campaign.create.mockResolvedValueOnce({
      name: 'yabba',
      image: 'a',
      tags: [],
      start: new Date(),
      end: new Date(),
      isActive: false,
      views: 0,
      viewData: [],
    })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/campaign',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        name: 'a',
        image: 'a',
        startDate: new Date(),
        endDate: new Date(),
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith('{"name":"yabba","image":"a","tags":[],"start":"')).toBe(true)
  })
})
