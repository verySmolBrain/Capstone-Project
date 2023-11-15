import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'

/*
 * POST /collection
 * Creates a collection
 * @param {string} name
 * @param {string} image
 * @returns {object} collection
 */
describe('/collection', () => {
  it('Successfully creates collection - return 200', async () => {
    prismaMockInstance.collection.create.mockResolvedValueOnce({
      name: 'Yabbin',
      image: 'aaaa',
      tags: [],
    })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/collection',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      body: {
        name: 'Yabbin',
        image: 'aaaa',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('{"name":"Yabbin","image":"aaaa","tags":[]}')
    await app.close()
  })
})


/*
  * GET /collection
  * Returns all collections
  * @returns {object} collections
  */
describe('/collection', () => {
  it('Successfully Gets all collections - return 200', async () => {
    prismaMockInstance.collection.findMany.mockResolvedValueOnce([{
      name: 'Yabbin',
      image: 'aaaa',
      tags: [],
    }])

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/collection',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      body: {
        name: 'Yabbin',
        image: 'aaaa',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('[{"name":"Yabbin","image":"aaaa","tags":[]}]')
    await app.close()
  })
})

/*
  * GET /collection/:name
  * Returns a collection by name
  * @returns {object} collection
  */
describe('/collection:name - GET', () => {
  it('Successfully retrives collection - return 200', async () => {
    prismaMockInstance.collection.findFirstOrThrow.mockResolvedValueOnce({
      name: "My Collection",
      image: "collection.jpg",
      tags: ["collection", "hobby"],
  })
    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/collection/:name',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        name: 'Yabbin',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe("{\"name\":\"My Collection\",\"image\":\"collection.jpg\",\"tags\":[\"collection\",\"hobby\"]}")

    await app.close()
  })
})

/**
   *  PUT
   *  Updates a collection
   *  @param {string} name
   *  @param {string} newName
   *  @param {string} image
   *  @param {string[]} tags
  */
describe('/collection:name - PUT', () => {
  it('Successfully u[dates] collection - return 200', async () => {
    prismaMockInstance.collection.update.mockResolvedValueOnce({
      name: "My Collection",
      image: "collection.jpg",
      tags: ["collection", "hobby"],
  })
    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/collection/:name',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        name: 'Yabbin',
        newName: 'Yabbin',
      },
      body: {
        image: 'Yabbin',
        tages: ['Yabbin'],
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe("{\"name\":\"My Collection\",\"image\":\"collection.jpg\",\"tags\":[\"collection\",\"hobby\"]}")

    await app.close()
  })
})

  /** 
   * PUT /collection/:collectionName/:collectableName
   * Updates a collection by name
   * @param {string} name
   * @param {string} image
   * @returns {object} collection
   */
describe('/collection/:collectionName/:collectableName - PUT', () => {
  it('Successfully creates collection - return 200', async () => {
    prismaMockInstance.collection.update.mockResolvedValueOnce({
      name: "My Collection",
      image: "collection.jpg",
      tags: ["collection", "hobby"],
  })

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/collection/:collectionName/:collectableName',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      body: {
        collectionName: 'Yabbin',
        collectableName: 'Yabbin',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe("{\"name\":\"My Collection\",\"image\":\"collection.jpg\",\"tags\":[\"collection\",\"hobby\"]}")

    await app.close()
  })
})

  /*
   * DELETE /collection/:name
   * Deletes a collection by name
   * @param {string} name
   * @returns {boolean} success
   */
describe('/collection:name', () => {
  it('Successfully deletes collection - return 200', async () => {
    prismaMockInstance.collection.update.mockResolvedValueOnce({
      name: "My Collection",
      image: "collection.jpg",
      tags: ["collection", "hobby"],
  })

    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/collection/:name',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      body: {
        name: 'Yabbin',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })
})


/*
* DELETE /collection/:collectionName/:collectableName
* Removes a collectable from a collection by name
* @param {string} collection
* @param {string} collectable
* @returns {object} collection
*/

 describe('/collection/:collectionName/:collectableName', () => {
   it('Successfully deletes collection - return 200', async () => {
     prismaMockInstance.collection.update.mockResolvedValueOnce({
       name: "My Collection",
       image: "collection.jpg",
       tags: ["collection", "hobby"],
   })
 
     const app = await build({})
     const response = await app.inject({
       method: 'DELETE',
       url: '/collection/:collectionName/:collectableName',
       headers: {
         Authorization: 'Bearer your-token-here',
       },
       query: {
        collectableName: "nerf",
        collectionName: "ogerpon"
       },
     })
 
     expect(response.statusCode).toBe(200)
     expect(response.statusMessage).toBe('OK')
     await app.close()
   })
 })