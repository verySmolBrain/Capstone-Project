
import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'

  /*
   *  GET /wares
   *  Returns the user's wares
   *  @returns {object} wares
   */

describe('/wares', () => {
  it('Successfully retrieves user\'s wares - return 200', async () => {

    // @ts-expect-error 
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
        wares: [{
            id: 1,
            name: 'dfsa',
            image: null,
        }],
        id: 'yabb',
        name: 'yabba',
        description: null,
        image: null,
        reputation: 42,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/wares',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe("[{\"id\":1,\"name\":\"dfsa\",\"image\":null}]")
    await app.close()
  })

  it('Empty token - return 401 UnAuthorized', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/wares',
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
    *  PUT /wares
    *  Update the user's wares
    *  @param {Id[]} collectableIds
*/
describe('/wares', () => {
  it('Successfully retrieves updates user\'s wares - return 200', async () => {

    // @ts-expect-error 
    prismaMockInstance.profile.update.mockResolvedValueOnce({
        wares: [{
            id: 1,
            name: 'dfsa',
            image: null,
        }],
        id: 'yabb',
        name: 'yabba',
        description: null,
        image: null,
        reputation: 42,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/wares',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      body: {
        collectableIds: [{id: 1, name: 'yabbin', image: null},]
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe("[{\"id\":1,\"name\":\"dfsa\",\"image\":null}]")
    await app.close()
  })

  it('Empty token - return 401 UnAuthorized', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/wares',
      headers: {
        Authorization: '',
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
    await app.close()
  })
})

