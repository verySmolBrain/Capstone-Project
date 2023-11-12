import { PrismaClient } from '@prisma/client'

// ALL PASSWORDS ARE 'password'

// admin : admin@test.com.au : 564620f7-f07c-49a0-b421-99e365b03b24
// manager : manager@test.com : c6f5c8d1-c7e4-4ace-a053-920f82656950

// user A : a@test.com : f3d0c820-eb35-4edc-89d1-913a6a9b87cc
// user B : b@test.com : 1bd1afa6-4b79-4888-bcaa-dfd2f4bf35f5
// user C : c@test.com : 104d0ebb-558d-47fe-8c52-f257c6a238a8
// user D : d@test.com : 1054e834-0881-4019-bf13-49f9f9853e28

// admin and manager do not have profiles
// the manager has both campaigns

// user A has all 3 legendary birds
// user B has all 3 lake guardians
// user C has all 4 treasures of ruin
// user D has bellsprout and pikachu

// not assigned to anyone are the pikachu clones

// no user has duplicates of any collectable

// stuff should have tags ctrl+f 'tags' to find them

// collections: 'The Legendary Bird Trio', 'The Lake Trio', 'The Treasures of Ruin', 'Bellsprout', 'Pikachu Clones'
// campaigns: 'The Legendary Bird Trio', 'Just BellSprout', 'Random Legendaries'
// 'The Legendary Bird Trio' has the 'featured' tag
// 'Just BellSprout' has the 'popular' tag

// there is an achievement for completing every collection:
// 'Bird Brained', 'The Three Musketeers', 'Treasure Collector', 'Pikachu Power', 'Slenderman'

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
        tags: ['Electric', 'Kanto', 'Pokemon', 'Popular'],
      },
      {
        name: 'Marill',
        image: 'https://archives.bulbagarden.net/media/upload/5/5d/MarillPaldeaEvolved204.jpg',
        tags: ['Water', 'Fairy', 'Johto', 'Pokemon'],
      },
      {
        name: 'Plusle',
        image: 'https://archives.bulbagarden.net/media/upload/f/fa/LaRoussePlusleMovieVSPack4.jpg',
        tags: ['Electric', 'Hoenn', 'Pokemon', 'Popular'],
      },
      {
        name: 'Minun',
        image: 'https://archives.bulbagarden.net/media/upload/c/c4/LaRousseMinunMovieVSPack5.jpg',
        tags: ['Electric', 'Hoenn', 'Pokemon', 'Popular'],
      },
      {
        name: 'Pachirisu',
        image: 'https://archives.bulbagarden.net/media/upload/a/a9/PachirisuScarletViolet208.jpg',
        tags: ['Electric', 'Sinnoh', 'Pokemon', 'Popular'],
      },
      {
        name: 'Emolga',
        image: 'https://archives.bulbagarden.net/media/upload/b/b9/EmolgaEXXY143.jpg',
        tags: ['Electric', 'Flying', 'Unova', 'Pokemon', 'Popular'],
      },
      {
        name: 'Dedenne',
        image: 'https://archives.bulbagarden.net/media/upload/2/26/DedenneexPaldeaEvolved239.jpg',
        tags: ['Electric', 'Fairy', 'Kalos', 'Pokemon', 'Popular'],
      },
      {
        name: 'Togedemaru',
        image: 'https://archives.bulbagarden.net/media/upload/1/12/TogedemaruObsidianFlames151.jpg',
        tags: ['Electric', 'Steel', 'Alola', 'Pokemon', 'Popular'],
      },
      {
        name: 'Mimikyu',
        image: 'https://archives.bulbagarden.net/media/upload/3/3b/MimikyuVMAXBrilliantStarsTG17.jpg',
        tags: ['Ghost', 'Fairy', 'Alola', 'Pokemon', 'Popular'],
      },
      {
        name: 'Morpeko',
        image: 'https://archives.bulbagarden.net/media/upload/e/eb/MorpekoVMAXSwordShield204.jpg',
        tags: ['Electric', 'Dark', 'Galar', 'Pokemon', 'Popular'],
      },
      {
        name: 'Pawmi',
        image: 'https://archives.bulbagarden.net/media/upload/f/fa/PawmiSVPPromo40.jpg',
        tags: ['Electric', 'Paldea', 'Pokemon'],
      },
    ],
  })

  const admin = await prisma.user.create({
    data: {
      id: '564620f7-f07c-49a0-b421-99e365b03b24',
      role: 'ADMIN',
      profile: {
        create: {
          name: 'AdminAccountOfficerAdam',
          description: 'I administrate this website. DM me for any evildoers.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Asaf_Bartov_006_-_Wikimedia_Foundation_Oct11.jpg',

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

  const manager = await prisma.user.create({
    data: {
      id: 'c6f5c8d1-c7e4-4ace-a053-920f82656950',
      role: 'MANAGER',
      profile: {
        create: {
          name: 'SwordShieldManagerAccount',
          description:
            'We create Pokemon Card Campaigns! Managed by the Official Pokemon Company (For legal purposes this is for testing)',
          image: 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SSH/SSH_138_R_EN.png',

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
      id: '1054e834-0881-4019-bf13-49f9f9853e28',
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

  const collections = [
    await prisma.collection.create({
      data: {
        name: 'The Legendary Bird Trio',
        image: 'https://res.cloudinary.com/dzwpe1yjo/image/upload/v1698509727/collections/to9rbctzslsezy7lczhx.png',
        collectables: {
          connect: [{ name: 'Articuno' }, { name: 'Zapdos' }, { name: 'Moltres' }],
        },
        tags: ['Legendary', 'Legendary Birds', 'Kanto', 'Pokemon'],
        achievement: {
          create: {
            name: 'Bird Brained',
            description: 'Collect all three Legendary Birds',
            image: 'https://archives.bulbagarden.net/media/upload/b/b5/Rainbow_Badge.png',
          },
        },
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
        achievement: {
          create: {
            name: 'The Three Musketeers',
            description: 'Collect all three Lake Guardians',
            image: 'https://archives.bulbagarden.net/media/upload/1/12/Volcano_Badge.png',
          },
        },
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
        achievement: {
          create: {
            name: 'Treasure Collector',
            description: 'Collect all four Treasures of Ruin',
            image: 'https://archives.bulbagarden.net/media/upload/9/9c/Cascade_Badge.png',
          },
        },
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
        achievement: {
          create: {
            name: 'Slenderman',
            description: 'Acquire the GOAT',
            image: 'https://archives.bulbagarden.net/media/upload/7/7d/Soul_Badge.png',
          },
        },
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
        achievement: {
          create: {
            name: 'Pikachu Power',
            description: 'Collect all eleven Pikachu clones',
            image: 'https://archives.bulbagarden.net/media/upload/a/a6/Thunder_Badge.png',
          },
        },
      },
    }),
  ]

  const pA = await prisma.profile.findFirstOrThrow({
    where: { name: 'a' },
    include: { achievements: true },
  })
  const achievementA = await prisma.achievement.findFirstOrThrow({ where: { name: 'Bird Brained' } })
  pA.achievements.push(achievementA)

  const pB = await prisma.profile.findFirstOrThrow({
    where: { name: 'b' },
    include: { achievements: true },
  })
  const achievementB = await prisma.achievement.findFirstOrThrow({ where: { name: 'The Three Musketeers' } })
  pB.achievements.push(achievementB)

  const pC = await prisma.profile.findFirstOrThrow({
    where: { name: 'c' },
    include: { achievements: true },
  })
  const achievementC = await prisma.achievement.findFirstOrThrow({ where: { name: 'Treasure Collector' } })
  pC.achievements.push(achievementC)

  const pD = await prisma.profile.findFirstOrThrow({
    where: { name: 'd' },
    include: { achievements: true },
  })
  const achievementD = await prisma.achievement.findFirstOrThrow({ where: { name: 'Slenderman' } })
  pD.achievements.push(achievementD)

  const achievements = [
    await prisma.profile.update({
      where: { name: 'a' },
      data: {
        achievements: {
          connect: pA.achievements,
        },
      },
    }),
    await prisma.profile.update({
      where: { name: 'b' },
      data: {
        achievements: {
          connect: pB.achievements,
        },
      },
    }),
    await prisma.profile.update({
      where: { name: 'c' },
      data: {
        achievements: {
          connect: pC.achievements,
        },
      },
    }),
    await prisma.profile.update({
      where: { name: 'd' },
      data: {
        achievements: {
          connect: pD.achievements,
        },
      },
    }),
  ]

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
