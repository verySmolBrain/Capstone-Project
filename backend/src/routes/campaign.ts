import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler, extractId } from '@Source/utils/supabaseUtils'
import { collectionConnect } from '@Source/utils/types'
import { promises } from 'dns'

export default async function (fastify: FastifyInstance) {
  /*
   * POST /campaign
   * Creates a campaign
   * @param {string} name
   * @param {string} image
   * @param {Date} startDate
   * @param {Date} endDate
   * @param {collection[]} collections
   * @returns {object} campaign
   */
  fastify.post(
    '/campaign',
    async (
      req: FastifyRequest<{
        Body: {
          name: string
          image: string
          startDate: Date
          endDate: Date
          collection: collectionConnect[]
          tags: string[]
          isActive: boolean
        }
      }>
    ) => {
      const token = req.headers['authorization'] as string
      const { name, image, startDate, endDate, collection, tags, isActive } = req.body
      const prisma = await requestHandler(token)

      const campaign = await prisma.campaign.create({
        data: {
          name: name,
          image: image,
          start: startDate,
          end: endDate,
          collections: {
            connect: collection,
          },
          tags: tags,
          managers: { connect: { id: extractId(token) } },
          isActive: isActive,
          views: 0,
        },
      })
      return campaign
    }
  )

  /*
   * GET /campaign
   * Returns all campaigns
   * @returns {object} campaigns
   */
  fastify.get('/campaign', async (req) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const campaigns = await prisma.campaign.findMany()
    return campaigns
  })

  /*
   * GET /campaign/:name
   * Returns a campaign by name
   * @returns {object} campaign
   */
  fastify.get('/campaign/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params
    const prisma = await requestHandler(token)

    const campaign = await prisma.campaign.findFirstOrThrow({
      where: { name: name },
      include: {
        collections: {
          include: { collectables: true },
        },
      },
    })

    return campaign
  })

  /*
   * PUT /campaign/:name
   * Updates a campaign by name
   * @param {string} name
   * @param {string} image
   * @param {Date} startDate
   * @param {Date} endDate
   * @param {collection[]} collections
   * @returns {object} campaign
   */
  fastify.put(
    '/campaign/:name',
    async (
      req: FastifyRequest<{
        Params: { name: string }
        Body: {
          image: string
          startDate: Date
          endDate: Date
          collections: collectionConnect[]
          isActive: boolean | undefined
        }
      }>
    ) => {
      const token = req.headers['authorization'] as string
      const { name } = req.params
      const { image, startDate, endDate, isActive } = req.body
      const prisma = await requestHandler(token)

      const campaign = await prisma.campaign.update({
        where: {
          name: name,
        },
        data: {
          image: image,
          start: startDate,
          end: endDate,
          isActive: isActive ?? true,
          collections: {
            connect: req.body.collections,
          },
        },
      })
      return campaign
    }
  )

  /*
   * PUT /campaign/:name/view
   * Increments campaign view count by 1
   * @returns void
   */
  fastify.put(
    '/campaign/:name/view',
    async (req: FastifyRequest<{ Params: { name: string }; Body: { timestamp: number } }>) => {
      const token = req.headers['authorization'] as string
      const prisma = await requestHandler(token)
      const { name } = req.params
      const { timestamp } = req.body

      // Increment campaign view count by one
      await prisma.campaign.update({
        where: { name: name },
        data: { views: { increment: 1 } },
      })
      // Updates viewData with timestamp
      await prisma.campaign.update({
        where: { name: name },
        data: {
          viewData: { push: timestamp },
        },
      })
    }
  )

  /*
   * PUT /collection/:collectionName/:collectableName
   * Adds a collection to a campaign by name
   * @param {string} name
   * @param {string} image
   * @returns {object} campaign
   */
  fastify.put(
    '/campaign/:campaignName/:collectionName',
    async (req: FastifyRequest<{ Params: { campaignName: string; collectionName: string } }>) => {
      const token = req.headers['authorization'] as string
      const { campaignName, collectionName } = req.params

      const prisma = await requestHandler(token)

      const campaign = await prisma.campaign.update({
        where: {
          name: campaignName,
        },
        data: {
          collections: {
            connect: { name: collectionName },
          },
        },
      })

      return campaign
    }
  )

  /*
   * DELETE /campaign/:name
   * Deletes a campaign by name
   * @param {string} name
   * @returns {boolean} success
   */
  fastify.delete('/campaign/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)
    const campaign = await prisma.campaign.delete({
      where: {
        name: name,
      },
    })
    return campaign
  })

  /*
   * DELETE /collection/:collectionName/:collectableName
   * Removes a collection from a campaign
   * @param {string} collection
   * @param {string} collectable
   * @returns {object} collection
   */
  fastify.delete(
    '/campaign/:campaignName/:collectionName',
    async (req: FastifyRequest<{ Params: { campaignName: string; collectionName: string } }>) => {
      const token = req.headers['authorization'] as string
      const { campaignName, collectionName } = req.params

      const prisma = await requestHandler(token)
      const campaign = await prisma.campaign.update({
        where: {
          name: campaignName,
        },
        data: {
          collections: {
            disconnect: { name: collectionName },
          },
        },
      })

      return campaign
    }
  )

  /*
   *  GET /campaign/reviews/:name
   *  Gets the campaigns reviews
   *  @param {float} review
   *  @returns a list of {campaign: Campaign, review: float, description: string}
   */

  fastify.get('/reviews/campaign/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params
    const prisma = await requestHandler(token)

    const reviews = await prisma.campaignReview.findMany({
      where: {
        campaign: {
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
   * POST /campaign/reviews/:name
   * Creates a review for a campaign
   * @param {float} review
   * @param {string} description
   * @returns the review
   */

  fastify.put(
    '/reviews/campaign/:name',
    async (req: FastifyRequest<{ Params: { name: string }; Body: { review: number; description: string } }>) => {
      const token = req.headers['authorization'] as string
      const { name } = req.params
      const { review, description } = req.body
      const prisma = await requestHandler(token)

      const findCampaignReview = await prisma.campaignReview.findFirst({
        where: {
          campaign: {
            name: name,
          },
          reviewerId: extractId(token),
        },
      })

      if (findCampaignReview) {
        const updatedCampaignReview = await prisma.campaignReview.update({
          where: {
            id: findCampaignReview.id,
          },
          data: {
            rating: review,
            comment: description,
          },
        })

        return updatedCampaignReview
      }

      const campaignReview = await prisma.campaignReview.create({
        data: {
          rating: review,
          comment: description,
          reviewer: {
            connect: {
              id: extractId(token),
            },
          },
          campaign: {
            connect: {
              name: name,
            },
          },
        },
      })

      return campaignReview
    }
  )
  /*
   * GET /campaign/metrics/post/:name
   * Returns a campaign's post metrics by name
   * @returns {object} {string, int}
  */
  fastify.get('/campaign/metrics/post/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params
    const prisma = await requestHandler(token)

    const campaign = await prisma.campaign.findFirstOrThrow({
      where: { name: name },
      include: { posts: true },
    })
    const occurrencesMap: {date: string, Posts: number}[] = [];

    // Populating hash map {date(rounded by day): date, occurence: int}
    campaign.posts.forEach((post) => {
      const date = new Date(post.createdAt)
      date.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero - to round

      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear().toString().slice(-2);
      const formattedDate = `${day}/${month}/${year}`;

      const existingMetricIndex = occurrencesMap.findIndex((metric) => metric.date === formattedDate);

      // If the time exists, update its price
      if (existingMetricIndex !== -1) {
        occurrencesMap.at(existingMetricIndex)!.Posts += 1;
      } else {
        // If the time does not exist, add a new entry to the array
        occurrencesMap.push({date: formattedDate, Posts: 1});
      }
    })
    return occurrencesMap
  })

  /*
   * GET /campaign/metrics/posters/:name
   * Returns a campaign's post metrics by name
   * @returns {object} {string, int}
  */
  fastify.get('/campaign/metrics/posters/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params
    const prisma = await requestHandler(token)

    const campaign = await prisma.campaign.findFirstOrThrow({
      where: { name: name },
      include: { posts: true },
    })
    const occurrencesMap: {Poster: string, Posts: number}[] = [];

    for (const post of campaign.posts) {
      const authorName = await prisma.profile.findFirstOrThrow({
        where: {id: post.authorId}
      })
      const existingMetricIndex = occurrencesMap.findIndex((metric) => metric.Poster === authorName?.name);

      // If the time exists, update its price
      if (existingMetricIndex !== -1) {
        occurrencesMap.at(existingMetricIndex)!.Posts += 1;
      } else {
        // If the poster does not exist, add a new entry to the array
        occurrencesMap.push({Poster: authorName!.name, Posts: 1});
      }
    }
    return occurrencesMap;
  })

  /*
   * GET /campaign/metrics/review/:name
   * Returns a campaign's average reviews
   * @returns number
  */
  fastify.get('/campaign/metrics/reviews/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params
    const prisma = await requestHandler(token)

    const campaign = await prisma.campaign.findFirstOrThrow({
      where: { name: name },
      include: { reviews : true },
    })
    const totalRatings = campaign.reviews.reduce((sum, review) => sum + review.rating, 0);

    const numberOfReviews = campaign.reviews.length;

    if (numberOfReviews === 0) {
      return 0; // Avoid division by zero
    }
    const averageRating = totalRatings / numberOfReviews;
    return averageRating;
  })
}
