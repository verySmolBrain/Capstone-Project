import Fastify, { FastifyRequest } from 'fastify'
import 'dotenv/config'
import { getChat, getChats, sendMessage, updateChat } from './chat'
import { isStringObject } from 'util/types'
import { requestHandler, supabase, getUserId } from '@Source/utils/PrismaHandler'

const fastify = Fastify({
  logger: true,
})

// create user AND profile
fastify.post('/createUser', async (req: FastifyRequest<{ Body: { name: string } }>, reply) => {
  try {
    const token = req.headers['authorization']

    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }

    const userId = await getUserId(token)

    const { name } = req.body
    const prisma = await requestHandler(token)

    const user = await prisma.user.create({
      data: {
        id: userId,
        profile: {
          create: {
            name: name,
            description: 'im such a goomba',
            image: 'thisisaurl',
            collection: {},
            achievements: {},
            sales: {},
            purchases: {},
            reputation: 69,
          },
        },
      },
    })
    reply.send(user)
  } catch (error) {
    reply.status(500).send({ error: error })
  }
})

// get user profile
fastify.get('/profile', async (req, reply) => {
  try {
    const token = req.headers['authorization']
    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }
    
    const prisma = await requestHandler(token)

    const profile = await prisma.profile.findFirst({})
    reply.send(profile)
  } catch (error) {
    reply.status(500).send({ error: error })
  }
})

// change name of user
fastify.put(
  '/changeName',
  async (req: FastifyRequest<{ Body: { name: string } }>, reply) => {
    try {
      const token = req.headers['authorization']

      if (!token) {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const { name } = req.body
      const prisma = await requestHandler(token)

      const nameExists = await prisma.profile.findFirst({
        where: { name: name },
      })
      if (nameExists) {
        reply.status(403).send({ error: 'Name is already taken' })
        return
      }

      const changedName = await prisma.profile.updateMany({
        data: {
          name: name,
        },
      })
      reply.send(changedName)
    } catch (error) {
      reply.status(500).send({ error: error })
    }
  }
)

// change description of user profile
fastify.put(
  '/changeDescription',
  async (req: FastifyRequest<{ Body: { description: string } }>, reply) => {
    try {
      const token = req.headers['authorization']

      if (!token) {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const { description } = req.body
      const prisma = await requestHandler(token)

      const changedDescription = await prisma.profile.updateMany({
        data: {
          description: description,
        },
      })
      reply.send(changedDescription)
    } catch (error) {
      reply.status(500).send({ error: error })
    }
  }
)

// change image of user profile
fastify.put(
  '/changeImage',
  async (req: FastifyRequest<{ Body: { image: string } }>, reply) => {
    try {
      const token = req.headers['authorization']

      if (!token) {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const { image } = req.body
      const prisma = await requestHandler(token)

      const changedImage = await prisma.profile.updateMany({
        data: {
          image: image,
        },
      })
      reply.send(changedImage)
    } catch (error) {
      reply.status(500).send({ error: error })
    }
  }
)

// get wishlist
fastify.get('/wishlist', async (req: FastifyRequest<{ Body: { collectableId: string } }>, reply) => {
  try {
    const token = req.headers['authorization']

    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }

    const prisma = await requestHandler(token)

    const user = await prisma.user.findFirst()

    const collectables = await prisma.collectable.findMany({
      where: {
        wishlist: {some: { id: user?.id }}
      }
    })
    reply.send(collectables)
  } catch (error) {
    reply.status(500).send({ error: error })
  }
})

// add collectable to wishilist
fastify.put(
  '/addToWishlist',
  async (req: FastifyRequest<{ Body: { collectableId: string } }>, reply) => {
    try {
      const token = req.headers['authorization']

      if (!token) {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const { collectableId } = req.body
      const prisma = await requestHandler(token)

      const collectableExists = await prisma.collectable.findFirst({
        where: { id: collectableId },
      })
      if (!collectableExists) {
        reply.status(404).send({ error: 'Collectable does not exist' })
        return
      }

      const user = await prisma.user.findFirst()
      const collectable = await prisma.profile.update({
        where: { id: user?.id },
        data: {
          wishlist: {
            connect: { id: collectableId },
          },
        },
      })
      reply.send(collectable)
    } catch (error) {
      reply.status(500).send({ error: error })
    }
  }
)

// remove collectable from wishlist
fastify.delete(
  '/removeFromWishlist',
  async (req: FastifyRequest<{ Body: { collectableId: string } }>, reply) => {
    try {
      const token = req.headers['authorization']

      if (!token) {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const { collectableId } = req.body
      const prisma = await requestHandler(token)

      const collectableExists = await prisma.collectable.findFirst({
        where: { id: collectableId },
      })
      if (!collectableExists) {
        reply.status(404).send({ error: 'Collectable does not exist' })
        return
      }

      const user = await prisma.user.findFirst()
      const collectable = await prisma.profile.update({
        where: { id: user?.id },
        data: {
          wishlist: {
            disconnect: { id: collectableId },
          },
        },
      })
      reply.send(collectable)
    } catch (error) {
      reply.status(500).send({ error: error })
    }
  }
)

// get wares
fastify.get('/wares', async (req: FastifyRequest<{ Body: { collectableId: string } }>, reply) => {
  try {
    const token = req.headers['authorization']

    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }

    const prisma = await requestHandler(token)

    const user = await prisma.user.findFirst()
    const collectables = await prisma.collectable.findMany({
      where: {
        wares: {some: { id: user?.id }}
      }
    })
    reply.send(collectables)
  } catch (error) {
    reply.status(500).send({ error: error })
  }
})

// add collectable to wares
fastify.put(
  '/addToWares',
  async (req: FastifyRequest<{ Body: { collectableId: string } }>, reply) => {
    try {
      const token = req.headers['authorization']

      if (!token) {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const { collectableId } = req.body
      const prisma = await requestHandler(token)

      const collectableExists = await prisma.collectable.findFirst({
        where: { id: collectableId },
      })
      if (!collectableExists) {
        reply.status(404).send({ error: 'Collectable does not exist' })
        return
      }

      const user = await prisma.user.findFirst()
      const collectable = await prisma.profile.update({
        where: { id: user?.id },
        data: {
          wares: {
            connect: { id: collectableId },
          },
        },
      })
      reply.send(collectable)
    } catch (error) {
      reply.status(500).send({ error: error })
    }
  }
)

// remove collectable from wares
fastify.delete(
  '/removeFromWares',
  async (req: FastifyRequest<{ Body: { collectableId: string } }>, reply) => {
    try {
      const token = req.headers['authorization']

      if (!token) {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const { collectableId } = req.body
      const prisma = await requestHandler(token)

      const collectableExists = await prisma.collectable.findFirst({
        where: { id: collectableId },
      })
      if (!collectableExists) {
        reply.status(404).send({ error: 'Collectable does not exist' })
        return
      }

      const user = await prisma.user.findFirst()
      const collectable = await prisma.profile.update({
        where: { id: user?.id },
        data: {
          wares: {
            disconnect: { id: collectableId },
          },
        },
      })
      reply.send(collectable)
    } catch (error) {
      reply.status(500).send({ error: error })
    }
  }
)

// get collection
fastify.get('/collection', async (req: FastifyRequest<{ Body: { collectableId: string } }>, reply) => {
  try {
    const token = req.headers['authorization']

    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }

    const prisma = await requestHandler(token)

    const user = await prisma.user.findFirst()

    const collectables = await prisma.collectable.findMany({
      where: {
        collection: {some: { id: user?.id }}
      }
    })
    reply.send(collectables)
  } catch (error) {
    reply.status(500).send({ error: error })
  }
})

// add collectable to collection
fastify.put('/addToCollection', async (req: FastifyRequest<{ Body: { collectableId: string } }>, reply) => {
  try {
    const token = req.headers['authorization']

    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }

    const { collectableId } = req.body;
    const prisma = await requestHandler(token)

    const collectableExists = await prisma.collectable.findFirst({
      where: { id: collectableId },
    })
    if (!collectableExists) {
      reply.status(404).send({ error: 'Collectable does not exist' })
      return
    }

    const user = await prisma.user.findFirst()
    const collectable = await prisma.profile.update({
      where: {id: user?.id},
      data: {
        collection: {
          connect: { id: collectableId }
        },
      },
    })
    reply.send(collectable)
  } catch (error) {
    reply.status(500).send({ error: error })
  }
})

// remove collectable from collection
fastify.delete('/removeFromCollection', async (req: FastifyRequest<{ Body: { collectableId: string } }>, reply) => {
  try {
    const token = req.headers['authorization']

    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }

    const { collectableId } = req.body;
    const prisma = await requestHandler(token)

    const collectableExists = await prisma.collectable.findFirst({
      where: { id: collectableId },
    })
    if (!collectableExists) {
      reply.status(404).send({ error: 'Collectable does not exist' })
      return
    }

    const user = await prisma.user.findFirst()
    const collectable = await prisma.profile.update({
      where: {id: user?.id},
      data: {
        collection: {
          disconnect: { id: collectableId }
        },
      },
    })
    reply.send(collectable)
  } catch (error) {
    reply.status(500).send({ error: error })
  }
})

fastify.put(
  '/chat/:receiverId',
  async (req: FastifyRequest<{ Params: { receiverId: string } }>, reply) => {
    try {
      const token = req.headers['authorization']

      const { data: { user } } = await supabase().auth.getUser(token)
      const { receiverId } = req.params

      if (!token || !user?.id) {
        console.log(token)
        console.log(user?.id)
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }
      reply.send(updateChat(token, user?.id, receiverId))
    } catch (error) {
      console.log(error)
      reply.status(500).send({ error: error })
    }
  }
)

// API endpoint for retrieving a specific chat with a user
fastify.get('/chat/:receiverId', async (req: FastifyRequest<{ Params: { receiverId: string } }>, reply) => {
  try {
    const token = req.headers['authorization']
    const { receiverId } = req.params
    const { data: { user } } = await supabase().auth.getUser(token)

    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }
    reply.send(getChat(token, user?.id, receiverId))
  } catch (error) {
    reply.status(500).send({ error: error })
  }
})

// API endpoint for retrieving chats of a user from the database
fastify.get('/chats', async (req, reply) => {
  try {
    const token = req.headers['authorization']

    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }

    const { data: { user } } = await supabase().auth.getUser(token)
    reply.send(getChats(token, user?.id))
  } catch (error) {
    reply.status(500).send({ error: error })
  }
})

// API endpoint for updating chat
fastify.put('/chat/update/:receiverId', async (req: FastifyRequest<{ Params: { receiverId: string } }>, reply) => {
  try {
    const token = req.headers['authorization']
    const { receiverId } = req.params

    const {
      data: {user}, 
    } = await supabase().auth.getUser(token)

    const messageContents = req.body as string
    reply.send(sendMessage(token, user?.id, receiverId, messageContents))
  } catch (error) {
    reply.status(500).send({error: error})
  }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3001 })
    console.log('Server started')
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

start()
