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
    await app.close()
  })
})

/*
 * GET /campaign
 * Returns all campaigns
 * @returns {object} campaigns
 */

describe('/campaign - get', () => {
  it('Successfully retrieves campaigns - return 200', async () => {
    prismaMockInstance.campaign.findMany.mockResolvedValueOnce([
      {
        name: 'yabba',
        image: 'a',
        tags: [],
        start: new Date(),
        end: new Date(),
        isActive: false,
        views: 0,
        viewData: [],
      },
    ])

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
    expect(response.body.startsWith('[{"name":"yabba","image":"a","tags":[],"start":"')).toBe(true)
    await app.close()
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
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
    await app.close()
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
      isActive: false,
      views: 0,
      viewData: [],
    })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/campaign/:name',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        name: 'gobby',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith('{"name":"yabba","image":"a","tags":[],"start":"')).toBe(true)
    await app.close()
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
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
    await app.close()
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
      isActive: false,
      views: 0,
      viewData: [],
    })

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/campaign/:name',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        name: 'gobby',
      },
      body: {
        image: 'a',
        startDate: new Date(),
        endDate: new Date(),
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith('{"name":"yabba","image":"a","tags":[],"start":"')).toBe(true)
    await app.close()
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
        name: 'gobby',
      },
      body: {
        image: 'a',
        startDate: new Date(),
        endDate: new Date(),
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
    await app.close()
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
      isActive: false,
      views: 0,
      viewData: [],
    })

    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/campaign/:name',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        name: 'gobby',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith('{"name":"yabba","image":"a","tags":[],"start":"')).toBe(true)
    await app.close()
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
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
    await app.close()
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
      views: 0,
      viewData: [],
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
        collectionName: 'nobby',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith('{"name":"gobby","image":"a","tags":[],"start":"')).toBe(true)
    await app.close()
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
      views: 0,
      viewData: [],
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
        collectionName: 'nobby',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith('{"name":"gobby","image":"a","tags":[],"start":"')).toBe(true)
    await app.close()
  })
})

  /*
   * GET /campaign/metrics/post/:name
   * Returns a campaign's post metrics by name
   * @returns {object} {string, int}
  */
describe('GET /campaign/metrics/post/:name', () => {
  it('Successfully retrives a campigns post metrics - return 200', async () => {
    //@ts-expect-error testing post without unnececary fields
    prismaMockInstance.campaign.findFirstOrThrow.mockResolvedValueOnce({
      name: 'gobby',
      image: 'a',
      tags: [],
      start: new Date(),
      end: new Date(),
      isActive: false,
      views: 0,
      viewData: [],
      posts: [
        {createdAt: new Date(2023)},
        {createdAt: new Date(2023)},
        {createdAt: new Date(2023)}
      ]
    })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/campaign/metrics/post/:name',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        name: 'gobby'
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe(  "[{\"date\":\"01/01/70\",\"Posts\":3}]" )
    await app.close()
  })
})

/*
   * GET /campaign/metrics/posters/:name
   * Returns a campaign's poster metrics by name
   * @returns {object} {string, int}
*/

describe('GET /campaign/metrics/posters/:name', () => {
  it('Successfully retrives a campaigns poster metrics - return 200', async () => {
    //@ts-expect-error testing post without unnececary fields
    prismaMockInstance.campaign.findFirstOrThrow.mockResolvedValueOnce({
      name: 'gobby',
      image: 'a',
      tags: [],
      start: new Date(),
      end: new Date(),
      isActive: false,
      views: 0,
      viewData: [],
      posts: [
        {createdAt: new Date(2023)},
        {createdAt: new Date(2023)},
        {createdAt: new Date(2023)}
      ]
    })
    prismaMockInstance.profile.findFirstOrThrow.mockResolvedValue({
      id: 'double',
      name: 'yabba',
      description: null,
      image: null,
      reputation: 1,
      banned: false,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/campaign/metrics/posters/:name',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        name: 'gobby'
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe("[{\"Poster\":\"yabba\",\"Posts\":3}]")
    await app.close()
  })
})

/**
   * GET /campaign/metrics/review/:name
   * Returns a campaign's average reviews
   * @returns number
*/

describe('GET /campaign/metrics/reviews/:name', () => {
  it('Correctly retrieves avg rating value - return 200', async () => {
    //@ts-expect-error testing post without unnececary fields
    prismaMockInstance.campaign.findFirstOrThrow.mockResolvedValueOnce({
      name: 'gobby',
      image: 'a',
      tags: [],
      start: new Date(),
      end: new Date(),
      isActive: false,
      views: 0,
      viewData: [],
      posts: [
        {createdAt: new Date()},
        {createdAt: new Date()},
        {createdAt: new Date()}
      ],
      reviews: [
        {rating: 1},
        {rating: 3},
        {rating: 2},
      ]

    })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/campaign/metrics/reviews/:name',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        name: 'gobby'
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('2')
    await app.close()
  })
  it('Correctly retrieves avg rating value (division by 0 case) - return 200', async () => {
    //@ts-expect-error testing post without unnececary fields
    prismaMockInstance.campaign.findFirstOrThrow.mockResolvedValueOnce({
      name: 'gobby',
      image: 'a',
      tags: [],
      start: new Date(),
      end: new Date(),
      isActive: false,
      views: 0,
      viewData: [],
      posts: [
        {createdAt: new Date()},
        {createdAt: new Date()},
        {createdAt: new Date()}
      ],
      reviews: [
      ]

    })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/campaign/metrics/reviews/:name',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        name: 'gobby'
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('0')
    await app.close()
  })
})

/**
   * PUT /campaign/:name/view
   * Increments campaign view count by 1
   * @returns void
*/
describe('/campaign/:name/view - put', () => {
  it('Successful view incrementation - return 200', async () => {
    prismaMockInstance.campaign.update.mockResolvedValue({
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
      method: 'PUT',
      url: '/campaign/:name/view',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        timestamp: 42
      },
      query: {
        name: 'a'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })
})

/*
  *  GET /reviews/campaign/:name
  *  Gets the campaigns reviews by name
  *  @param {float} review
  *  @returns a list of {reviewer: Reviewer, review: float, description: string}
*/
describe('/reviews/campaign/:name - get', () => {
  it('Successful retrive campaign reviews by name - return 200', async () => {
    const reviews = [
      {
        reviewer: {
          id: "1",
          name: "John Doe",
          description: "A passionate reviewer",
          image: "profile.jpg",
          reputation: 4.5,
        },
        id: 123,
        rating: 4.0,
        comment: "Great product! I highly recommend it.",
        campaignName: "Awesome Campaign",
        reviewerId: "1",
      },
      {
        reviewer: {
          id: "2",
          name: "Jane Smith",
          description: null,
          image: null,
          reputation: 3.8,
        },
        id: 124,
        rating: 3.5,
        comment: "It's okay, but could be better.",
        campaignName: "Improved Product Launch",
        reviewerId: "2",
      },
    ];
    
    prismaMockInstance.campaignReview.findMany.mockResolvedValue(reviews)

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/reviews/campaign/:name',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        name: 'a'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("[{\"reviewer\":{\"id\":\"1\",\"name\":\"John Doe\",\"description\":\"A ")).toBe(true)
    await app.close()
  })
})



/**
 * PUT /reviews/campaign/:name
 * Creates a review for a campaign
 * @param {float} review
 * @param {string} description
 * @returns the review
*/

describe('/reviews/campaign/:name - get', () => {
  it('Successfully updates campaign reviews by name - return 200', async () => {
    const reviews = 
      {
        reviewer: {
          id: "1",
          name: "John Doe",
          description: "A passionate reviewer",
          image: "profile.jpg",
          reputation: 4.5,
        },
        id: 123,
        rating: 4.0,
        comment: "Great product! I highly recommend it.",
        campaignName: "Awesome Campaign",
        reviewerId: "1",
      };
    
    prismaMockInstance.campaignReview.findFirst.mockResolvedValue(reviews)
    prismaMockInstance.campaignReview.update.mockResolvedValue(reviews)
    prismaMockInstance.campaignReview.create.mockResolvedValue(reviews)

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/reviews/campaign/:name',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        name: 'a'
      },
      body: {
        review: 1,
        description: 'a'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("{\"reviewer\":{\"id\":\"1\",\"name\":\"John Doe\",\"description\":\"A passionate reviewer\",\"image\":\"profile.jpg\",\"reputation\":4.5},\"id\":123,\"rating")).toBe(true)
    await app.close()
  })

  it('Successfully creates campaign reviews  - return 200', async () => {
    const reviews = 
      {
        reviewer: {
          id: "1",
          name: "John Doe",
          description: "A passionate reviewer",
          image: "profile.jpg",
          reputation: 4.5,
        },
        id: 123,
        rating: 4.0,
        comment: "Great product! I highly recommend it.",
        campaignName: "Awesome Campaign",
        reviewerId: "1",
      };
    
    prismaMockInstance.campaignReview.findFirst.mockResolvedValue(null)
    prismaMockInstance.campaignReview.create.mockResolvedValue(reviews)

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/reviews/campaign/:name',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        name: 'a'
      },
      body: {
        review: 1,
        description: 'a'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("{\"reviewer\":{\"id\":\"1\",\"name\":\"John Doe\",\"description\":\"A passionate reviewer\",\"image\":\"profile.jpg\",\"reputation\":4.5},\"id\":123,\"rating")).toBe(true)
    await app.close()
  })
})