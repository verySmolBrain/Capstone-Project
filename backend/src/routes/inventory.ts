import { FastifyInstance, FastifyRequest } from 'fastify'
import { extractId, requestHandler } from '@Source/utils/supabaseUtils'
import { CollectionCollectable, collectableCountCreate, collectableCountSelect } from '@Source/utils/types'
import { throwInvalidActionError } from '@Source/utils/error'

export default async function (fastify: FastifyInstance) {
  /*
   *  GET /inventory
   *  Returns the user's inventory
   *  @returns {object} inventory
   */
  fastify.get('/inventory', async (req: FastifyRequest<{ Body: { collectableId: string } }>) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)

    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
      select: { inventory: { select: collectableCountSelect } },
    })

    const collections: CollectionCollectable = {}
    profile?.inventory?.forEach((collectableCount) => {
      collectableCount?.collectable?.collection.forEach((collection) => {
        if (!collections[collection.name]) {
          collections[collection.name] = {
            image: collection.image ?? undefined,
            collectables: [],
          }
        }
        collections[collection.name].collectables.push(collectableCount)
      })
    })

    return collections
  })

  /*
   *  GET /inventory/:name
   *  Returns the given users inventory
   *  @param {string} name
   *  @returns {object} inventory
   */
  fastify.get('/inventory/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)
    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        name: name,
      },
      select: { inventory: { select: collectableCountSelect } },
    })

    const collections: CollectionCollectable = {}
    profile.inventory.forEach((collectableCount) => {
      collectableCount.collectable.collection.forEach((collection) => {
        if (!collections[collection.name]) {
          collections[collection.name] = {
            image: collection.image ?? undefined,
            collectables: [],
          }
        }
        collections[collection.name].collectables.push(collectableCount)
      })
    })

    return collections
  })

  /*
   *  PUT /inventory
   *  Update the user's inventory
   *  @param {collectableCount[]} collectables
   *  @returns {object} inventory
   */
  fastify.put('/inventory', async (req: FastifyRequest<{ Body: { collectables: collectableCountCreate[] } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const profile = await prisma.profile.update({
      where: { id: extractId(token) },
      data: {
        inventory: {
          create: req.body.collectables,
        },
      },
      select: { inventory: { select: collectableCountSelect } },
    })
    return profile.inventory
  })

  /*
   * PUT /inventory/:collectable
   * Update the user's inventory
   * @param {string} collectable
   * @param {number} count
   * @returns {object} inventory
   */
  fastify.put(
    '/inventory/:collectable',
    async (req: FastifyRequest<{ Params: { collectable: string }; Body: { count: number } }>) => {
      const token = req.headers['authorization'] as string
      const prisma = await requestHandler(token)

      const collectableCount = await prisma.collectableCount.findFirst({
        where: {
          name: req.params.collectable,
          inventoryId: extractId(token),
        },
      })

      if (!collectableCount) {
        await prisma.collectableCount.create({
          data: {
            name: req.params.collectable,
            count: req.body.count,
            inventoryId: extractId(token),
          },
        })
      } else {
        await prisma.collectableCount.update({
          where: {
            id: collectableCount.id,
          },
          data: {
            count: req.body.count,
          },
        })
      }

      // collections associated with the collectable
      const cc = await prisma.collection.findMany({
        where: {
          collectables: {
            some: {
              name: req.params.collectable,
            },
          },
        },
      })
      for (const c of cc) {
        // check if user has completed the collection
        const target = await prisma.collection.findFirstOrThrow({
          where: { name: c.name },
          include: { collectables: true },
        })

        const profile = await prisma.profile.findFirstOrThrow({
          where: { id: extractId(token) },
          include: { inventory: true, achievements: true },
        })

        const inventoryCollection = profile.inventory.filter((c) => target.collectables.find((a) => a.name == c.name))

        if (inventoryCollection.length == target.collectables.length) {
          const p = await prisma.profile.findFirstOrThrow({
            where: { id: extractId(token) },
            include: { achievements: true },
          })
          const achievement = await prisma.achievement.findFirstOrThrow({
            where: { id: c.name },
          })
          p.achievements.push(achievement)
          await prisma.profile.update({
            where: { id: extractId(token) },
            data: {
              achievements: {
                connect: p.achievements,
              },
            },
          })
        }
      }
      return
    }
  )

  /*
   * DELETE /inventory/:collectable
   * Update the user's inventory
   * @param {string} collectable
   * @returns {object} inventory
   */
  fastify.delete('/inventory/:collectable', async (req: FastifyRequest<{ Params: { collectable: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const collectableCount = await prisma.collectableCount.findFirst({
      where: {
        name: req.params.collectable,
        inventoryId: extractId(token),
      },
    })

    if (!collectableCount) {
      throwInvalidActionError('delete collectable', 'Collectable not found in inventory')
    }

    prisma.collectableCount.delete({
      where: {
        id: collectableCount!.id,
      },
    })

    // collections associated with the collctable
    const cc = await prisma.collection.findMany({
      where: {
        collectables: {
          some: {
            name: req.params.collectable,
          },
        },
      },
    })
    for (const c of cc) {
      const profile = await prisma.profile.findFirstOrThrow({
        where: { id: extractId(token) },
        include: { inventory: true, achievements: true },
      })
      // remove achievement from profile if user had it
      const hasAchievement = profile.achievements.find((a) => a.id == c.name)
      if (hasAchievement) {
        const tmp = profile.achievements.filter((a) => a.id != c.name)
        await prisma.profile.update({
          where: { id: extractId(token) },
          data: {
            achievements: {
              set: tmp,
            },
          },
        })
      }
    }
    return
  })
}
