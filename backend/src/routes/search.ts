import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler } from '@Source/utils/supabaseUtils'

export default async function (fastify: FastifyInstance) {
  /**
   * GET /search/:name
   * Returns all users, collectibles, collections, campaigns matching the name or exact tag
   * @param {string} name
   * @returns {object} collectibles
   */
  fastify.get('/search/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const search_text = req.params.name

    if (!search_text) {
      return {
        collectables: await prisma.collectable.findMany(),
        collections: await prisma.collection.findMany(),
        campaigns: await prisma.campaign.findMany(),
        users: await prisma.profile.findMany(),
      }
    }

    const collectables = await prisma.collectable.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search_text,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              has: search_text,
            },
          },
        ],
      },
    })

    const collections = await prisma.collection.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search_text,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              has: search_text,
            },
          },
        ],
      },
    })

    const campaigns = await prisma.campaign.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search_text,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              has: search_text,
            },
          },
        ],
      },
    })

    const users = await prisma.profile.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search_text,
              mode: 'insensitive',
            },
          },
        ],
      },
    })

    return {
      collectables,
      collections,
      campaigns,
      users,
    }
  })

  /**
   * GET /search/collectadoes ble/:name
   * Returns all collectibles matching the name
   * @param {string} name
   * @returns {object} collectibles
   */
  fastify.get('/search/collectable/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const collectible_name = req.params.name

    if (!collectible_name) {
      return await prisma.collectable.findMany()
    }

    const collectibles = await prisma.collectable.findMany({
      where: {
        OR: [
          {
            name: {
              contains: collectible_name,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              has: collectible_name,
            },
          },
        ],
      },
    })

    return collectibles
  })

  /**
   * GET /search/collection/:name
   * Returns all collections matching the name
   * @returns {object} collections
   */
  fastify.get('/search/collection/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const collection_name = req.params.name

    if (!collection_name) {
      return await prisma.collection.findMany()
    }

    const collections = await prisma.collection.findMany({
      where: {
        OR: [
          {
            name: {
              contains: collection_name,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              has: collection_name,
            },
          },
        ],
      },
    })

    return collections
  })

  /**
   * GET /search/user/:name
   * Returns all users matching the name
   * @returns {object} users
   */
  fastify.get('/search/user/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const username = req.params.name

    if (!username) {
      return await prisma.profile.findMany()
    }

    const users = await prisma.profile.findMany({
      where: {
        OR: [
          {
            name: {
              contains: username,
              mode: 'insensitive',
            },
          },
        ],
      },
    })

    return users
  })

  /**
   * GET /search/campaign/:name
   * Returns all campaigns matching the name
   * @returns {object} users
   */
  fastify.get('/search/campaign/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const campaign_name = req.params.name

    if (!campaign_name) {
      return await prisma.campaign.findMany()
    }

    const campaigns = await prisma.campaign.findMany({
      where: {
        OR: [
          {
            name: {
              contains: campaign_name,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              has: campaign_name,
            },
          },
        ],
      },
    })

    return campaigns
  })

  /**
   * GET /search/collectable/tag/:tag
   * Returns all collectables with the matching tag
   * @param {string} tag
   * @returns {object} collectibles
   */
  fastify.get('/search/collectable/tag/:tag', async (req: FastifyRequest<{ Params: { tag: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const tag = req.params.tag

    const collectibles = await prisma.collectable.findMany({
      where: {
        tags: { has: tag },
      },
    })

    return collectibles
  })

  /**
   * GET /search/collection/tag/:tag
   * Returns all collections with the matching tag
   * @param {string} tag
   * @returns {object} collections
   */
  fastify.get('/search/collection/tag/:tag', async (req: FastifyRequest<{ Params: { tag: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const tag = req.params.tag

    const collections = await prisma.collection.findMany({
      where: {
        tags: { has: tag },
      },
    })

    return collections
  })

  /**
   * GET /search/campaign/tag/:tag
   * Returns all campaigns with the matching tag
   * @param {string} tag
   * @returns {object} campgians
   */
  fastify.get('/search/campaign/tag/:tag', async (req: FastifyRequest<{ Params: { tag: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const tag = req.params.tag

    const campaigns = await prisma.campaign.findMany({
      where: {
        tags: { has: tag },
      },
    })

    return campaigns
  })

  /**
   * GET /search/users/wares/:collectableName
   * Returns all user profiles who have the given collectable in their wares
   * @param {string} collectableName
   * @returns {object} profiles
   */
  fastify.get(
    '/search/users/wares/:collectableName',
    async (req: FastifyRequest<{ Params: { collectableName: string } }>) => {
      const token = req.headers['authorization'] as string
      const prisma = await requestHandler(token)
      const collectableName = req.params.collectableName

      const profiles = await prisma.profile.findMany({
        where: {
          wares: {
            some: {
              collectable: {
                name: collectableName,
              },
            },
          },
        },
      })

      return profiles
    }
  )
}
