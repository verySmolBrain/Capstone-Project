import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'

  /*
   * POST /campaign
   * Creates a campaign
   * @param {string} name
   * @param {string} image
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {object} campaign
   */

describe('/campaign - post', () => {
  it('Successful campaign creation - return 200', async () => {
    prismaMockInstance.campaign.create.mockResolvedValueOnce({
        name: 'yabba',
        image: 'a',
        tags: [],
        start: new Date(),
        end: new Date(),
        isActive: false
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
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("{\"name\":\"yabba\",\"image\":\"a\",\"tags\":[],\"start\":\"")).toBe(true)
  })

  it('Empty token error - return 401', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/campaign',
      headers: {
        Authorization: '',
      },
      body: {
        name: 'a',
        image: 'a',
        startDate: new Date(),
        endDate: new Date(),
      }
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')

  })
})


  /*
   * GET /campaign
   * Returns all campaigns
   * @returns {object} campaigns
   */

describe('/campaign - get', () => {
  it('Successfully retrieves campaigns - return 200', async () => {
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
      url: '/campaign',
      headers: {
        Authorization: 'yobba',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("[{\"name\":\"yabba\",\"image\":\"a\",\"tags\":[],\"start\":\"")).toBe(true)
  })

  it('Empty token error - return 401', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/campaign',
      headers: {
        Authorization: '',
      },
      body: {
        name: 'a',
        image: 'a',
        startDate: new Date(),
        endDate: new Date(),
      }
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
  })
})


  /*
   * GET /campaign/:name
   * Returns a campaign by name
   * @returns {object} campaign
   */
  describe('/campaign/:name - get', () => {
    it('Successfully retrieves campaigns - return 200', async () => {
      prismaMockInstance.campaign.findFirstOrThrow.mockResolvedValueOnce({
          name: 'yabba',
          image: 'a',
          tags: [],
          start: new Date(),
          end: new Date(),
          isActive: false
      })
  
      const app = await build({})
      const response = await app.inject({
        method: 'GET',
        url: '/campaign/:name',
        headers: {
          Authorization: 'yobba',
        },
        query: {
            name: 'gobby'
        }
      })
  
      expect(response.statusCode).toBe(200)
      expect(response.statusMessage).toBe('OK')
      expect(response.body.startsWith("{\"name\":\"yabba\",\"image\":\"a\",\"tags\":[],\"start\":\"")).toBe(true)
    })
  
    it('Empty token error - return 401', async () => {
      const app = await build({})
      const response = await app.inject({
        method: 'GET',
        url: '/campaign/:name',
        headers: {
          Authorization: '',
        },
        body: {
          name: 'a',
          image: 'a',
          startDate: new Date(),
          endDate: new Date(),
        }
      })
  
      expect(response.statusCode).toBe(401)
      expect(response.statusMessage).toBe('Unauthorized')
    })
  })


  /*
   * PUT /campaign/:name
   * Updates a campaign by name
   * @param {string} name
   * @param {string} image
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {object} campaign
   */
  describe('/campaign/:name - put', () => {
    it('Successfully retrieves campaigns - return 200', async () => {
      prismaMockInstance.campaign.update.mockResolvedValueOnce({
          name: 'yabba',
          image: 'a',
          tags: [],
          start: new Date(),
          end: new Date(),
          isActive: false
      })
  
      const app = await build({})
      const response = await app.inject({
        method: 'PUT',
        url: '/campaign/:name',
        headers: {
          Authorization: 'yobba',
        },
        query: {
            name: 'gobby'
        },
        body: {
            image: 'a',
            startDate: new Date(),
            endDate: new Date(),
          }
      })
  
      expect(response.statusCode).toBe(200)
      expect(response.statusMessage).toBe('OK')
      expect(response.body.startsWith("{\"name\":\"yabba\",\"image\":\"a\",\"tags\":[],\"start\":\"")).toBe(true)
    })
  
    it('Empty token error - return 401', async () => {
        const app = await build({})
        const response = await app.inject({
          method: 'PUT',
          url: '/campaign/:name',
          headers: {
            Authorization: '',
          },
          query: {
              name: 'gobby'
          },
          body: {
              image: 'a',
              startDate: new Date(),
              endDate: new Date(),
            }
        })
    
  
      expect(response.statusCode).toBe(401)
      expect(response.statusMessage).toBe('Unauthorized')
    })
  })
  /*
   * DELETE /campaign/:name
   * Deletes a campaign by name
   * @param {string} name
   * @returns {boolean} success
   */
describe('/campaign/:name - delete', () => {
  it('Successfully retrieves campaigns - return 200', async () => {
    prismaMockInstance.campaign.delete.mockResolvedValueOnce({
        name: 'yabba',
        image: 'a',
        tags: [],
        start: new Date(),
        end: new Date(),
        isActive: false
    })

    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/campaign/:name',
      headers: {
        Authorization: 'yobba',
      },
      query: {
          name: 'gobby'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("{\"name\":\"yabba\",\"image\":\"a\",\"tags\":[],\"start\":\"")).toBe(true)
  })

  it('Empty token error - return 401', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/campaign/:name',
      headers: {
        Authorization: '',
      },
      body: {
        name: 'a',
        image: 'a',
        startDate: new Date(),
        endDate: new Date(),
      }
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
  })
})


    /*
   * PUT /collection/:collectionName/:collectableName
   * Adds a collection to a campaign by name
   * @param {string} name
   * @param {string} image
   * @returns {object} campaign
   */

describe('/campaign/:collectionName/:collectableName - PUT', () => {
  it('Successfully updates a campaign by name - return 200', async () => {
    prismaMockInstance.campaign.update.mockResolvedValueOnce({
        name: 'gobby',
        image: 'a',
        tags: [],
        start: new Date(),
        end: new Date(),
        isActive: false,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/campaign/:collectionName/:collectableName',
      headers: {
        Authorization: 'yobba',
      },
      query: {
          campaignName: 'gobby',
          collectionName: 'nobby'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("{\"name\":\"gobby\",\"image\":\"a\",\"tags\":[],\"start\":\"")).toBe(true)
  })
})

/*
  * DELETE /collection/:collectionName/:collectableName
  * Removes a collection from a campaign
  * @param {string} collection
  * @param {string} collectable
  * @returns {object} collection
  */

describe('/campaign/:campaignName/:collectionName - DELETE', () => {
  it('Successfully updates a campaign by name - return 200', async () => {
    prismaMockInstance.campaign.update.mockResolvedValueOnce({
        name: 'gobby',
        image: 'a',
        tags: [],
        start: new Date(),
        end: new Date(),
        isActive: false,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/campaign/:campaignName/:collectionName',
      headers: {
        Authorization: 'yobba',
      },
      query: {
          campaignName: 'gobby',
          collectionName: 'nobby'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("{\"name\":\"gobby\",\"image\":\"a\",\"tags\":[],\"start\":\"")).toBe(true)
  })
})