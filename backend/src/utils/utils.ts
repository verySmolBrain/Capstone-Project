import { PrismaClient } from '@prisma/client'

export type Id = {
  id: number
}

// get user id from name
export async function getUserId(
  name: string,
  prisma: PrismaClient
): Promise<string> {
  const user = await prisma.profile.findUniqueOrThrow({
    where: {
      name: name,
    },
  })
  return user.id
}

export const defaultImage =
  'https://upload.wikimedia.org/wikipedia/en/c/ce/Goomba.PNG'

export const defaultDescription = 'im such a goomba'
