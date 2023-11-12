import { FastifyInstance, FastifyRequest } from 'fastify'
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

  /*
   *  POST /forum/report/:commentId
   *  Reports a comment on a post
   *  @returns {object} report
   */
  fastify.post(
    '/forum/report/:commentId',
    async (
      req: FastifyRequest<{
        Params: { commentId: string }
        Body: { userId: string }
      }>
    ) => {
      const token = req.headers['authorization'] as string
      const { commentId } = req.params
      const { userId } = req.body
      console.log(userId)
      const prisma = await requestHandler(token)

      const currReport = await prisma.commentReports.findFirst({
        where: { commentId: Number(commentId) },
      })

      if (currReport) {
        if (!currReport?.reportingUsers.includes(userId)) {
          await prisma.commentReports.update({
            where: {
              commentId: Number(commentId),
            },
            data: {
              reportingUsers: { push: userId },
            },
          })
        }
      } else {
        await prisma.commentReports.create({
          data: {
            comment: {
              connect: {
                id: Number(req.params.commentId),
              },
            },
            reportingUsers: [userId],
          },
        })
      }
    }
  )

  /*
   *  GET /forum/reports/:commentId
   *  Gets the number of reports on a comment
   *  @returns {object} report
   */
  fastify.get(
    '/forum/reports/:commentId',
    async (
      req: FastifyRequest<{
        Params: { commentId: string }
      }>
    ) => {
      const token = req.headers['authorization'] as string

      const prisma = await requestHandler(token)

      // Retrieve the comment and its associated reports count
      const commentWithReports = await prisma.comment.findUnique({
        where: { id: Number(req.params.commentId) },
        include: {
          reports: {},
        },
      })
      if (commentWithReports != null) {
        const reportsCount = commentWithReports.reports.length
        return reportsCount
      } else {
        const reportsCount = 0
        return reportsCount
      }
    }
  )

  /*
   *  GET /comment/reports
   *  Gets a list of reported comments
   *  @returns {object}[] report array
   */
  fastify.get('/comment/reports', async (req) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)

    // Retrieve the comment and its associated reports count
    const commentReports = await prisma.commentReports.findMany()

    commentReports.sort((a, b) => b.reportingUsers.length - a.reportingUsers.length)

    const reportedComments = []
    for (const commentReport of commentReports) {
      const offendingComment = await prisma.comment.findFirst({
        where: { id: Number(commentReport.commentId) },
      })

      const offendingCommenter = await prisma.profile.findFirst({
        where: { id: offendingComment?.authorId },
      })

      if (offendingComment) {
        reportedComments.push({
          content: offendingComment.content,
          author: offendingCommenter?.name,
          reports: commentReport.reportingUsers.length,
        })
      }
    }

    return reportedComments
  })
}
