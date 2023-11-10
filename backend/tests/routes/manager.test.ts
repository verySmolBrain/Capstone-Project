import { build } from '@Source/app'
import { Role } from '@prisma/client'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'

/*
* GET /manager
* Returns all campaign managers
*/

describe('/manager', () => {
  it('Successfully GEts manager - return 200', async () => {

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/manager',
      headers: {
        Authorization: 'Bearer your-token-here',
      },

    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })
})


/*
  * POST /manager
  * Creates a campaign manager user
*/

describe('/manager', () => {
  it('Successfully creates a manager - return 200', async () => {

    prismaMockInstance.user.create.mockResolvedValueOnce({
      id: 'Sticky man',
      role: Role.MANAGER,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/manager',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      body: {
        id: 'okidogi'
      }

    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })
})


/*
  * DELETE /manager/:name
  * Deletes a campaign manager by id
  * @param {string} id
  * @returns nothing on success
*/

describe('/manager/:id', () => {
  it('Successfully deletes a manager - return 200', async () => {

    prismaMockInstance.user.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'Sticky man',
      role: Role.MANAGER,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/manager/:id',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        id: 'okidogi'
      }

    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })
  it('Successfully deletes a manager - return 200', async () => {

    prismaMockInstance.user.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'Sticky man',
      role: Role.USER,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/manager/:id',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        id: 'okidogi'
      }

    })

    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
    await app.close()
  })
})