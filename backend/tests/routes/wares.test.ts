import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'

/*
 *  GET /wares
 *  Returns the user's wares
 *  @returns {object} wares
 */
describe('/wares - GET', () => {
  it('Successful wishlist retrieval - return 200', async () => {
    // @ts-expect-error wares
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,

      wares: [
        {
          collectable: {
            collection: [
              {
                name: 'Collection A',
                image: 'collectionA.jpg',
              },
              {
                name: 'Collection B',
                image: null,
              },
            ],
            image: 'collectableImage.jpg',
            tags: ['tag1', 'tag2'],
          },
          count: 3,
          id: 1,
          name: 'Item A',
        },
        {
          collectable: {
            collection: [
              {
                name: 'Collection C',
                image: 'collectionC.jpg',
              },
            ],
            image: 'collectableImage.jpg',
            tags: ['tag3'],
          },
          count: 1,
          id: 2,
          name: 'Item B',
        },
      ],
    })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/wares',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        name: 'haaaaaagghghghhg mimimimimi',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith('')).toBe(true)
    await app.close()
  })
})

/*
 *  GET /wares/:name
 *  Returns the given users wares
 *  @param {string} name
 *  @returns {object} wares
 */
describe('/wares/:name - GET', () => {
  it('Successful wishlist retrieval - return 200', async () => {
    // @ts-expect-error wares
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,

      wares: [
        {
          collectable: {
            collection: [
              {
                name: 'Collection A',
                image: 'collectionA.jpg',
              },
              {
                name: 'Collection B',
                image: null,
              },
            ],
            image: 'collectableImage.jpg',
            tags: ['tag1', 'tag2'],
          },
          count: 3,
          id: 1,
          name: 'Item A',
        },
        {
          collectable: {
            collection: [
              {
                name: 'Collection C',
                image: 'collectionC.jpg',
              },
            ],
            image: 'collectableImage.jpg',
            tags: ['tag3'],
          },
          count: 1,
          id: 2,
          name: 'Item B',
        },
      ],
    })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/wares/:name',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        name: 'haaaaaagghghghhg mimimimimi',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(
      response.body.startsWith('[{"collectable":{"collection":[{"name":"Collection A","image":"collectionA.jpg"},')
    ).toBe(true)
    await app.close()
  })
})

/*
 *  PUT /wares
 *  Update the user's wares
 *  @param {collectableCount[]} collectables
 *  @returns {object} wares
 */
describe('/wares - PUT', () => {
  it('Successful wares update - return 200', async () => {
    const inventory = [
      {
        collectable: {
          collection: [
            {
              name: 'Collection A',
              image: 'collectionA.jpg',
            },
            {
              name: 'Collection B',
              image: null,
            },
          ],
          image: 'collectableImage.jpg',
          tags: ['tag1', 'tag2'],
        },
        count: 3,
        id: 1,
        name: 'Item A',
      },
      {
        collectable: {
          collection: [
            {
              name: 'Collection C',
              image: 'collectionC.jpg',
            },
          ],
          image: 'collectableImage.jpg',
          tags: ['tag3'],
        },
        count: 1,
        id: 2,
        name: 'Item B',
      },
    ]

    // @ts-expect-error wares
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
      inventory: inventory,
    })

    // @ts-expect-error wares
    prismaMockInstance.profile.update.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,

      wares: [
        {
          collectable: {
            collection: [
              {
                name: 'Collection A',
                image: 'collectionA.jpg',
              },
              {
                name: 'Collection B',
                image: null,
              },
            ],
            image: 'collectableImage.jpg',
            tags: ['tag1', 'tag2'],
          },
          count: 3,
          id: 1,
          name: 'Item A',
        },
        {
          collectable: {
            collection: [
              {
                name: 'Collection C',
                image: 'collectionC.jpg',
              },
            ],
            image: 'collectableImage.jpg',
            tags: ['tag3'],
          },
          count: 1,
          id: 2,
          name: 'Item B',
        },
      ],
    })

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/wares',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        collectables: [],
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith('')).toBe(true)
    await app.close()
  })
  it('Update wares (Collectable not found in inventory)- return 400', async () => {
    const inventory = [
      {
        collectable: {
          collection: [
            {
              name: 'Collection A',
              image: 'collectionA.jpg',
            },
            {
              name: 'Collection B',
              image: null,
            },
          ],
          image: 'collectableImage.jpg',
          tags: ['tag1', 'tag2'],
        },
        count: 3,
        id: 1,
        name: 'Item A',
      },
      {
        collectable: {
          collection: [
            {
              name: 'Collection C',
              image: 'collectionC.jpg',
            },
          ],
          image: 'collectableImage.jpg',
          tags: ['tag3'],
        },
        count: 1,
        id: 2,
        name: 'Item B',
      },
    ]
    // @ts-expect-error inventory throws as it is not required in profile but is required for testing
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
      inventory: inventory,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/wares',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        collectables: [
          { name: 'yabbanese', id: 1 },
          { name: 'yabbaneses', id: 2 },
        ],
      },
    })

    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
    await app.close()
  })

  it('Update wares (Not enough collectables in inventory) - return 400', async () => {
    const inventory = [
      {
        collectable: {
          collection: [
            {
              name: 'Collection C',
              image: 'collectionC.jpg',
            },
          ],
          image: 'collectableImage.jpg',
          tags: ['tag3'],
        },
        count: 0,
        id: 2,
        name: 'yobbin',
      },
    ]
    // @ts-expect-error inventory throws as it is not required in profile but is required for testing
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
      inventory: inventory,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/wares',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        collectables: [{ name: 'yobbin', count: 2 }],
      },
    })

    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
    await app.close()
  })
})

/*
 * PUT /wares/:collectable
 * Update the user's wares
 * @param {string} collectable
 * @param {number} count
 * @returns {object} wares
 */
describe('/wares/:collectable - PUT', () => {
  it('Successful collectable update - return 200', async () => {
    const inventory = [
      {
        collectable: {
          collection: [
            {
              name: 'stringadsf',
              image: 'collectionA.jpg',
            },
          ],
          image: 'collectableImage.jpg',
          tags: ['tag1', 'tag2'],
        },
        count: 1,
        id: 1,
        name: 'stringadsf',
      },
    ]
    // @ts-expect-error inventory throws as it is not required in profile but is required for testing
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
      inventory: inventory,
    })

    prismaMockInstance.collectableCount.findFirst.mockResolvedValueOnce({
      id: 1,
      name: 'stringadsf',
      count: 1,
      inventoryId: '',
      wishlistId: '',
      waresId: '',
    })
    prismaMockInstance.collectableCount.create.mockResolvedValueOnce({
      id: 1,
      name: 'stringadsf',
      count: 1,
      inventoryId: '',
      wishlistId: '',
      waresId: '',
    })
    prismaMockInstance.collectableCount.update.mockResolvedValueOnce({
      id: 1,
      name: 'stringadsf',
      count: 1,
      inventoryId: '',
      wishlistId: '',
      waresId: '',
    })

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/wares/:collectable',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        count: 1,
      },
      query: {
        collectable: 'a'
      }
    })

    expect(response.statusCode).toBe(400)
    await app.close()
  })

})
/*
 * DELETE /wares/:collectable
 * Update the user's wares
 * @param {string} collectable
 * @returns {object} wares
 */
describe('/wares/:collectable - DELETE', () => {
  it('Successful collectable DELETE - return 200', async () => {
    prismaMockInstance.collectableCount.findFirst.mockResolvedValueOnce({
      id: 1,
      name: 'stringadsf',
      count: 1,
      inventoryId: '',
      wishlistId: '',
      waresId: '',
    })

    prismaMockInstance.collectableCount.delete.mockResolvedValueOnce({
      id: 1,
      name: 'stringadsf',
      count: 1,
      inventoryId: '',
      wishlistId: '',
      waresId: '',
    })

    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/wares/:collectable',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        collectable: 'a',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith('')).toBe(true)
    await app.close()
  })

  it('Successful collectable DELETE (collectable not prior existing) - return 200', async () => {
    prismaMockInstance.collectableCount.findFirst.mockResolvedValueOnce(null)

    prismaMockInstance.collectableCount.create.mockResolvedValueOnce({
      id: 1,
      name: 'stringadsf',
      count: 1,
      inventoryId: '',
      wishlistId: '',
      waresId: '',
    })

    const app = await build({})
    const response = await app.inject({
      method: 'DELETE',
      url: '/wares/:collectable',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        collectable: 'a',
      },
    })

    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
    await app.close()
  })
})
