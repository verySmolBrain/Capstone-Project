import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'

  /*
   *  GET /wishlist
   *  Returns the user's wishlist
   *  @returns {object} wishlist
   */

describe('/wishlist - GET', () => {
  it('Successful wishlist retrieval - return 200', async () => {
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
        id: 'double',
        name: 'stringadsf',
        description: null,
        image: null,
        reputation: 1,
      })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/wishlist',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        collectableId: "haaaaaagghghghhg mimimimimi"
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("")).toBe(true)
  })

  it('Empty token error - return 401', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/wishlist',
      headers: {
        Authorization: '',
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')

  })
})

  /*
   *  PUT /wishlist
   *  Update the user's wishlist
   *  @param {collectableCount[]} collectables
   *  @returns {object} wishlist
   */

describe('/wishlist - POST', () => {
  it('Successful Wishlist  update - return 200', async () => {
    prismaMockInstance.profile.update.mockResolvedValueOnce({
        id: 'double',
        name: 'stringadsf',
        description: null,
        image: null,
        reputation: 1,
      })

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/wishlist',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        collectables: [{ id: 1, name: 'yabbin', image: null }],
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("")).toBe(true)
  })

  it('Empty token error - return 401', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/wishlist',
      headers: {
        Authorization: '',
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')

  })
})

