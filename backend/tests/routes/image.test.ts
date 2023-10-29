import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'
import { v2 as cloudinary } from 'cloudinary'

/*
   * POST /image/profile/upload
   * Uploads a profile picture
   * @param {Base64} image
   * @returns {string} url
*/

describe('/image/profile/upload - post', () => {
  it('Successful profile upload - return 200', async () => {
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
        id: 'double',
        name: 'Yap',
        description: null,
        image: "ah",
        reputation: 1,
    })

    const uploadMock = jest.fn();
    cloudinary.uploader.upload = uploadMock;
    uploadMock.mockResolvedValue({secure_url: 'its moorbin time'});

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/profile/upload',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        image: "ah",
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
  })

  it('Unsuccessful profile upload - return 400', async () => {
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
        id: 'double',
        name: 'Yap',
        description: null,
        image: "ah",
        reputation: 1,
    })

    const uploadMock = jest.fn();
    cloudinary.uploader.upload = uploadMock;
    uploadMock.mockResolvedValue({});

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/profile/upload',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        image: "ah",
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
  })

  it('Empty token error - return 401', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/profile/upload',
      headers: {
        Authorization: '',
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
  })
})

  /*
   * POST /image/collectable/upload
   * Uploads a collectable image
   * @param {string} name
   * @param {Base64} image
   * @returns {string} url
   */

describe('/image/collectable/upload - post (+name as param)', () => {
  it('Successful profile upload - return 200', async () => {
    const uploadMock = jest.fn();
    cloudinary.uploader.upload = uploadMock;
    uploadMock.mockResolvedValue({secure_url: 'its moorbin time'});

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/collectable/upload',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        name: "Okiedogi",
        image: "ah",
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
  })

  it('Unsuccessful profile upload - return 400', async () => {

    const uploadMock = jest.fn();
    cloudinary.uploader.upload = uploadMock;
    uploadMock.mockResolvedValue({});

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/collectable/upload',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        name: "Okiedogi",
        image: "ah",
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
  })

  it('Empty token error - return 401', async () => {
    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/collectable/upload',
      headers: {
        Authorization: '',
      },
      body: {
        name: "Okiedogi",
        image: "ah",
      }
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
  })
})