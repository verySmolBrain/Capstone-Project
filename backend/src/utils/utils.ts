import { PrismaClient } from '@prisma/client'
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator'
import { requestHandler } from './supabaseUtils'

const customConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  style: 'capital',
  separator: '',
}

export type Id = {
  id: number
}

export type collectableCount = {
  name: string
  count: number
}

// get user id from name
export async function getUserId(name: string, prisma: PrismaClient): Promise<string> {
  const user = await prisma.profile.findUniqueOrThrow({
    where: {
      name: name,
    },
  })
  return user.id
}

export async function generateUsername(token: string) {
  let username = uniqueNamesGenerator(customConfig)
  const prisma = await requestHandler(token)

  while (true) {
    username = uniqueNamesGenerator(customConfig)
    const user = await prisma.profile.findUnique({
      where: {
        name: username,
      },
    })

    if (!user) {
      break
    }
  }

  return username
}

export const defaultImage = 'https://upload.wikimedia.org/wikipedia/en/c/ce/Goomba.PNG' // deprecate later

export const defaultDescription = 'im such a goomba' // deprecate later
