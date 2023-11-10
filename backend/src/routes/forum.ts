import { FastifyInstance, FastifyRequest } from 'fastify'
import 'dotenv/config'
import { requestHandler, extractId } from '@Source/utils/supabaseUtils'

export default async function (fastify: FastifyInstance) {
  /*
   *  POST /forum/:campaignName/post
   *  Creates a post in the campaign forum
   *  @returns {object} chat
   */
  fastify.post(
    '/:campaignName/forum',
    async (
      req: FastifyRequest<{
        Params: { campaignName: string }
        Body: {
          title: string
          description: string
          image?: string
          tags?: string[]
        }
      }>
    ) => {
      const token = req.headers['authorization'] as string
      const { campaignName } = req.params

      const prisma = await requestHandler(token)

      const newPost = await prisma.post.create({
        data: {
          title: req.body.title,
          campaign: {
            connect: {
              name: campaignName,
            },
          },
          description: req.body.description,
          author: {
            connect: {
              id: extractId(token),
            },
          },
          tags: req.body.tags,
          image: req.body.image,
          createdAt: new Date(),
        },
        include: {
          comments: true,
          author: true,
        },
      })

      return newPost
    }
  )

  /*
   *  GET /forum/:campaignName
   *  Returns all posts in the campaign forum
   *  @returns {object} chat
   */

  fastify.get('/:campaignName/forum', async (req: FastifyRequest<{ Params: { campaignName: string } }>) => {
    const token = req.headers['authorization'] as string
    const { campaignName } = req.params

    const prisma = await requestHandler(token)

    const posts = await prisma.post.findMany({
      where: {
        campaign: {
          name: campaignName,
        },
      },
      include: {
        comments: {
          include: { author: true },
        },
        author: true,
      },
    })

    return posts
  })

  /*
   *  GET /forum/:campaignName/post/:postName
   *  Returns a post in the campaign forum
   *  @returns {object} chat
   */
  fastify.get(
    '/forum/:postId',
    async (
      req: FastifyRequest<{
        Params: { campaignName: string; postId: string }
      }>
    ) => {
      const token = req.headers['authorization'] as string

      const prisma = await requestHandler(token)

      const post = await prisma.post.findUnique({
        where: {
          id: Number(req.params.postId),
        },
        include: {
          comments: {
            include: {
              author: true,
            },
          },
          author: true,
        },
      })

      return post
    }
  )

  /*
   *  PUT /forum/:campaignName/post/:postName
   *  Sends a message to the campaign forum
   *  @returns {object} chat
   */
  fastify.post(
    '/forum/:postId',
    async (
      req: FastifyRequest<{
        Params: { postId: string }
        Body: {
          description: string
        }
      }>
    ) => {
      const token = req.headers['authorization'] as string

      const prisma = await requestHandler(token)

      const comment = await prisma.comment.create({
        data: {
          post: {
            connect: {
              id: Number(req.params.postId),
            },
          },
          author: {
            connect: {
              id: extractId(token),
            },
          },
          content: req.body.description,
          createdAt: new Date(),
        },
        include: {
          author: true,
        },
      })

      return comment
    }
  )
}
