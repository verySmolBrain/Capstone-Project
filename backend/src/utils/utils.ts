import { PrismaClient } from '@prisma/client'

export async function getUserIdGivenName(
  name: string,
  prisma: PrismaClient
): Promise<string> {
  const user = await prisma.user.findFirst({
    where: {
      profile: {
        name: name,
      },
    },
  })

  if (!user) {
    throw new Error("Username doesn't exist")
  }
  return user.id
}

export const defaultImage =
  'https://upload.wikimedia.org/wikipedia/en/c/ce/Goomba.PNG'

export const defaultDescription = 'im such a goomba'
