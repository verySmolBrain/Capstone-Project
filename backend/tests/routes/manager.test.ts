import { build } from '@Source/app'

  /*
   * POST /manager
   * Creates a campaign manager user
   */

  /*
   * GET /manager
   * Returns all campaign managers
   */

describe('/manager', () => {
  it('Successfully creates collection - return 200', async () => {

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/manager',
      headers: {
        Authorization: 'Bearer your-token-here',
      },

    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })
})
