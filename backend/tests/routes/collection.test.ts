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
