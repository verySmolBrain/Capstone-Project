import { requestHandler } from './utils/PrismaHandler'
import { getUserIdGivenName } from './utils/utils'

async function getChats(token: string | undefined, userId: string | undefined) {
  const prisma = await requestHandler(token as string) // fix this
  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  })
  return chats
}

async function getChat(token: string, userId: string, receiverName: string) {
  const prisma = await requestHandler(token as string) // fix this
  const receiverId = await getUserIdGivenName(receiverName, prisma)

  const chat = await prisma.chat.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: [userId, receiverId],
          },
        },
      },
    },
  })

  return chat
}

// Creates a new chat between 2 users that have no existing DM between them
async function updateChat(token: string, userId: string, receiverName: string) {
  const prisma = await requestHandler(token as string) // fix this
  const receiverId = await getUserIdGivenName(receiverName, prisma)

  const newChat = await prisma.chat.create({
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
  return newChat
}

async function sendMessage(
  token: string,
  userId: string,
  receiverName: string,
  message: string
) {
  const prisma = await requestHandler(token as string) // fix this
  const receiverId = await getUserIdGivenName(receiverName, prisma)

  const currChat = await prisma.chat.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: [userId, receiverId],
          },
        },
      },
    },
  })

  if (!currChat) {
    throw new Error('No chat found')
  }

  const updateResult = await prisma.chat.update({
    where: {
      id: currChat.id,
    },
    data: {
      messages: {
        create: {
          content: message,
          senderId: userId,
          receiverId: receiverId,
        },
      },
    },
  })

  return updateResult
}

export { getChats, getChat, updateChat, sendMessage }
