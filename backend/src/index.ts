import Fastify from 'fastify'
import { SupabaseClient } from '@supabase/supabase-js'
import SupabaseService from './utils/Supabase.service'
import { prisma } from './prisma'
import { FastifyRequest } from 'fastify';
import { Message } from '@prisma/client';


const fastify = Fastify({
  logger: true,
})

const supabase = (): SupabaseClient => {
  return SupabaseService.getInstance()
}

fastify.get('/collectible', async (req, reply) => {
  try {
    const token = req.headers['authorization']
    const {
      data: { user },
    } = await supabase().auth.getUser(token)

    const { data, error } = await supabase()
      .from('collectibles')
      .select()
      .eq('user_id', user?.id)
      .limit(1)

    if (error) {
      throw new Error('Failed to fetch collectible')
    }

    reply.send(data)
  } catch (error) {
    reply.status(500).send({ error: error })
  }
})

// API endpoint for retrieving chats of a user from the database
fastify.get('/chats', async (req, reply) => {
  try {
    const token = req.headers['authorization']
    const {
      data: { user },
    } = await supabase().auth.getUser(token)

    const chats = await prisma.chat.findMany({
      where:{
        senderId: user?.id
      }
    })
    reply.send(chats)
  } catch (error) {
    reply.status(500).send({ error: error })
  }
})

fastify.get('/chat/:receiverId', async (req: FastifyRequest<{ Params: { receiverId: string } }>, reply) => {
  try {
    const token = req.headers['authorization']
    const {
      data: {user}, 
    } = await supabase().auth.getUser(token)

    const chat = await prisma.chat.findFirst({
      where:{
        OR:[
          {
          senderId: user?.id,
          receiverId: req.params.receiverId
          },
        {
          senderId: req.params.receiverId,
          receiverId: user?.id
        }]
      }
    })

    reply.send(chat)
  } catch (error) {
    reply.status(500).send({error: error})
  }
})

// API endpoint for updating chat
fastify.put('/chat/update/:receiverId', async (req: FastifyRequest<{ Params: { receiverId: string } }>, reply) => {
  try {
    const token = req.headers['authorization']
    const {
      data: {user}, 
    } = await supabase().auth.getUser(token)

    const newMsg = req.body as Message
    const chat = await prisma.chat.findFirst({
      where:{
        OR:[
          {
          senderId: user?.id,
          receiverId: req.params.receiverId
          },
        {
          senderId: req.params.receiverId,
          receiverId: user?.id
        }]
      }
    })

    const updatedChat = await prisma.chat.update({
      where: {
        OR:[
          {
          senderId: user?.id,
          receiverId: req.params.receiverId
          },
          {
            senderId: req.params.receiverId,
            receiverId: user?.id
          }
        ]
      },
      data: {
        Message: {
          connect: {
            id: newMsg.id
          }
        }
      }
    })
  } catch (error) {}
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
    console.log('Server started')
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

start()
