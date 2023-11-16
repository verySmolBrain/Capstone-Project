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
      image: 'ah',
      reputation: 1,
      banned: false,
    })

    const uploadMock = jest.fn()
    cloudinary.uploader.upload = uploadMock
    uploadMock.mockResolvedValue({ secure_url: 'its moorbin time' })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/profile/upload',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        image: 'ah',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })

  it('Unsuccessful profile upload - return 400', async () => {
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'Yap',
      description: null,
      image: 'ah',
      reputation: 1,
      banned: false,
    })

    const uploadMock = jest.fn()
    cloudinary.uploader.upload = uploadMock
    uploadMock.mockResolvedValue({})

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/profile/upload',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        image: 'ah',
      },
    })

    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
    await app.close()
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
    await app.close()
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
    const uploadMock = jest.fn()
    cloudinary.uploader.upload = uploadMock
    uploadMock.mockResolvedValue({ secure_url: 'its moorbin time' })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/collectable/upload',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        name: 'Okiedogi',
        image: 'ah',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })

  it('Unsuccessful profile upload - return 400', async () => {
    const uploadMock = jest.fn()
    cloudinary.uploader.upload = uploadMock
    uploadMock.mockResolvedValue({})

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/collectable/upload',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        name: 'Okiedogi',
        image: 'ah',
      },
    })

    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
    await app.close()
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
        name: 'Okiedogi',
        image: 'ah',
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
    await app.close()
  })
})

/*
 * POST /image/collection/upload
 * Uploads a collection image
 * @param {string} name
 * @param {Base64} image
 * @returns {string} url
 */

describe('/image/collection/upload - post', () => {
  it('Successful collection image upload - return 200', async () => {
    const uploadMock = jest.fn()
    cloudinary.uploader.upload = uploadMock
    uploadMock.mockResolvedValue({ secure_url: 'its moorbin time', url: 'okiedogi' })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/collection/upload',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        name: 'Okiedogi',
        image: 'ah',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('{"image":"okiedogi"}')
    await app.close()
  })

  it('Unsuccessful collection image upload - return 400', async () => {
    const uploadMock = jest.fn()
    cloudinary.uploader.upload = uploadMock
    uploadMock.mockResolvedValue({})

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/collection/upload',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        name: 'Okiedogi',
        image: 'ah',
      },
    })

    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
    await app.close()
  })
})

/*
 * POST /image/campaign/upload
 * Uploads a campaign image
 * @param {string} name
 * @param {Base64} image
 * @returns {string} url
 */
describe('/image/campaign/upload - post', () => {
  it('Successful campaign image upload - return 200', async () => {
    const uploadMock = jest.fn()
    cloudinary.uploader.upload = uploadMock
    uploadMock.mockResolvedValue({ secure_url: 'its moorbin time', url: 'okiedogi' })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/campaign/upload',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        name: 'Okiedogi',
        image: 'ah',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe('{"image":"okiedogi"}')
    await app.close()
  })

  it('Unsuccessful campaign image upload - return 400', async () => {
    const uploadMock = jest.fn()
    cloudinary.uploader.upload = uploadMock
    uploadMock.mockResolvedValue({})

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/image/campaign/upload',
      headers: {
        Authorization: 'yobba',
      },
      body: {
        name: 'Okiedogi',
        image: 'ah',
      },
    })

    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
    await app.close()
  })
})
