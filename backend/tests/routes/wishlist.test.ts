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
      banned: false,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/wishlist',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        collectableId: 'haaaaaagghghghhg mimimimimi',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith('')).toBe(true)
    await app.close()

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
    await app.close()

  })
})
/*
 *  GET /wishlist/:name
 *  Returns the given users wishlist
 *  @param {string} name
 *  @returns {object} wishlist
 */
describe('/wishlist:name - GET', () => {
  it('Successful wishlist retrieval - return 200', async () => {
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
      banned: false,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/wishlist/:name',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        collectableId: 'haaaaaagghghghhg mimimimimi',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith('')).toBe(true)
    await app.close()

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
    await app.close()

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
      banned: false,
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
    expect(response.body.startsWith('')).toBe(true)
    await app.close()

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
    await app.close()

  })
})
/*
 * PUT /wishlist/:collectable
 * Update the user's wishlist
 * @param {string} collectable
 * @param {number} count
 * @returns {object} wishlist
 */

describe('/wishlist/:collectable - PUT', () => {
  it('Successful Wishlist collectable update - return 200', async () => {
    prismaMockInstance.collectableCount.findFirst.mockResolvedValueOnce({
      id: 1,
      name: 'stringadsf',
      count: 1,
      inventoryId: '',
      wishlistId: '',
      waresId: '',
    })

    prismaMockInstance.collectableCount.update.mockResolvedValueOnce({
      id: 1,
      name: 'stringadsf',
      count: 1,
      inventoryId: '',
      wishlistId: '',
      waresId: '',
    })

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/wishlist/:collectable',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        collectable: 'yabba',
      },
      body: {
        count: 1,
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()

  })

  it('Successful Wishlist update (no prior existing collectable) - return 200', async () => {
    prismaMockInstance.collectableCount.findFirst.mockResolvedValueOnce(null)

    prismaMockInstance.collectableCount.create.mockResolvedValueOnce({
      id: 1,
      name: 'stringadsf',
      count: 1,
      inventoryId: '',
      wishlistId: '',
      waresId: '',
    })

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/wishlist/:collectable',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        collectable: 'yabba',
      },
      body: {
        count: 1,
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()

  })

  it('Empty token error - return 401', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/wishlist/:collectable',
      headers: {
        Authorization: '',
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
    await app.close()

  })
})
/*
 * DELETE /wishlist/:collectable
 * Update the user's wishlist
 * @param {string} collectable
 * @returns {object} wishlist
 */

describe('/wishlist/:collectable - DELETE', () => {
  it('Successful Wishlist collectable update - return 200', async () => {
    prismaMockInstance.collectableCount.findFirst.mockResolvedValueOnce({
      id: 1,
      name: 'stringadsf',
      count: 1,
      inventoryId: '',
      wishlistId: '',
      waresId: '',
    })

    prismaMockInstance.collectableCount.delete.mockResolvedValueOnce({
      id: 1,
      name: 'stringadsf',
      count: 1,
      inventoryId: '',
      wishlistId: '',
      waresId: '',
    })

    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/wishlist/:collectable',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        collectable: 'yabba',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()

  })

  it('Successful Wishlist delete (no prior existing collectable) - return 200', async () => {
    prismaMockInstance.collectableCount.findFirst.mockResolvedValueOnce(null)

    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/wishlist/:collectable',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        collectable: 'yabba',
      },
    })

    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
    await app.close()

  })
})
