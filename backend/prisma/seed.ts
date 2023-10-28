import { PrismaClient } from '@prisma/client'

// ALL PASSWORDS ARE 'password'

// admin : admin@test : 238001c3-8fd5-486e-810b-688889dddcf3
// manager : manager@test : 845da7a9-84a1-40c6-9e38-c4eb2745d92b

// user A : a@test : 2f445e85-8dee-4ccf-a987-c47e503cdde4
// user B : b@test : b8fd89cb-e9f5-48db-8372-13f3df1a2ccd
// user C : c@test : 68fd7471-4ce2-463b-ac61-90835940ae39
// user D : d@test : 59b43561-7e65-418c-8531-972bbf1fd2a4

// admin and manager do not have profiles
// the manager has both campaigns

// user A has all 5 pieces of Exodia
// user B has Blue-Eyes White Dragon and Bellsprout
// user C has 1 piece of Exodia
// user D has nothing

// no user has duplicates of any collectable

// stuff should have tags ctrl+f 'tags' to find them

// collections: 'Exodia' and 'BellSprout'

// campaigns: 'The Forbidden Power of Exodia' and 'Just BellSprout'
// 'The Forbidden Power of Exodia' has the 'featured' tag
// 'Just BellSprout' has the 'popular' tag

// there is 1 achievement: 'Exodia, Obliterate!'

const prisma = new PrismaClient()

async function main() {
  const collectables = await prisma.collectable.createMany({
    data: [
      {
        name: 'Exodia The Forbidden One',
        tags: ['Exodia', 'Forbidden One', 'Yu-Gi-Oh!'],
      },
      {
        name: 'Left Arm of the Forbidden One',
        tags: ['Exodia', 'Forbidden One', 'Yu-Gi-Oh!'],
      },
      {
        name: 'Left Leg of the Forbidden One',
        tags: ['Exodia', 'Forbidden One', 'Yu-Gi-Oh!'],
      },
      {
        name: 'Right Arm of the Forbidden One',
        tags: ['Exodia', 'Forbidden One', 'Yu-Gi-Oh!'],
      },
      {
        name: 'Right Leg of the Forbidden One',
        tags: ['Exodia', 'Forbidden One', 'Yu-Gi-Oh!'],
      },
      {
        name: 'Blue-Eyes White Dragon',
        tags: ['Blue-Eyes', 'Yu-Gi-Oh!'],
      },
      {
        name: 'Bellsprout',
        tags: ['grass', 'poison', 'Pokemon'],
      },
    ],
  })

  const collections = [
    await prisma.collection.create({
      data: {
        name: 'Exodia',
        collectables: {
          connect: [
            {
              name: 'Exodia The Forbidden One',
            },
            {
              name: 'Left Arm of the Forbidden One',
            },
            {
              name: 'Left Leg of the Forbidden One',
            },
            {
              name: 'Right Arm of the Forbidden One',
            },
            {
              name: 'Right Leg of the Forbidden One',
            },
          ],
        },
        tags: ['Exodia', 'Forbidden One', 'Yu-Gi-Oh!'],
      },
    }),
    await prisma.collection.create({
      data: {
        name: 'Bellsprout',
        collectables: {
          connect: [
            {
              name: 'Bellsprout',
            },
          ],
        },
        tags: ['grass', 'poison', 'Pokemon'],
      },
    }),
  ]

  const achievements = await prisma.achievement.createMany({
    data: [
      {
        name: 'Exodia, Obliterate!',
        description: 'Assembled all 5 pieces of Exodia',
      },
    ],
  })

  const admin = await prisma.user.create({
    data: {
      id: '238001c3-8fd5-486e-810b-688889dddcf3',
      role: 'ADMIN',
    },
  })

  const manager = await prisma.user.create({
    data: {
      id: '845da7a9-84a1-40c6-9e38-c4eb2745d92b',
      role: 'MANAGER',
    },
  })

  const a = await prisma.user.create({
    data: {
      id: '2f445e85-8dee-4ccf-a987-c47e503cdde4',
      profile: {
        create: {
          name: 'a',
          description: 'default description for a',
          image: 'default image for a',

          inventory: {
            create: [
              {
                name: 'Exodia The Forbidden One',
                count: 1,
              },
              {
                name: 'Left Arm of the Forbidden One',
                count: 1,
              },
              {
                name: 'Left Leg of the Forbidden One',
                count: 1,
              },
              {
                name: 'Right Arm of the Forbidden One',
                count: 1,
              },
              {
                name: 'Right Leg of the Forbidden One',
                count: 1,
              },
            ],
          },
        },
      },
    },
  })

  const b = await prisma.user.create({
    data: {
      id: 'b8fd89cb-e9f5-48db-8372-13f3df1a2ccd',
      profile: {
        create: {
          name: 'b',
          description: 'default description for b',
          image: 'default image for b',

          inventory: {
            create: [
              {
                name: 'Blue-Eyes White Dragon',
                count: 1,
              },
              {
                name: 'Bellsprout',
                count: 1,
              },
            ],
          },
        },
      },
    },
  })

  const c = await prisma.user.create({
    data: {
      id: '68fd7471-4ce2-463b-ac61-90835940ae39',
      profile: {
        create: {
          name: 'c',
          description: 'default description for c',
          image: 'default image for c',
          inventory: {
            create: [
              {
                name: 'Exodia The Forbidden One',
                count: 1,
              },
            ],
          },
        },
      },
    },
  })

  const d = await prisma.user.create({
    data: {
      id: '59b43561-7e65-418c-8531-972bbf1fd2a4',
      profile: {
        create: {
          name: 'd',
          description: 'default description for d',
          image: 'default image for d',
          inventory: {},
        },
      },
    },
  })

  const campaigns = [
    await prisma.campaign.create({
      data: {
        name: 'The Forbidden Power of Exodia',
        end: new Date(Date.now() + 12096e5), // now + 2 weeks
        tags: ['Exodia', 'Forbidden One', 'Yu-Gi-Oh!', 'featured'],
        collections: { connect: { name: 'Exodia' } },
        managers: { connect: { id: manager.id } },
      },
    }),
    await prisma.campaign.create({
      data: {
        name: 'Just BellSprout',
        end: new Date(Date.now() + 12096e5), // now + 2 weeks
        tags: ['grass', 'poison', 'Pokemon', 'popular'],
        collections: { connect: { name: 'Bellsprout' } },
        managers: { connect: { id: manager.id } },
      },
    }),
  ]

  console.log(admin, manager, a, b, c, d, collectables, collections, achievements, campaigns)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
