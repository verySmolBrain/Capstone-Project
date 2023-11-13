import { FastifyInstance, FastifyRequest } from 'fastify'
import { extractId, requestHandler } from '@Source/utils/supabaseUtils'
import { v2 as cloudinary } from 'cloudinary'
import { uploadError } from '@Source/utils/error'

cloudinary.config({
  secure: true,
})

export default async function (fastify: FastifyInstance) {
  /*
   * POST /image/profile/upload
   * Uploads a profile picture
   * @param {Base64} image
   * @returns {string} url
   */
  fastify.post('/image/profile/upload', async (req: FastifyRequest<{ Body: { image: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
    })
    const username = profile.name

    const upload_res = await cloudinary.uploader.upload(req.body.image, {
      resource_type: 'image',
      public_id: `profile/${username}`,
      overwrite: true,
      invalidate: true,
    })

    if (!upload_res?.secure_url) {
      throw new uploadError()
    }

    const changedImage = await prisma.profile.update({
      where: {
        id: extractId(token),
      },
      data: {
        image: upload_res.url,
      },
    })

    return changedImage
  })

  /*
   * POST /image/collectable/upload
   * Uploads a collectable image
   * @param {string} name
   * @param {Base64} image
   * @returns {string} url
   */
  fastify.post('/image/collectable/upload', async (req: FastifyRequest<{ Body: { name: string; image: string } }>) => {
    const upload_res = await cloudinary.uploader.upload(req.body.image, {
      resource_type: 'image',
      public_id: `collectable/${req.body.name}`,
      overwrite: true,
      invalidate: true,
    })

    if (!upload_res?.secure_url) {
      throw new uploadError()
    }

    return { image: upload_res.url }
  })

  /*
   * POST /image/collection/upload
   * Uploads a collection image
   * @param {string} name
   * @param {Base64} image
   * @returns {string} url
   */
  fastify.post('/image/collection/upload', async (req: FastifyRequest<{ Body: { name: string; image: string } }>) => {
    const upload_res = await cloudinary.uploader.upload(req.body.image, {
      resource_type: 'image',
      public_id: `collection/${req.body.name}`,
      overwrite: true,
      invalidate: true,
    })

    if (!upload_res?.secure_url) {
      throw new uploadError()
    }

    return { image: upload_res.url }
  })

  /*
   * POST /image/campaign/upload
   * Uploads a campaign image
   * @param {string} name
   * @param {Base64} image
   * @returns {string} url
   */
  fastify.post('/image/campaign/upload', async (req: FastifyRequest<{ Body: { name: string; image: string } }>) => {
    const upload_res = await cloudinary.uploader.upload(req.body.image, {
      resource_type: 'image',
      public_id: `campaign/${req.body.name}`,
      overwrite: true,
      invalidate: true,
    })

    if (!upload_res?.secure_url) {
      throw new uploadError()
    }

    return { image: upload_res.url }
  })
}
