import { PrismaClient } from '@prisma/client'

// ALL PASSWORDS ARE 'password'

// admin : admin@test.com.au : 564620f7-f07c-49a0-b421-99e365b03b24
// manager : manager@test.com : c6f5c8d1-c7e4-4ace-a053-920f82656950

// user A : a@test.com : f3d0c820-eb35-4edc-89d1-913a6a9b87cc
// user B : b@test.com : 1bd1afa6-4b79-4888-bcaa-dfd2f4bf35f5
// user C : c@test.com : 104d0ebb-558d-47fe-8c52-f257c6a238a8
// user D : d@test.com : 618b9ac1-92e8-48d1-9552-b290553828a9

// admin and manager do not have profiles
// the manager has both campaigns

// user A has all 3 legendary birds
// user B has all 3 lake guardians
// user C has all 4 treasures of ruin
// user D has bellsprout and pikachu

// not assigned to anyone are the pikachu clones

// no user has duplicates of any collectable

// stuff should have tags ctrl+f 'tags' to find them

// collections: 'The Legendary Birds', 'The Lake Trio', 'The Treasures of Ruin', 'Bellsprout', 'Pikachu Clones'

// campaigns: 'The Legendary Bird Trio', 'Just BellSprout', 'Random Legendaries'
// 'The Legendary Bird Trio' has the 'featured' tag
// 'Just BellSprout' has the 'popular' tag

// there are 4 achievements:
// 'The Legendary Birds', 'The Lake Guardians', 'The Treasures of Ruin', 'Pikachu Clones'

const prisma = new PrismaClient()

async function main() {
  const collectables = await prisma.collectable.createMany({
    data: [
      {
        name: 'Articuno',
        image: 'https://archives.bulbagarden.net/media/upload/d/d0/0144Articuno.png',
        tags: ['ice', 'flying', 'legendary', 'Kanto', 'Pokemon'],
      },
      {
        name: 'Zapdos',
        image: 'https://archives.bulbagarden.net/media/upload/c/c6/0145Zapdos.png',
        tags: ['electric', 'flying', 'legendary', 'Kanto', 'Pokemon'],
      },
      {
        name: 'Moltres',
        image: 'https://archives.bulbagarden.net/media/upload/2/21/0146Moltres.png',
        tags: ['fire', 'flying', 'legendary', 'Kanto', 'Pokemon'],
      },
      {
        name: 'Uxie',
        image: 'https://archives.bulbagarden.net/media/upload/1/18/0480Uxie.png',
        tags: ['psychic', 'legendary', 'knowledge', 'Sinnoh', 'Pokemon'],
      },
      {
        name: 'Mespirit',
        image: 'https://archives.bulbagarden.net/media/upload/2/24/0481Mesprit.png',
        tags: ['psychic', 'legendary', 'emotion', 'Sinnoh', 'Pokemon'],
      },
      {
        name: 'Azelf',
        image: 'https://archives.bulbagarden.net/media/upload/a/ac/0482Azelf.png',
        tags: ['psychic', 'legendary', 'willpower', 'Sinnoh', 'Pokemon'],
      },
      {
        name: 'Wo-Chien',
        image: 'https://archives.bulbagarden.net/media/upload/d/d4/1001Wo-Chien.png',
        tags: ['dark', 'grass', 'legendary', 'Tablets of Ruin', 'Paldea', 'Pokemon'],
      },
      {
        name: 'Chien-Pao',
        image: 'https://archives.bulbagarden.net/media/upload/1/17/1002Chien-Pao.png',
        tags: ['dark', 'ice', 'legendary', 'Sword of Ruin', 'Paldea', 'Pokemon'],
      },
      {
        name: 'Ting-Lu',
        image: 'https://archives.bulbagarden.net/media/upload/1/12/1003Ting-Lu.png',
        tags: ['dark', 'ground', 'lengendary', 'Vessel of Ruin', 'Paldea', 'Pokemon'],
      },
      {
        name: 'Chi-Yu',
        image: 'https://archives.bulbagarden.net/media/upload/7/71/1004Chi-Yu.png',
        tags: ['dark', 'fire', 'legendary', 'Beads of Ruin', 'Paldea', 'Pokemon'],
      },
      {
        name: 'Bellsprout',
        image: 'https://archives.bulbagarden.net/media/upload/6/66/0069Bellsprout.png',
        tags: ['grass', 'poison', 'Kanto', 'Pokemon'],
      },
      {
        name: 'Pikachu',
        image: 'https://archives.bulbagarden.net/media/upload/4/4a/0025Pikachu.png',
        tags: ['electric', 'Kanto', 'Pokemon'],
      },
      {
        name: 'Maril',
        image: 'https://archives.bulbagarden.net/media/upload/8/8e/0183Marill.png',
        tags: ['water', 'fairy', 'Johto', 'Pokemon'],
      },
      {
        name: 'Plusle',
        image: 'https://archives.bulbagarden.net/media/upload/3/3b/0311Plusle.png',
        tags: ['electric', 'Hoenn', 'Pokemon'],
      },
      {
        name: 'Minun',
        image: 'https://archives.bulbagarden.net/media/upload/a/a9/0312Minun.png',
        tags: ['electric', 'Hoenn', 'Pokemon'],
      },
      {
        name: 'Pachirisu',
        image: 'https://archives.bulbagarden.net/media/upload/9/92/0417Pachirisu.png',
        tags: ['electric', 'Sinnoh', 'Pokemon'],
      },
      {
        name: 'Emolga',
        image: 'https://archives.bulbagarden.net/media/upload/9/96/0587Emolga.png',
        tags: ['electric', 'flying', 'Unova', 'Pokemon'],
      },
      {
        name: 'Dedenne',
        image: 'https://archives.bulbagarden.net/media/upload/4/4f/0702Dedenne.png',
        tags: ['electric', 'fairy', 'Kalos', 'Pokemon'],
      },
      {
        name: 'Togedemaru',
        image: 'https://archives.bulbagarden.net/media/upload/8/8b/0777Togedemaru.png',
        tags: ['electric', 'steel', 'Alola', 'Pokemon'],
      },
      {
        name: 'Mimikyu',
        image: 'https://archives.bulbagarden.net/media/upload/4/41/0778Mimikyu.png',
        tags: ['ghost', 'fairy', 'Alola', 'Pokemon'],
      },
      {
        name: 'Morpeko',
        image: 'https://archives.bulbagarden.net/media/upload/e/ef/0877Morpeko-Full.png',
        tags: ['electric', 'dark', 'Galar', 'Pokemon'],
      },
      {
        name: 'Pawmi',
        image: 'https://archives.bulbagarden.net/media/upload/5/58/0921Pawmi.png',
        tags: ['electric', 'Paldea', 'Pokemon'],
      },
    ],
  })

  const collections = [
    await prisma.collection.create({
      data: {
        name: 'The Legendary Bird Trio',
        collectables: {
          connect: [{ name: 'Articuno' }, { name: 'Zapdos' }, { name: 'Moltres' }],
        },
        tags: ['legendary', 'legendary birds', 'Kanto', 'Pokemon'],
      },
    }),
    await prisma.collection.create({
      data: {
        name: 'The Lake Trio',
        collectables: {
          connect: [{ name: 'Uxie' }, { name: 'Mespirit' }, { name: 'Azelf' }],
        },
        tags: ['legendary', 'lake guardians', 'Sinnoh', 'Pokemon'],
      },
    }),
    await prisma.collection.create({
      data: {
        name: 'The Treasures of Ruin',
        collectables: {
          connect: [{ name: 'Wo-Chien' }, { name: 'Chien-Pao' }, { name: 'Ting-Lu' }, { name: 'Chi-Yu' }],
        },
        tags: ['legendary', 'treasures of ruin', 'Paldea', 'Pokemon'],
      },
    }),
    await prisma.collection.create({
      data: {
        name: 'Bellsprout',
        collectables: {
          connect: [{ name: 'Bellsprout' }],
        },
        tags: ['grass', 'poison', 'Pokemon'],
      },
    }),
    await prisma.collection.create({
      data: {
        name: 'Pikachu Clones',
        collectables: {
          connect: [
            { name: 'Pikachu' },
            { name: 'Maril' },
            { name: 'Plusle' },
            { name: 'Minun' },
            { name: 'Pachirisu' },
            { name: 'Emolga' },
            { name: 'Dedenne' },
            { name: 'Togedemaru' },
            { name: 'Mimikyu' },
            { name: 'Morpeko' },
            { name: 'Pawmi' },
          ],
        },
      },
    }),
  ]

  const achievements = await prisma.achievement.createMany({
    data: [
      {
        name: 'The Legendary Birds',
        description: 'Collect all three legendary birds',
      },
      {
        name: 'The Lake Guardians',
        description: 'Collect all three lake guardians',
      },
      {
        name: 'The Treasures of Ruin',
        description: 'Collect all four treasures of ruin',
      },
      {
        name: 'Pikachu Clones',
        description: 'Collect all eleven pikachu clones',
      },
    ],
  })

  const admin = await prisma.user.create({
    data: {
      id: '564620f7-f07c-49a0-b421-99e365b03b24',
      role: 'ADMIN',
    },
  })

  const manager = await prisma.user.create({
    data: {
      id: 'c6f5c8d1-c7e4-4ace-a053-920f82656950',
      role: 'MANAGER',
    },
  })

  const a = await prisma.user.create({
    data: {
      id: 'f3d0c820-eb35-4edc-89d1-913a6a9b87cc',
      profile: {
        create: {
          name: 'a',
          description: 'default description for a',
          image: 'default image for a',

          inventory: {
            create: [
              {
                name: 'Articuno',
                count: 1,
              },
              {
                name: 'Zapdos',
                count: 1,
              },
              {
                name: 'Moltres',
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
      id: '1bd1afa6-4b79-4888-bcaa-dfd2f4bf35f5',
      profile: {
        create: {
          name: 'b',
          description: 'default description for b',
          image: 'default image for b',

          inventory: {
            create: [
              {
                name: 'Uxie',
                count: 1,
              },
              {
                name: 'Mespirit',
                count: 1,
              },
              {
                name: 'Azelf',
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
      id: '104d0ebb-558d-47fe-8c52-f257c6a238a8',
      profile: {
        create: {
          name: 'c',
          description: 'default description for c',
          image: 'default image for c',
          inventory: {
            create: [
              {
                name: 'Wo-Chien',
                count: 1,
              },
              {
                name: 'Chien-Pao',
                count: 1,
              },
              {
                name: 'Ting-Lu',
                count: 1,
              },
              {
                name: 'Chi-Yu',
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
          inventory: {
            create: [
              {
                name: 'Bellsprout',
                count: 1,
              },
              {
                name: 'Pikachu',
                count: 1,
              },
            ],
          },
        },
      },
    },
  })

  const campaigns = [
    await prisma.campaign.create({
      data: {
        name: 'The Legendary Bird Trio',
        end: new Date(Date.now() + 12096e5), // now + 2 weeks
        tags: ['legendary', 'Pokemon', 'featured'],
        collections: { connect: { name: 'The Legendary Bird Trio' } },
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
    await prisma.campaign.create({
      data: {
        name: 'Random Legendaries',
        end: new Date(Date.now() + 12096e5), // now + 2 weeks
        tags: ['legendary', 'Pokemon'],
        collections: {
          connect: [{ name: 'The Lake Trio' }, { name: 'The Treasures of Ruin' }],
        },
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
