import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'

  /*
   * GET /search/:name
   * Returns all users, collectibles, collections, campaigns matching the name or exact tag
   * @param {string} name
   * @returns {object} collectibles
   */
describe('/search/:name', () => {
  it('Successfully search for item empty name - return 200', async () => {
    prismaMockInstance.collectable.findMany.mockResolvedValueOnce([{
        name: 'Yabbin',
        image: null,
        tags: [],
    }])

    prismaMockInstance.collection.findMany.mockResolvedValueOnce([{
        name: 'Yabbin',
        image: 'aaaa',
        tags: [],
    }])

    prismaMockInstance.campaign.findMany.mockResolvedValueOnce([{
        name: 'yabba',
        image: 'a',
        tags: [],
        start: new Date(),
        end: new Date(),
        isActive: false
    }])

    prismaMockInstance.profile.findMany.mockResolvedValueOnce([{
        id: 'double',
        name: 'stringadsf',
        description: null,
        image: null,
        reputation: 1,
      }])

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/search/:name',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        name: '',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("{\"collectables\":[{\"name\":\"Yabbin\",\"image\":null,\"tags\":[]}],\"collections\":[{\"name\":\"Yabbin\",\"image\":\"aaaa\",\"tags\":[]}],\"")).toBe(true)
    await app.close()
  })

  it('Successfully search for item - return 200', async () => {
    prismaMockInstance.collectable.findMany.mockResolvedValueOnce([{
        name: 'Yabbin',
        image: null,
        tags: [],
    }])

    prismaMockInstance.collection.findMany.mockResolvedValueOnce([{
        name: 'Yabbin',
        image: 'aaaa',
        tags: [],
    }])

    prismaMockInstance.campaign.findMany.mockResolvedValueOnce([{
        name: 'yabba',
        image: 'a',
        tags: [],
        start: new Date(),
        end: new Date(),
        isActive: false
    }])

    prismaMockInstance.profile.findMany.mockResolvedValueOnce([{
        id: 'double',
        name: 'stringadsf',
        description: null,
        image: null,
        reputation: 1,
      }])

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/search/:name',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        name: 'hhghghghg mimimimi',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("{\"collectables\":[{\"name\":\"Yabbin\",\"image\":null,\"tags\":[]}],\"collections\":[{\"name\":\"Yabbin\",\"image\":\"aaaa\",\"tags\":[]}],\"")).toBe(true)
    await app.close()
  })
})

  /*
   * GET /search/collectible/:name
   * Returns all collectibles matching the name
   * @param {string} name
   * @returns {object} collectibles
   */
describe('/search/collectible/:name', () => {
  it('Successfully search for collectible - return 200', async () => {
    prismaMockInstance.collectable.findMany.mockResolvedValueOnce([{
        name: 'Yabbin',
        image: null,
        tags: [],
    }])

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/search/collectable/:name',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        name: '',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe("[{\"name\":\"Yabbin\",\"image\":null,\"tags\":[]}]")
    await app.close()
  })
})

  /*
   * GET /search/collection/:name
   * Returns all collections matching the name
   * @returns {object} collections
   */
describe('/search/collection/:name', () => {
  it('Successfully search for collection - return 200', async () => {
    prismaMockInstance.collection.findMany.mockResolvedValueOnce([{
        name: 'Yabbin',
        image: 'aaaa',
        tags: [],
    }])


    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/search/collection/:name',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        name: '',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe("[{\"name\":\"Yabbin\",\"image\":\"aaaa\",\"tags\":[]}]")
    await app.close()
  })
})

  /*
   * GET /search/user/:name
   * Returns all users matching the name
   * @returns {object} users
   */
  describe('/search/user/:name', () => {
    it('Successfully search for collection - return 200', async () => {
        prismaMockInstance.profile.findMany.mockResolvedValueOnce([{
            id: 'double',
            name: 'stringadsf',
            description: null,
            image: null,
            reputation: 1,
          }])
  
      const app = await build({})
      const response = await app.inject({
        method: 'GET',
        url: '/search/user/:name',
        headers: {
          Authorization: 'Bearer your-token-here',
        },
        query: {
          name: '',
        },
      })
  
      expect(response.statusCode).toBe(200)
      expect(response.statusMessage).toBe('OK')
      expect(response.body).toBe("[{\"id\":\"double\",\"name\":\"stringadsf\",\"description\":null,\"image\":null,\"reputation\":1}]")
      await app.close()
    })
  })

/*
   * GET /search/campaign/:name
   * Returns all campaigns matching the name
   * @returns {object} users
*/
describe('/search/campaign/:name', () => {
    it('Successfully search for collection - return 200', async () => {
        prismaMockInstance.campaign.findMany.mockResolvedValueOnce([{
            name: 'yabba',
            image: 'a',
            tags: [],
            start: new Date(),
            end: new Date(),
            isActive: false
        }])
  
      const app = await build({})
      const response = await app.inject({
        method: 'GET',
        url: '/search/campaign/:name',
        headers: {
          Authorization: 'Bearer your-token-here',
        },
        query: {
          name: '',
        },
      })
  
      expect(response.statusCode).toBe(200)
      expect(response.statusMessage).toBe('OK')
      expect(response.body.startsWith( "[{\"name\":\"yabba\",\"image\":\"a\",\"tags\":[],\"start\"")).toBe(true)
      await app.close()
    })
  })