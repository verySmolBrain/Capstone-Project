import { Prisma } from '@prisma/client'

export const collectableCountSelect = {
  id: true,
  name: true,
  collectable: {
    select: {
      image: true,
      tags: true,
      collection: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  },
  count: true,
} satisfies Prisma.CollectableCountSelect

export type collectableCount = Prisma.CollectableCountGetPayload<{ select: typeof collectableCountSelect }>

export const collectableCountCreateSelect = {
  name: true,
  count: true,
} satisfies Prisma.CollectableCountSelect

export type collectableCountCreate = Prisma.CollectableCountGetPayload<{ select: typeof collectableCountCreateSelect }>

export const collectionSelect = {
  name: true,
  image: true,
  collectables: {
    select: collectableCountSelect,
  },
  tags: true,
} satisfies Prisma.CollectionSelect

export type collection = Prisma.CollectionGetPayload<{ select: typeof collectionSelect }>

export type CollectionCollectable = {
  [key: string]: {
    image?: string
    collectables: collectableCount[]
  }
}
