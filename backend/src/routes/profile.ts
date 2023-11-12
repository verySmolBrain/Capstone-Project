import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler, extractId } from '@Source/utils/supabaseUtils'
import { throwNotUniqueError } from '@Source/utils/error'
import { generateUsername, getUserId } from '@Source/utils/utils'
import { Role } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

export default async function (fastify: FastifyInstance) {
  /*
   *  POST /user
   *  Creates a user and profile
   *  @returns {object} user
   */
  fastify.post('/user', async (req: FastifyRequest) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)
    const username = await generateUsername(token)

    const userExists = await prisma.user.findMany({
      where: { id: extractId(token) },
    })

    if (userExists?.length > 0) {
      return userExists[0]
    }

    const user = await prisma.user.create({
      data: {
        id: extractId(token),
        profile: {
          create: {
            name: username,
            description: 'Nice to meet you!',
          },
        },
      },
    })
    return user
  })

  /*
   *  GET /role
   *  Returns the current user's role
   *  @returns {string} role
   */
  fastify.get('/role', async (req) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
    })
    return { role: user.role }
  })

  /*
   *  GET /role/:name
   *  Returns the given user's role
   *  @returns {string} role
   */
  fastify.get('/role/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)
    const id = await getUserId(name, prisma)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    })
    return { role: user.role }
  })

  /*
   *  GET /profile
   *  Returns the current user's profile
   *  @returns {object} user
   */
  fastify.get('/profile', async (req) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)
    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
      include: {
        inventory: true,
        wares: true,
        wishlist: true,
      },
    })
    return profile
  })

  /*
   *  GET /profile
   *  Returns a;; user profiles that match role
   *  @returns {object} user
   */
  fastify.get('/profile/role/:role', async (req: FastifyRequest<{ Params: { role: string } }>) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)
    const { role } = req.params

    console.log(Role[role as keyof typeof Role])

    const profiles = await prisma.profile.findMany({
      where: {
        user: {
          role: Role[role as keyof typeof Role],
        },
      },
      include: {
        inventory: true,
        wares: true,
        wishlist: true,
      },
    })

    return profiles
  })

  /*
   *  GET /profile/:name
   *  Returns the user's profile by name
   *  @param {string} name
   *  @returns {object} profile
   */
  fastify.get('/profile/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)
    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        name: name,
      },
      include: {
        inventory: true,
        wares: true,
        wishlist: true,
      },
    })
    return profile
  })

  /*
   *  PUT /profile/name
   *  Updates the user's name
   *  @param {string} name
   *  @returns {object} profile
   */
  fastify.put('/profile/name', async (req: FastifyRequest<{ Body: { name: string } }>) => {
    const token = req.headers['authorization'] as string

    const { name } = req.body
    const prisma = await requestHandler(token)

    const nameExists = await prisma.profile.findFirst({
      where: { name: name },
    })
    if (nameExists) {
      throwNotUniqueError('name')
    }

    const profile = await prisma.profile.update({
      where: {
        id: extractId(token),
      },
      data: {
        name: name,
      },
    })
    return profile
  })

  /*
   *  PUT /profile/description
   *  Updates the user's description
   *  @param {string} description
   *  @returns a batch payload
   */
  fastify.put('/profile/description', async (req: FastifyRequest<{ Body: { description: string } }>) => {
    const token = req.headers['authorization'] as string
    const { description } = req.body
    const prisma = await requestHandler(token)

    const changedDescription = await prisma.profile.updateMany({
      data: {
        description: description,
      },
    })
    return changedDescription
  })

  /*
   *  PUT /profile/image
   *  Updates the user's image url
   *  @param {string} image url
   *  @returns a batch payload
   */
  fastify.put('/profile/image', async (req: FastifyRequest<{ Body: { image: string } }>) => {
    const token = req.headers['authorization'] as string

    const { image } = req.body
    const prisma = await requestHandler(token)

    const changedImage = await prisma.profile.updateMany({
      data: {
        image: image,
      },
    })
    return changedImage
  })

  /*
   *  GET /profile/reviews/:name
   *  Gets the user's reviews
   *  @param {float} review
   *  @returns a list of {profile: Profile, review: float, description: string}
   */

  fastify.get('/reviews/profile/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params
    const prisma = await requestHandler(token)

    const reviews = await prisma.userReview.findMany({
      where: {
        reviewee: {
          name: name,
        },
      },
      include: {
        reviewer: true,
      },
    })

    const extractedReviews = reviews.map((review) => {
      return {
        reviewer: review.reviewer,
        review: review.rating,
        description: review.comment,
      }
    })

    return extractedReviews
  })

  /**
   *  PUT /profile/reviews/:name
   *  Creates a new review for the user
   *  @param {float} review
   *  @param {string} description
   *  @returns a list of {review: float, description: string}
   */

  fastify.put(
    '/reviews/profile/:name',
    async (req: FastifyRequest<{ Params: { name: string }; Body: { review: number; description: string } }>) => {
      const token = req.headers['authorization'] as string

      const { name } = req.params
      const { review, description } = req.body
      const prisma = await requestHandler(token)

      const findReview = await prisma.userReview.findFirst({
        where: {
          revieweeId: extractId(token),
          reviewerId: await getUserId(name, prisma),
        },
      })

      if (findReview) {
        const updatedReview = await prisma.userReview.update({
          where: {
            id: findReview.id,
          },
          data: {
            rating: review,
            comment: description,
          },
        })

        return updatedReview
      }

      const createdReview = await prisma.userReview.create({
        data: {
          rating: review,
          comment: description,
          reviewer: {
            connect: {
              id: extractId(token),
            },
          },
          reviewee: {
            connect: {
              name: name,
            },
          },
        },
      })

      return createdReview
    }
  )

  /*
   *  DELETE /ban/:id
   *  Bans a user by removing their details
   *  @returns {object} user
   */
  fastify.delete('/ban/:id', async (req: FastifyRequest<{ Params: { id: string } }>) => {
    const supabase_url = process.env.SUPABASE_URL
    const supabase_key = process.env.SUPABASE_SERVICE_KEY
    const token = req.headers['authorization'] as string

    const { id } = req.params
    const prisma = await requestHandler(token)
    const currProfile = await prisma.profile.findFirst({ where: { id: id } })
    if (currProfile && !currProfile.banned) {
      await prisma.profile.update({
        where: { id: id },
        data: {
          name: 'BANNED-' + currProfile.name,
          description: 'This user has been banned for disruptive behaviour.',
          image: null,
          banned: true,
        },
      })
      const supabase = createClient(supabase_url!, supabase_key!)
      await supabase.auth.admin.deleteUser(id)
    }
  })
  /*
   *  GET /banned
   *  Returns the if the user is banned or not
   *  @returns {boolean} banned status
   */
  fastify.get('/banned/:id', async (req: FastifyRequest<{ Params: { id: string } }>) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)
    const user = await prisma.profile.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
    })
    return { banned: user.banned }
  })
}
