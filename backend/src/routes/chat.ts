import { FastifyInstance, FastifyRequest } from 'fastify'
import 'dotenv/config'
import { getChats, getMessages, sendMessage, updateChat } from '@Source/chat'
import {
  supabase,
} from '@Source/utils/PrismaHandler'

export default async function (fastify: FastifyInstance) {
  fastify.put(
    '/chat/:receiverName',
    async (req: FastifyRequest<{ Params: { receiverName: string } }>, reply) => {
      try {
        const token = req.headers['authorization']

        const {
          data: { user },
        } = await supabase().auth.getUser(token)
        const { receiverName } = req.params

        if (!token || !user?.id) {
          reply.status(401).send({ error: 'Unauthorized' })
          return
        }
        reply.send(updateChat(token, user?.id, receiverName))
      } catch (error) {
        console.log(error)
        reply.code(500).send({ error: error })
      }
    }
  )

  // API endpoint for retrieving messages with a user
  fastify.get(
    '/chat/:receiverName',
    async (req: FastifyRequest<{ Params: { receiverName: string } }>, reply) => {
      try {
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
      } catch (error) {
        console.log(error)
        reply.status(500).send({ error: error })
      }
    }
  )
  // API endpoint for retrieving chats of a user from the database
  fastify.get('/chats', async (req, reply) => {
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

  // API endpoint for updating chat
  fastify.put(
    '/chat/update/:receiverName',
    async (req: FastifyRequest<{ Params: { receiverName: string } }>, reply) => {
      try {
        const token = req.headers['authorization']
        const { receiverName } = req.params

        const {
          data: { user },
        } = await supabase().auth.getUser(token)

        if (!token || !user?.id) {
          reply.status(401).send({ error: 'Unauthorized' })
          return
        }

        const messageContents = req.body as string
        reply.send(sendMessage(token, user?.id, receiverName, messageContents))
      } catch (error) {
        reply.status(500).send({ error: error })
      }
    }
  )

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