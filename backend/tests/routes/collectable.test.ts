import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'



  /*
   *  GET /collectable
   *  Returns all collectables
   *  @returns {object} collectables
   */
describe('/collectable', () => {
  it('Successfully retrieves all collectable - return 200', async () => {
    prismaMockInstance.collectable.findMany.mockResolvedValueOnce([{
      name: 'Yabbin',
      image: null,
      tags: [],
    }])

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/collectable',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('[{"name":"Yabbin","image":null,"tags":[]}]')
    await app.close()
  })

  it('Empty token - return 401 UnAuthorized', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/collectable/:name',
      headers: {
        Authorization: '',
      },
      query: {
        name: 'babaja',
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
    await app.close()
  })
})



/*
 *  GET /collectable/:name
 *  Returns a collectable by name
 */

describe('/collectable/:name', () => {
  it('Successfully retrieves collectable - return 200', async () => {
    prismaMockInstance.collectable.findFirstOrThrow.mockResolvedValueOnce({
      name: 'Yabbin',
      image: null,
      tags: [],
    })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/collectable/:name',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        name: 'babaja',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('{"name":"Yabbin","image":null,"tags":[]}')
    await app.close()
  })

  it('Empty token - return 401 UnAuthorized', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/collectable/:name',
      headers: {
        Authorization: '',
      },
      query: {
        name: 'babaja',
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
    await app.close()
  })
})

/*
 *  POST
 *  Creates a collectable
 *  @param {string} name
 */

describe('/collectable', () => {
  it('Successfully creates collectable - return 200', async () => {
    prismaMockInstance.collectable.create.mockResolvedValueOnce({
      name: 'Yabbin',
      image: null,
      tags: [],
    })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/collectable',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      body: {
        name: 'babaja',
        image: 'babaja',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('{"name":"Yabbin","image":null,"tags":[]}')
    await app.close()
  })

  it('Empty token - return 401 UnAuthorized', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/collectable/',
      headers: {
        Authorization: '',
      },
      body: {
        name: 'babaja',
        image: 'babaja',
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
    await app.close()
  })
})

  /*
   *  PUT
   *  Updates a collectable
   *  @param {string} name
   *  @param {string} image
   *  @param {string[]} tags
   */

describe('/collectable/:name', () => {
  it('Successfully updates collectable - return 200', async () => {
    prismaMockInstance.collectable.update.mockResolvedValueOnce({
      name: 'Yabbin',
      image: null,
      tags: [],
    })

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/collectable/:name',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        name: 'babaja',
      },
      body: {
        image: 'afdas',
        tags: ['ah'],
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('{"name":"Yabbin","image":null,"tags":[]}')
    await app.close()
  })

  it('Empty token - return 401 UnAuthorized', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/collectable/:name',
      headers: {
        Authorization: '',
      },
      query: {
        name: 'babaja',
      },
      body: {
        image: 'afdas',
        tags: ['ah'],
      }
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
    await app.close()
  })
})


  /*
   *  DELETE
   *  Deletes a collectable
   *  @param {string} name
   */
describe('/collectable/:name', () => {
  it('Successfully deletes collectable - return 200', async () => {
    prismaMockInstance.collectable.delete.mockResolvedValueOnce({
      name: 'Yabbin',
      image: null,
      tags: [],
    })

    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/collectable/:name',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        name: 'babaja',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('{"name":"Yabbin","image":null,"tags":[]}')
    await app.close()
  })

  it('Empty token - return 401 UnAuthorized', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/collectable/:name',
      headers: {
        Authorization: '',
      },
      query: {
        name: 'babaja',
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
    await app.close()
  })
})