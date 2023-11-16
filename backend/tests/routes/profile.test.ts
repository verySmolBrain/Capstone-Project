import { Role } from '@prisma/client'
import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'
import * as utils from '@Source/utils/utils'

/*
 * POST /user
 * Creates a user and profile
 */
describe('/user - POST', () => {
  it('Successful creation of a user - return 200', async () => {
    prismaMockInstance.user.create.mockResolvedValueOnce({
      id: 'Sticky man',
      role: Role.USER,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/user',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('{"id":"Sticky man","role":"USER"}')

    await app.close()
  })

  it('Creation of a an existing user - return 200', async () => {
    prismaMockInstance.user.findMany.mockResolvedValueOnce([
      {
        id: 'Sticky man',
        role: Role.USER,
      },
    ])

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/user',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('{"id":"Sticky man","role":"USER"}')

    await app.close()
  })

  it('Successful creation of an admin - return 200', async () => {
    prismaMockInstance.user.create.mockResolvedValueOnce({
      id: 'Sticky man',
      role: Role.ADMIN,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/user',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('{"id":"Sticky man","role":"ADMIN"}')

    await app.close()
  })

  it('Successful creation of a manager - return 200', async () => {
    prismaMockInstance.user.create.mockResolvedValueOnce({
      id: 'Sticky man',
      role: Role.MANAGER,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/user',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('{"id":"Sticky man","role":"MANAGER"}')

    await app.close()
  })

  it('Empty token - return 401 Unorthorized', async () => {
    prismaMockInstance.user.create.mockResolvedValueOnce({
      id: 'Sticky man',
      role: Role.USER,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/user',
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
 *  GET /user
 *  Returns the current user
 */

describe('/profile - GET', () => {
  it("Successfully gets user's profile - return 200", async () => {
    const app = await build({})

    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
      banned: false,
    })

    const response1 = await app.inject({
      method: 'GET',
      url: '/profile',
      headers: {
        Authorization: 'double',
      },
    })

    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    expect(response1.body).toBe(
      '{"id":"double","name":"stringadsf","description":null,"image":null,"reputation":1,"banned":false}'
    )

    await app.close()
  })

  it('Empty Token - return 401', async () => {
    const app = await build({})

    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
      banned: false,
    })

    const response1 = await app.inject({
      method: 'GET',
      url: '/profile',
      headers: {
        Authorization: '',
      },
    })

    expect(response1.statusCode).toBe(401)
    expect(response1.statusMessage).toBe('Unauthorized')

    await app.close()
  })
})

/*
 *  GET /profile/:name
 *  Returns the user's profile by name
 *  @param {string} name
 */

describe('/profile/:name - GET', () => {
  it("Successfully gets requested user's profile - return 200", async () => {
    const app = await build({})

    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
      banned: false,
    })

    const response1 = await app.inject({
      method: 'GET',
      url: '/profile/:name',
      headers: {
        Authorization: 'double',
      },
      query: {
        name: 'a',
      },
    })

    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    expect(response1.body).toBe(
      '{"id":"double","name":"stringadsf","description":null,"image":null,"reputation":1,"banned":false}'
    )

    await app.close()
  })

  it('Empty Token - return 401', async () => {
    const app = await build({})

    const response1 = await app.inject({
      method: 'GET',
      url: '/profile/:name',
      headers: {
        Authorization: '',
      },
    })

    expect(response1.statusCode).toBe(401)
    expect(response1.statusMessage).toBe('Unauthorized')

    await app.close()
  })
})

/*
 *  PUT /profile/name
 *  Updates the user's name
 *  @param {string} name
 */
describe('/profile/name - PUT', () => {
  it('Successfully updates user profile - return 200', async () => {
    const app = await build({})

    // No need to mock findFirst since we're testing the case where the same name does not exist
    prismaMockInstance.profile.update.mockResolvedValueOnce({
      id: 'double',
      name: 'New name',
      description: null,
      image: null,
      reputation: 1,
      banned: false,
    })

    const response1 = await app.inject({
      method: 'PUT',
      url: '/profile/name',
      headers: {
        Authorization: 'double',
      },
      body: {
        name: 'New name',
      },
    })

    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    expect(response1.body).toBe(
      '{"id":"double","name":"New name","description":null,"image":null,"reputation":1,"banned":false}'
    )

    await app.close()
  })

  it('Empty token - return 401', async () => {
    const app = await build({})

    // No need to mock findFirst since we're testing the case where the same name does not exist
    prismaMockInstance.profile.update.mockResolvedValueOnce({
      id: 'double',
      name: 'New name',
      description: null,
      image: null,
      reputation: 1,
      banned: false,
    })

    const response1 = await app.inject({
      method: 'PUT',
      url: '/profile/name',
      headers: {
        Authorization: '',
      },
      body: {
        name: 'New name',
      },
    })

    expect(response1.statusCode).toBe(401)
    expect(response1.statusMessage).toBe('Unauthorized')
    await app.close()
  })

  it('New name already exists - return 400', async () => {
    const app = await build({})
    prismaMockInstance.profile.findFirst.mockResolvedValueOnce({
      id: 'double',
      name: 'New name',
      description: null,
      image: null,
      reputation: 1,
      banned: false,
    })

    const response1 = await app.inject({
      method: 'PUT',
      url: '/profile/name',
      headers: {
        Authorization: 'double',
      },
      body: {
        name: 'New name',
      },
    })

    expect(response1.statusCode).toBe(400)
    expect(response1.statusMessage).toBe('Bad Request')
    await app.close()
  })
})

/*
 *  PUT /profile/description
 *  Updates the user's description
 *  @param {string} description
 */
describe('/profile/description - PUT', () => {
  it('Successfully updates user profile description - return 200', async () => {
    const app = await build({})

    const response1 = await app.inject({
      method: 'PUT',
      url: '/profile/description',
      headers: {
        Authorization: 'double',
      },
      body: {
        description: 'Dont read this.',
      },
    })

    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    await app.close()
  })

  it('Empty token - return 401', async () => {
    const app = await build({})

    const response1 = await app.inject({
      method: 'PUT',
      url: '/profile/description',
      headers: {
        Authorization: '',
      },
      body: {
        description: 'New name',
      },
    })

    expect(response1.statusCode).toBe(401)
    expect(response1.statusMessage).toBe('Unauthorized')
    await app.close()
  })
})

/*
 *  PUT /profile/image
 *  Updates the user's image url
 *  @param {string} image url
 */
describe('/profile/review - PUT', () => {
  it('Successfully updates user profile image - return 200', async () => {
    const app = await build({})

    const response1 = await app.inject({
      method: 'PUT',
      url: '/profile/image',
      headers: {
        Authorization: 'double',
      },
      body: {
        image: 'Dont this.',
      },
    })

    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    await app.close()
  })

  it('Empty token - return 401', async () => {
    const app = await build({})

    const response1 = await app.inject({
      method: 'PUT',
      url: '/profile/image',
      headers: {
        Authorization: '',
      },
      body: {
        description: 'New name',
      },
    })

    expect(response1.statusCode).toBe(401)
    expect(response1.statusMessage).toBe('Unauthorized')
    await app.close()
  })
})

  /*
   *  GET /reviews/profile/:name
   *  Gets the user's reviews
   *  @param {float} review
   *  @returns a list of {profile: Profile, review: float, description: string}
   */
  describe('/reviews/profile/:name - GET', () => {
    it('Successfully gets user reviews - return 200', async () => {
      const reviews: ({
        reviewer: {
            id: string;
            name: string;
            description: string | null;
            image: string | null;
            reputation: number;
        };
    } & {
        id: number;
        rating: number;
        comment: string;
        revieweeId: string;
        reviewerId: string;
    })[] = [
        {
            reviewer: {
                id: "user1",
                name: "John Doe",
                description: "A seasoned reviewer",
                image: "john_doe.jpg",
                reputation: 4.7,
            },
            id: 1,
            rating: 4.5,
            comment: "Excellent product!",
            revieweeId: "product123",
            reviewerId: "user1",
        },
        {
            reviewer: {
                id: "user2",
                name: "Jane Smith",
                description: "New to reviewing",
                image: null,
                reputation: 3.2,
            },
            id: 2,
            rating: 3.0,
            comment: "Could be better.",
            revieweeId: "product456",
            reviewerId: "user2",
        },
        // Add more reviews as needed
    ];
    prismaMockInstance.userReview.findMany.mockResolvedValue(reviews)

      const app = await build({})
  
      const response1 = await app.inject({
        method: 'GET',
        url: '/reviews/profile/:name',
        headers: {
          Authorization: 'double',
        },
        body: {
          image: 'Dont this.',
        },
      })
  
      expect(response1.statusCode).toBe(200)
      expect(response1.statusMessage).toBe('OK')
      await app.close()
    })
  })

  /**
   *  PUT /reviews/profile/:name
   *  Creates a new review for the user
   *  @param {float} review
   *  @param {string} description
   *  @returns a list of {review: float, description: string}
   */
  describe('/reviews/profile/:name - PUT', () => {
    it('Successfully updates user review - return 200', async () => {
      const findReview = {
        id: 1,
        rating: 4.5,
        comment: "Excellent product!",
        revieweeId: "product123",
        reviewerId: "user1",
    };
    const spy = jest.spyOn(utils, 'getUserId')
    spy.mockReturnValue(Promise.resolve('double'))

    prismaMockInstance.userReview.findFirst.mockResolvedValue(findReview)
    prismaMockInstance.userReview.update.mockResolvedValue(findReview)
    prismaMockInstance.userReview.create.mockResolvedValue(findReview)

      const app = await build({})
  
      const response1 = await app.inject({
        method: 'PUT',
        url: '/reviews/profile/:name',
        headers: {
          Authorization: 'double',
        },
        query: {
          name: 'a'
        },
        body: {
          review: 1,
          description: 'a'
        }
      })
  
      expect(response1.statusCode).toBe(200)
      expect(response1.statusMessage).toBe('OK')
      await app.close()
    })
    
    it('Successfully creates user review - return 200', async () => {
      const findReview = {
        id: 1,
        rating: 4.5,
        comment: "Excellent product!",
        revieweeId: "product123",
        reviewerId: "user1",
    };
    const spy = jest.spyOn(utils, 'getUserId')
    spy.mockReturnValue(Promise.resolve('double'))

    prismaMockInstance.userReview.findFirst.mockResolvedValue(null)
    prismaMockInstance.userReview.create.mockResolvedValue(findReview)

    const app = await build({})

    const response1 = await app.inject({
      method: 'PUT',
      url: '/reviews/profile/:name',
      headers: {
        Authorization: 'double',
      },
      query: {
        name: 'a'
      },
      body: {
        review: 1,
        description: 'a'
      }
    })

    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    await app.close()
    })
})

/*
 *  GET /role
 *  Returns the current user's role
 *  @returns {string} role
 */
describe('/role - GET', () => {
  it("Successfully gets user's role - return 200", async () => {
    const app = await build({})
    prismaMockInstance.user.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      role: Role.USER,
    })

    const response1 = await app.inject({
      method: 'GET',
      url: '/role',
      headers: {
        Authorization: 'double',
      },
    })

    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    expect(response1.body).toBe('{"role":"USER"}')
    await app.close()
  })

  it("Successfully gets user's role (MANAGER) - return 200", async () => {
    const app = await build({})

    prismaMockInstance.user.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      role: Role.MANAGER,
    })

    const response1 = await app.inject({
      method: 'GET',
      url: '/role',
      headers: {
        Authorization: 'double',
      },
    })

    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    expect(response1.body).toBe('{"role":"MANAGER"}')
    await app.close()
  })

  it("Successfully gets user's role (ADMIN) - return 200", async () => {
    const app = await build({})

    prismaMockInstance.user.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      role: Role.ADMIN,
    })

    const response1 = await app.inject({
      method: 'GET',
      url: '/role',
      headers: {
        Authorization: 'double',
      },
    })

    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    expect(response1.body).toBe('{"role":"ADMIN"}')
    await app.close()
  })
})

/*
 *  GET /role
 *  Returns the given user's role
 *  @returns {string} role
 */
describe('/role/:name - GET', () => {
  it("Successfully gets user's role - return 200", async () => {
    const app = await build({})

    prismaMockInstance.user.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      role: Role.USER,
    })

    const spy = jest.spyOn(utils, 'getUserId')
    spy.mockReturnValue(Promise.resolve('double'))

    const response1 = await app.inject({
      method: 'GET',
      url: '/role/:name',
      headers: {
        Authorization: 'double',
      },
      query: {
        name: 'okidogi',
      },
    })

    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    expect(response1.body).toBe('{"role":"USER"}')
    await app.close()
  })

  it("Successfully gets user's role (MANAGER) - return 200", async () => {
    const app = await build({})

    prismaMockInstance.user.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      role: Role.MANAGER,
    })

    const spy = jest.spyOn(utils, 'getUserId')
    spy.mockReturnValue(Promise.resolve('double'))

    const response1 = await app.inject({
      method: 'GET',
      url: '/role/:name',
      headers: {
        Authorization: 'double',
      },
      query: {
        name: 'okidogi',
      },
    })

    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    expect(response1.body).toBe('{"role":"MANAGER"}')
    await app.close()
  })

  it("Successfully gets user's role (ADMIN) - return 200", async () => {
    const app = await build({})

    prismaMockInstance.user.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      role: Role.ADMIN,
    })
    const spy = jest.spyOn(utils, 'getUserId')
    spy.mockReturnValue(Promise.resolve('double'))

    const response1 = await app.inject({
      method: 'GET',
      url: '/role/:name',
      headers: {
        Authorization: 'double',
      },
      query: {
        name: 'okidogi',
      },
    })

    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    expect(response1.body).toBe('{"role":"ADMIN"}')
    await app.close()
  })
})


  /*
   *  GET /banned
   *  Returns the if the user is banned or not
   *  @returns {boolean} banned status
   */
   describe('GET /banned/:id', () => {
    it("Successfully gets user's role - return 200", async () => {
      const app = await build({})
  
      prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
        id: 'double',
        name: 'stringadsf',
        description: null,
        image: null,
        reputation: 1,
        banned: false,
      })
  
      const response1 = await app.inject({
        method: 'GET',
        url: '/banned/:id',
        headers: {
          Authorization: 'double',
        },
        query: {
          id: 'okidogi',
        },
      })
  
      expect(response1.statusCode).toBe(200)
      expect(response1.statusMessage).toBe('OK')
      expect(response1.body).toBe("{\"banned\":false}")
      await app.close()
    })
  })