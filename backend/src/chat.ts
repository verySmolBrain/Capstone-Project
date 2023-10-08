import { requestHandler } from './utils/PrismaHandler'
import { getUserIdGivenName } from './utils/utils'

// Rewrite this later
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

enum MessageType {
  USER,
  RECEIVER,
}

type Message = {
  type: MessageType
  content: string
  timestamp: Date
}

async function getMessages(
  token: string,
  userId: string,
  receiverName: string
) {
  const prisma = await requestHandler(token as string) // fix this
  let receiverId // Fix up this code later
  try {
    receiverId = await getUserIdGivenName(receiverName, prisma)
  } catch (e) {
    throw new Error("Username doesn't exist")
  }

  const chatParticipants = [userId, receiverId].sort((a, b) =>
    a.localeCompare(b)
  )

  const chat = await prisma.chat.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: chatParticipants,
          },
        },
      },
    },
  })

  if (!chat) {
    throw new Error('No chat found')
  }

  const messages = await prisma.message.findMany({
    where: {
      chatId: chat.id,
    },
  })

  const formattedMessages: Message[] = messages.map((message) => {
    const type =
      message.senderId === userId ? MessageType.USER : MessageType.RECEIVER

    return {
      type: type,
      content: message.content,
      timestamp: message.updatedAt,
    }
  })

  return { messages: formattedMessages }
} // Write documentation for this later

// Creates a new chat between 2 users that have no existing DM between them
async function updateChat(token: string, userId: string, receiverName: string) {
  const prisma = await requestHandler(token as string) // fix this

  let receiverId // Fix up this code later
  try {
    receiverId = await getUserIdGivenName(receiverName, prisma)
  } catch (e) {
    throw new Error("Username doesn't exist")
  }

  const chatParticipants = [
    {
      id: userId,
    },
    {
      id: receiverId,
    },
  ]

  chatParticipants.sort((a, b) => {
    return a.id.localeCompare(b.id)
  })

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
    const newChat = await prisma.chat.create({
      data: {
        users: {
          connect: chatParticipants,
        },
      },
    })

    return newChat
  }

  return currChat
}

async function sendMessage(
  token: string,
  userId: string,
  receiverName: string,
  message: string
) {
  const prisma = await requestHandler(token as string) // fix this
  let receiverId // Fix up this code later
  try {
    receiverId = await getUserIdGivenName(receiverName, prisma)
  } catch (e) {
    throw new Error("Username doesn't exist")
  }

  const chatParticipants = [userId, receiverId].sort((a, b) =>
    a.localeCompare(b)
  )

  const currChat = await prisma.chat.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: chatParticipants,
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

export { getChats, getMessages, updateChat, sendMessage }
