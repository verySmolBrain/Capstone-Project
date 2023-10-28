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
        image: 'https://archives.bulbagarden.net/media/upload/e/e7/ArticunoEXPlasmaStorm132.jpg',
        tags: ['Ice', 'Flying', 'Legendary', 'Kanto', 'Pokemon'],
      },
      {
        name: 'Zapdos',
        image: 'https://archives.bulbagarden.net/media/upload/8/86/Zapdosex194Pok%C3%A9monCard151.jpg',
        tags: ['Electric', 'Flying', 'Legendary', 'Kanto', 'Pokemon'],
      },
      {
        name: 'Moltres',
        image: 'https://archives.bulbagarden.net/media/upload/d/dc/GalarianMoltresVChillingReign97.jpg',
        tags: ['Fire', 'Flying', 'Legendary', 'Kanto', 'Pokemon'],
      },
      {
        name: 'Uxie',
        image: 'https://archives.bulbagarden.net/media/upload/6/60/UxieLVXLegendsAwakened146.jpg',
        tags: ['Psychic', 'Legendary', 'Knowledge', 'Sinnoh', 'Pokemon'],
      },
      {
        name: 'Mespirit',
        image: 'https://archives.bulbagarden.net/media/upload/a/a7/MespritLVXLegendsAwakened143.jpg',
        tags: ['Psychic', 'Legendary', 'Emotion', 'Sinnoh', 'Pokemon'],
      },
      {
        name: 'Azelf',
        image: 'https://archives.bulbagarden.net/media/upload/1/15/AzelfLVXLegendsAwakened140.jpg',
        tags: ['Psychic', 'Legendary', 'Willpower', 'Sinnoh', 'Pokemon'],
      },
      {
        name: 'Wo-Chien',
        image: 'https://archives.bulbagarden.net/media/upload/b/bf/Wo-ChienexPaldeaEvolved232.jpg',
        tags: ['Dark', 'Grass', 'Legendary', 'Tablets of Ruin', 'Paldea', 'Pokemon'],
      },
      {
        name: 'Chien-Pao',
        image: 'https://archives.bulbagarden.net/media/upload/a/a6/Chien-PaoexSVPPromo30.jpg',
        tags: ['Dark', 'Ice', 'Legendary', 'Sword of Ruin', 'Paldea', 'Pokemon'],
      },
      {
        name: 'Ting-Lu',
        image: 'https://archives.bulbagarden.net/media/upload/f/fd/Ting-LuexPaldeaEvolved275.jpg',
        tags: ['Dark', 'Ground', 'Legendary', 'Vessel of Ruin', 'Paldea', 'Pokemon'],
      },
      {
        name: 'Chi-Yu',
        image: 'https://archives.bulbagarden.net/media/upload/7/7c/Chi-YuexPaldeaEvolved234.jpg',
        tags: ['Dark', 'Fire', 'Legendary', 'Beads of Ruin', 'Paldea', 'Pokemon'],
      },
      {
        name: 'Bellsprout',
        image: 'https://archives.bulbagarden.net/media/upload/0/04/ErikaBellsproutGymChallenge38.jpg',
        tags: ['Grass', 'Poison', 'Kanto', 'Pokemon'],
      },
      {
        name: 'Pikachu',
        image: 'https://archives.bulbagarden.net/media/upload/b/b2/PretendGyaradosPikachuXYPromo151.jpg',
        tags: ['Electric', 'Kanto', 'Pokemon'],
      },
      {
        name: 'Marill',
        image: 'https://archives.bulbagarden.net/media/upload/5/5d/MarillPaldeaEvolved204.jpg',
        tags: ['Water', 'Fairy', 'Johto', 'Pokemon'],
      },
      {
        name: 'Plusle',
        image: 'https://archives.bulbagarden.net/media/upload/f/fa/LaRoussePlusleMovieVSPack4.jpg',
        tags: ['Electric', 'Hoenn', 'Pokemon'],
      },
      {
        name: 'Minun',
        image: 'https://archives.bulbagarden.net/media/upload/c/c4/LaRousseMinunMovieVSPack5.jpg',
        tags: ['Electric', 'Hoenn', 'Pokemon'],
      },
      {
        name: 'Pachirisu',
        image: 'https://archives.bulbagarden.net/media/upload/a/a9/PachirisuScarletViolet208.jpg',
        tags: ['Electric', 'Sinnoh', 'Pokemon'],
      },
      {
        name: 'Emolga',
        image: 'https://archives.bulbagarden.net/media/upload/b/b9/EmolgaEXXY143.jpg',
        tags: ['Electric', 'Flying', 'Unova', 'Pokemon'],
      },
      {
        name: 'Dedenne',
        image: 'https://archives.bulbagarden.net/media/upload/2/26/DedenneexPaldeaEvolved239.jpg',
        tags: ['Electric', 'Fairy', 'Kalos', 'Pokemon'],
      },
      {
        name: 'Togedemaru',
        image: 'https://archives.bulbagarden.net/media/upload/1/12/TogedemaruObsidianFlames151.jpg',
        tags: ['Electric', 'Steel', 'Alola', 'Pokemon'],
      },
      {
        name: 'Mimikyu',
        image: 'https://archives.bulbagarden.net/media/upload/3/3b/MimikyuVMAXBrilliantStarsTG17.jpg',
        tags: ['Ghost', 'Fairy', 'Alola', 'Pokemon'],
      },
      {
        name: 'Morpeko',
        image: 'https://archives.bulbagarden.net/media/upload/e/eb/MorpekoVMAXSwordShield204.jpg',
        tags: ['Electric', 'Dark', 'Galar', 'Pokemon'],
      },
      {
        name: 'Pawmi',
        image: 'https://archives.bulbagarden.net/media/upload/f/fa/PawmiSVPPromo40.jpg',
        tags: ['Electric', 'Paldea', 'Pokemon'],
      },
    ],
  })

  const collections = [
    await prisma.collection.create({
      data: {
        name: 'The Legendary Bird Trio',
        image: 'https://res.cloudinary.com/dzwpe1yjo/image/upload/v1698509727/collections/to9rbctzslsezy7lczhx.png',
        collectables: {
          connect: [{ name: 'Articuno' }, { name: 'Zapdos' }, { name: 'Moltres' }],
        },
        tags: ['Legendary', 'Legendary Birds', 'Kanto', 'Pokemon'],
      },
    }),
    await prisma.collection.create({
      data: {
        name: 'The Lake Trio',
        image: 'https://res.cloudinary.com/dzwpe1yjo/image/upload/v1698509765/collections/fix7ya1oyjulkhdbty3i.png',
        collectables: {
          connect: [{ name: 'Uxie' }, { name: 'Mespirit' }, { name: 'Azelf' }],
        },
        tags: ['Legendary', 'Lake Guardians', 'Sinnoh', 'Pokemon'],
      },
    }),
    await prisma.collection.create({
      data: {
        name: 'The Treasures of Ruin',
        image: 'https://res.cloudinary.com/dzwpe1yjo/image/upload/v1698509773/collections/ttavlkmrv8br1ewctpjm.png',
        collectables: {
          connect: [{ name: 'Wo-Chien' }, { name: 'Chien-Pao' }, { name: 'Ting-Lu' }, { name: 'Chi-Yu' }],
        },
        tags: ['Legendary', 'Treasures of Ruin', 'Paldea', 'Pokemon'],
      },
    }),
    await prisma.collection.create({
      data: {
        name: 'Bellsprout',
        image: 'https://res.cloudinary.com/dzwpe1yjo/image/upload/v1698509900/collections/ih5adwceesev40ln8sfy.png',
        collectables: {
          connect: [{ name: 'Bellsprout' }],
        },
        tags: ['Grass', 'Poison', 'Pokemon'],
      },
    }),
    await prisma.collection.create({
      data: {
        name: 'Pikachu Clones',
        image: 'https://res.cloudinary.com/dzwpe1yjo/image/upload/v1698509990/collections/twbw8c0guarkoio4x7qw.png',
        collectables: {
          connect: [
            { name: 'Pikachu' },
            { name: 'Marill' },
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
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Mushroom_14.jpg/640px-Mushroom_14.jpg',

          inventory: {
            create: [
              {
                name: 'Articuno',
                count: 2,
              },
              {
                name: 'Zapdos',
                count: 2,
              },
              {
                name: 'Moltres',
                count: 1,
              },
            ],
          },
          wishlist: {
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
          wares: {
            create: [
              {
                name: 'Articuno',
                count: 1,
              },
              {
                name: 'Zapdos',
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
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Amanita_muscaria_%28fly_agaric%29.JPG/640px-Amanita_muscaria_%28fly_agaric%29.JPG',

          inventory: {
            create: [
              {
                name: 'Uxie',
                count: 2,
              },
              {
                name: 'Mespirit',
                count: 2,
              },
              {
                name: 'Azelf',
                count: 1,
              },
            ],
          },

          wishlist: {
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

          wares: {
            create: [
              {
                name: 'Uxie',
                count: 1,
              },
              {
                name: 'Mespirit',
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
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Lentinula_edodes_20101113_b.jpg/640px-Lentinula_edodes_20101113_b.jpg',
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
          wishlist: {
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

  const d = await prisma.user.create({
    data: {
      id: '59b43561-7e65-418c-8531-972bbf1fd2a4',
      profile: {
        create: {
          name: 'd',
          description: 'default description for d',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Morilla_-_Morchella_%288655750535%29.jpg/640px-Morilla_-_Morchella_%288655750535%29.jpg',
          inventory: {
            create: [
              {
                name: 'Bellsprout',
                count: 1,
              },
              {
                name: 'Pikachu',
                count: 99,
              },
            ],
          },

          wares: {
            create: [
              {
                name: 'Bellsprout',
                count: 1,
              },
              {
                name: 'Pikachu',
                count: 50,
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
        name: 'Legendary Birds',
        image: 'https://archives.bulbagarden.net/media/upload/1/1e/SWSH9_Logo_EN.png',
        isActive: true,
        end: new Date(Date.now() + 12096e5), // now + 2 weeks
        tags: ['Legendary', 'Pokemon', 'Featured'],
        collections: { connect: { name: 'The Legendary Bird Trio' } },
        managers: { connect: { id: manager.id } },
      },
    }),
    await prisma.campaign.create({
      data: {
        name: 'Just BellSprout',
        image: 'https://archives.bulbagarden.net/media/upload/a/ac/SWSH7_Logo_EN.png',
        isActive: true,
        end: new Date(Date.now() + 12096e5), // now + 2 weeks
        tags: ['Grass', 'Poison', 'Pokemon', 'Popular'],
        collections: { connect: { name: 'Bellsprout' } },
        managers: { connect: { id: manager.id } },
      },
    }),
    await prisma.campaign.create({
      data: {
        name: 'Random Legendaries',
        image: 'https://archives.bulbagarden.net/media/upload/d/d8/SV2_Logo_EN.png',
        isActive: false,
        end: new Date(Date.now() + 12096e5), // now + 2 weeks
        tags: ['Legendary', 'Pokemon'],
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
