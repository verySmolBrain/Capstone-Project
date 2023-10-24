import { FastifyInstance, FastifyRequest } from 'fastify'
import { extractId, requestHandler } from '@Source/utils/supabaseUtils'
import { v2 as cloudinary } from 'cloudinary'

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
      throw new Error('Upload failed')
    }

    const changedImage = await prisma.profile.updateMany({
      data: {
        image: upload_res.url,
      },
    })

    return changedImage
  })
}
