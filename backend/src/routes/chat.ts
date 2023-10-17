import { FastifyInstance, FastifyRequest } from 'fastify'
import 'dotenv/config'
import {
  requestHandler,
  getUserId,
  supabase,
} from '@Source/utils/supabaseUtils'
import { getUserIdGivenName } from '@Source/utils/utils'

export default async function (fastify: FastifyInstance) {
  /*
   *  POST /chat/:receiverName
   *  Creates a chat between current user and user with receiverName
   *  @returns {object} chat
   */
  fastify.post(
    '/chat/:receiverName',
    async (
      req: FastifyRequest<{ Params: { receiverName: string } }>,
      reply
    ) => {
      const token = req.headers['authorization'] as string

      const { receiverName } = req.params

      reply.send(createChat(token, await getUserId(token), receiverName))
    }
  )

  /*
   *  GET /chat/:receiverName
   *  Returns a chat between current user and user with receiverName
   *  @returns {object} chat
   */
  fastify.get(
    '/chat/:receiverName',
    async (
      req: FastifyRequest<{ Params: { receiverName: string } }>,
      reply
    ) => {
      const token = req.headers['authorization']
      const { receiverName } = req.params
      const {
        data: { user },
      } = await supabase().auth.getUser(token)

      if (!token || !user?.id) {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const messages = getMessages(token, user?.id, receiverName)
      reply.send(await messages)
    }
  )

  /*
   *  GET /chat
   *  Returns all chats
   *  @returns {object} chats
   */
  fastify.get('/chat', async (req, reply) => {
    try {
      const token = req.headers['authorization']
      const {
        data: { user },
      } = await supabase().auth.getUser(token)

      if (!token || !user?.id) {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const chats = await getChats(token, user?.id)
      reply.send(chats)
    } catch (error) {
      console.log(error)
      reply.status(500).send({ error: error })
    }
  })

  // API endpoint for sending a chat message
  fastify.put(
    '/chat/send/:receiverName',
    async (
      req: FastifyRequest<{
        Params: { receiverName: string }
        Body: { messageContents: string }
      }>,
      reply
    ) => {
      try {
        const token = req.headers['authorization']
        const { receiverName } = req.params
        const { messageContents } = req.body

        const {
          data: { user },
        } = await supabase().auth.getUser(token)

        if (!token || !user?.id) {
          reply.status(401).send({ error: 'Unauthorized' })
          return
        }

        if (!messageContents) {
          reply.status(400).send({ error: 'Missing message in request' })
          return
        }

        reply.send(sendMessage(token, user?.id, receiverName, messageContents))
      } catch (error) {
        reply.status(500).send({ error: error })
      }
    }
  )
}

// helper functions ------------------------------------------------------------

enum MessageType {
  USER,
  RECEIVER,
}

type Message = {
  type: MessageType
  content: string
  timestamp: Date
}

async function getChats(token: string, userId: string) {
  const prisma = await requestHandler(token) // fix this
  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      users: true,
    },
  })

  const latestMessages = []
  for (const chat of chats) {
    const chatMessages = await prisma.message.findMany({
      where: {
        chatId: chat.id,
      },
    })
    if (chatMessages.length === 0) {
      latestMessages.push(null)
    } else {
      latestMessages.push(chatMessages[chatMessages.length - 1])
    }
  }

  const formattedChats = [] // refactor this later im pretty sure there's an easier way of doing this
  for (const chat of chats) {
    formattedChats.push({
      id: chat.id,
      latestMessage: latestMessages[chats.indexOf(chat)],
      receiver: chat.users.filter((user) => user.id !== userId)[0].name, // Not a fan of index at 0 even if its ok
      image: chat.users.filter((user) => user.id !== userId)[0].image,
    })
  }
  formattedChats.sort((a, b) => {
    if (a.latestMessage == null) return 1
    if (b.latestMessage == null) return -1
    return (
      new Date(b.latestMessage.updatedAt).getTime() -
      new Date(a.latestMessage.updatedAt).getTime()
    )
  })

  return { chats: formattedChats }
}

async function getMessages(
  token: string,
  userId: string,
  receiverName: string
) {
  const prisma = await requestHandler(token) // fix this
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
async function createChat(token: string, userId: string, receiverName: string) {
  const prisma = await requestHandler(token) // fix this

  let receiverId // Fix up this code later
  try {
    receiverId = await getUserIdGivenName(receiverName, prisma)
  } catch (e) {
    throw new Error("Username doesn't exist")
  }

  if (userId === receiverId) {
    throw new Error('Cannot message oneself')
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
