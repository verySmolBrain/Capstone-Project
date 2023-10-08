import { requestHandler } from "./utils/PrismaHandler"

async function getChats(token: string | undefined, userId: string | undefined) {
  const prisma = await requestHandler(token as string)
  const chats = await prisma.chat.findMany({
    where:{
      users: {
        some: {
          id: userId
        }
      }
    }
  })
  return chats
}

async function getChat(token: string | undefined, userId: string | undefined, receiverId: string | undefined) {
  const prisma = await requestHandler(token as string)
  const chat = await prisma.chat.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: [userId, receiverId]
          }
        }
      }
    }
  })

  return chat
}

async function updateChat(token: string | undefined, userId: string | undefined, receiverId: string | undefined) {
  const prisma = await requestHandler(token as string)
  const post = await prisma.chat.create({
    data: {
      users: {
        connect: [
          {
            id: userId,
          },
          {
            id: receiverId,
          },
        ],
      },
    },
  })
  return post
}

export {getChats, getChat, updateChat}