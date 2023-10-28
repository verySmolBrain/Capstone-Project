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
    expect(response.body).toBe('[{"id":1,"name":"Yabbin","count":10}]')
    await app.close()
  })

  it('Empty inventory - return 200', async () => {
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 0,
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
    expect(response.body).toBe('')
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
