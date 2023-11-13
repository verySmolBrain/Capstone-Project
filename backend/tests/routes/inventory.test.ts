import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'

/*
 *  GET /inventory
 *  Returns the user's inventory
 *  @returns {object} inventory
 */

describe('/inventory', () => {
  it('Successfully retrieves inventory of a user - return 200', async () => {
    const mockProfile = {
      inventory: [
        {
          id: 1,
          name: 'Yabbin',
          count: 10,
        },
      ],

      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 0,
      banned: false,
    }
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce(mockProfile)

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/inventory',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('{}')
    await app.close()
  })

  it('Successfully retrieves inventory of a user (inventory with collectables) - return 200', async () => {
    const mockProfile = {
      inventory: [
        {
          id: 1,
          name: null,
          count: 10,
          collectable: {
            collection: [
              { name: 'Collection1', image: 'image1' },
              { name: 'Collection2', image: null },
            ],
          },
        },
      ],

      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 0,
      banned: false,
    }
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce(mockProfile)

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/inventory',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(
      response.body.startsWith('{"Collection1":{"image":"image1","collectables":[{"id":1,"name":null,"count":10,')
    ).toBe(true)
    await app.close()
  })

  it('Empty inventory - return 200', async () => {
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 0,
      banned: false,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/inventory',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('{}')
    await app.close()
  })

  it('Empty token - return 401 UnAuthorized', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/inventory',
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
 *  GET /inventory/:name
 *  Returns the given users inventory
 *  @param {string} name
 *  @returns {object} inventory
 */

describe('/inventory/:name', () => {
  it('Successfully retrieves inventory of a user by name - return 200', async () => {
    const mockProfile = {
      inventory: [
        {
          id: 1,
          name: null,
          count: 10,
          collectable: {
            collection: [
              { name: 'Collection1', image: 'image1' },
              { name: 'Collection2', image: null },
            ],
          },
        },
      ],

      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 0,
      banned: false,
    }
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce(mockProfile)

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/inventory/:name',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        name: 'okiedogi',
      },
    })
    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(
      response.body.startsWith('{"Collection1":{"image":"image1","collectables":[{"id":1,"name":null,"count":10,')
    ).toBe(true)
    await app.close()
  })
})

/*
 *  PUT /inventory
 *  Update the user's inventory
 *  @param {Id[]} collectableIds
 */

describe('/inventory', () => {
  it('Successfully retrieves inventory of a user - return 200', async () => {
    const mockProfile = {
      inventory: [
        {
          id: 1,
          name: 'Yabbin',
          image: null,
        },
      ],

      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 0,
      banned: false,
    }
    prismaMockInstance.profile.update.mockResolvedValueOnce(mockProfile)

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/inventory',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      body: {
        collectableIds: [{ id: 1, name: 'yabbin', image: null }],
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('[{"id":1,"name":"Yabbin","image":null}]')
    await app.close()
  })

  it('Empty token - return 401 Unauthorized', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/inventory',
      headers: {
        Authorization: '',
      },
      body: {
        collectableIds: [{ id: 1, name: 'yabbin', image: null }],
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
    await app.close()
  })
})

/*
 *  PUT /inventory
 *  Update the user's inventory
 *  @param {Id[]} collectableIds
 */

describe('/inventory/:collectable', () => {
  it('Successfully updates a users inventory - return 200', async () => {
    prismaMockInstance.collectableCount.findFirst.mockResolvedValue({
      id: 1,
      name: 'a',
      count: 1,
      inventoryId: '1',
      wishlistId: 'okiedogi',
      waresId: 'okidogi',
    })

    prismaMockInstance.collectableCount.update.mockResolvedValue({
      id: 1,
      name: 'a',
      count: 1,
      inventoryId: '1',
      wishlistId: 'okiedogi',
      waresId: 'okidogi',
    })

    prismaMockInstance.collection.findMany.mockResolvedValue([])

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/inventory/:collectable',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        collectable: 'aa',
      },
      body: {
        count: 1,
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('')
    await app.close()
  })

  it('Successfully updates a users inventory (inventory not prior existing)- return 200', async () => {
    prismaMockInstance.collectableCount.findFirst.mockResolvedValue(null)

    prismaMockInstance.collectableCount.create.mockResolvedValue({
      id: 1,
      name: 'a',
      count: 1,
      inventoryId: '1',
      wishlistId: 'okiedogi',
      waresId: 'okidogi',
    })

    prismaMockInstance.collectableCount.update.mockResolvedValue({
      id: 1,
      name: 'a',
      count: 1,
      inventoryId: '1',
      wishlistId: 'okiedogi',
      waresId: 'okidogi',
    })

    prismaMockInstance.collection.findMany.mockResolvedValue([])

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/inventory/:collectable',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        collectable: 'aa',
      },
      body: {
        count: 1,
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('')
    await app.close()
  })
})

/*
 * DELETE /inventory/:collectable
 * Update the user's inventory
 * @param {string} collectable
 * @returns {object} inventory
 */

describe('/inventory/:collectable', () => {
  it('Successfully deletes a users inventory - return 200', async () => {
    prismaMockInstance.collectableCount.findFirst.mockResolvedValue({
      id: 1,
      name: 'a',
      count: 1,
      inventoryId: '1',
      wishlistId: 'okiedogi',
      waresId: 'okidogi',
    })

    prismaMockInstance.collectableCount.delete.mockResolvedValue({
      id: 1,
      name: 'a',
      count: 1,
      inventoryId: '1',
      wishlistId: 'okiedogi',
      waresId: 'okidogi',
    })

    prismaMockInstance.collection.findMany.mockResolvedValue([])

    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/inventory/:collectable',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        collectable: 'aa',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('')
    await app.close()
  })

  it('Successfully deletes a users inventory (inventory not prior existing)- return 200', async () => {
    prismaMockInstance.collectableCount.findFirst.mockResolvedValue(null)

    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/inventory/:collectable',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        collectable: 'aa',
      },
    })

    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
    await app.close()
  })
})
