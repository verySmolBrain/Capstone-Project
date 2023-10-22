import { Role } from '@prisma/client'
import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'

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
  it('Successfully gets user\'s profile - return 200', async () => {
    const app = await build({})
    
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
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
    expect(response1.body).toBe('{\"id\":\"double\",\"name\":\"stringadsf\",\"description\":null,\"image\":null,\"reputation\":1}')
    
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
  it('Successfully gets requested user\'s profile - return 200', async () => {
    const app = await build({})
    
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
    })
    
    const response1 = await app.inject({
      method: 'GET',
      url: '/profile/:name',
      headers: {
        Authorization: 'double',
      },
      query: {
        name: 'a'
      }
    })
    
    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    expect(response1.body).toBe('{\"id\":\"double\",\"name\":\"stringadsf\",\"description\":null,\"image\":null,\"reputation\":1}')
    
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
    })
    
    const response1 = await app.inject({
      method: 'PUT',
      url: '/profile/name',
      headers: {
        Authorization: 'double',
      },
      body: {
        name: 'New name'
      }
      
    })
    
    expect(response1.statusCode).toBe(200)
    expect(response1.statusMessage).toBe('OK')
    expect(response1.body).toBe('{\"id\":\"double\",\"name\":\"New name\",\"description\":null,\"image\":null,\"reputation\":1}')

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
    })
    
    const response1 = await app.inject({
      method: 'PUT',
      url: '/profile/name',
      headers: {
        Authorization: '',
      },
      body: {
        name: 'New name'
      }
      
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
    })

    const response1 = await app.inject({
      method: 'PUT',
      url: '/profile/name',
      headers: {
        Authorization: 'double',
      },
      body: {
        name: 'New name'
      }
      
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
        description: 'Dont read this.'
      }
      
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
        description: 'New name'
      }
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
describe('/profile/image - PUT', () => {
  it('Successfully updates user profile image - return 200', async () => {
    const app = await build({})
    
    const response1 = await app.inject({
      method: 'PUT',
      url: '/profile/image',
      headers: {
        Authorization: 'double',
      },
      body: {
        image: 'Dont this.'
      }
      
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
        description: 'New name'
      }
    })
    
    expect(response1.statusCode).toBe(401)
    expect(response1.statusMessage).toBe('Unauthorized')
    await app.close()
  })
})