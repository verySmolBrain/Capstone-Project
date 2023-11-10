import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'
import * as utils from '@Source/utils/supabaseUtils'


/*
  *  POST /chat/:receiverName
  *  Creates a chat between current user and user with receiverName
*/
describe('/chat:receiverName', () => {
  it('Successful chat creation - return 200', async () => {
    prismaMockInstance.chat.findFirst.mockResolvedValueOnce({
      id: 3
    })

    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/chat/:receiverName',
      headers: {
        Authorization: 'double',
      },
      query: {
        receiverName: 'a'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe("{\"id\":3}")
  })

  it('Successful chat creation (empty old chat) - return 200', async () => {
    prismaMockInstance.chat.findFirst.mockResolvedValueOnce(null)
    prismaMockInstance.chat.create.mockResolvedValueOnce({id: 4})

    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/chat/:receiverName',
      headers: {
        Authorization: 'double',
      },
      query: {
        receiverName: 'a'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe("{\"id\":4}")
  })

  it('Chat creation message Oneself Error - return 400', async () => {
    prismaMockInstance.chat.findFirst.mockResolvedValueOnce({
      id: 3
    })
    const spy = jest.spyOn(utils, 'extractId')
    spy.mockReturnValue('double');

    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/chat/:receiverName',
      headers: {
        Authorization: 'double',
      },
      query: {
        receiverName: 'double'
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
  })

  it('Empty token error - return 401', async () => {
    prismaMockInstance.chat.findFirst.mockResolvedValueOnce({
      id: 3
    })

    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/chat/:receiverName',
      headers: {
        Authorization: '',
      },
      query: {
        receiverName: 'double'
      }
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')

  })
})

/*
  *  GET /chat/:receiverName
  *  Returns a chat between current user and user with receiverName
*/
//* Need to test case where there are no messages to be found between two users and its error handling
describe('/chat:receiverName', () => {
  it('Successfuly gets chat between users - return 200', async () => {
    prismaMockInstance.chat.findFirst.mockResolvedValueOnce({
      id: 3
    })
    prismaMockInstance.chat.findFirstOrThrow.mockResolvedValue(
      {
        id: 1,
        // @ts-expect-error findMany generates type based on query so it will error
        messages: [
          {
            id: 1,
            chatId: 1,
            senderId: 'sender1',
            content: 'Hello',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      }
    )

    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
    })

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/chat/:receiverName',
      headers: {
        Authorization: 'double',
      },
      query: {
        receiverName: 'a'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("{\"messages\":[{\"type\":1,\"content\":\"Hello\",")).toBe(true)
  })

  it('Empty token error - return 401', async () => {

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/chat/:receiverName',
      headers: {
        Authorization: '',
      },
      query: {
        receiverName: 'double'
      }
    })

    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')

  })

})

/*
  *  GET /chat
  *  Returns all chats of a user
*/
describe('/chat', () => {
  it('Getting user message - 200', async () => {
    prismaMockInstance.chat.findMany.mockResolvedValueOnce([
      {
        id: 1,
        // @ts-expect-error findMany generates type based on query so it will error
        users: [{ sender: 1 }],
        messages: {
          id: 1,
          chatId: 1,
          senderId: 'sender',
          content: 'Hello',
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: [],
        },
      },
    ])

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/chat',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe("{\"chats\":[{\"id\":1,\"receiver\":{\"sender\":1}}]}")
  })

  it('Empty token - 401', async () => {
    prismaMockInstance.chat.findMany.mockResolvedValueOnce([
      {
        id: 1,
        // @ts-expect-error findMany generates type based on query so it will error
        users: [{ sender: 1 }],
        messages: {
          id: 1,
          chatId: 1,
          senderId: 'sender',
          content: 'Hello',
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: [],
        },
      },
    ])
  
    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/chat',
      headers: {
        Authorization: '',
      },
    })
  
    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
  })
})

/*
  *  PUT /chat/send/:receiverName
  *  Sends a message to user with receiverName
*/
describe('/chat/send/:receiverName', () => {
  it('Getting user message - 200', async () => {
    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1,
    })

    prismaMockInstance.chat.findMany.mockResolvedValueOnce([
      {
        id: 1,
        // @ts-expect-error findMany generates type based on query so it will error
        users: [{ sender: 1 }],
        messages: {
          id: 1,
          chatId: 1,
          senderId: 'sender',
          content: 'Hello',
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: [],
        },
      },
    ])
    prismaMockInstance.chat.update.mockResolvedValue({
        id: 1,
        // @ts-expect-error findMany generates type based on query so it will error
        messages: [
          {
            id: 1,
            chatId: 1,
            senderId: 'yabba',
            content: 'yabbin time',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      }
    )
    prismaMockInstance.chat.findFirstOrThrow.mockResolvedValue({id: 1,})

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/chat/send/:receiverName',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        receiverName: 'yabba'
      }, 
      body: {
        messageContents: 'yabbin time'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.startsWith("{\"id\":1,\"messages\":[{\"id\":1,\"chatId\":1,\"senderId\":\"yabba\"")).toBe(true)

  })

  it('Empty token - 401', async () => {

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/chat/send/:receiverName',
      headers: {
        Authorization: '',
      },
    })
  
    expect(response.statusCode).toBe(401)
    expect(response.statusMessage).toBe('Unauthorized')
  })

  it('Aending and empty message - 400', async () => {

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/chat/send/:receiverName',
      headers: {
        Authorization: 'yo gabba gabba',
      },
      query: {
        receiverName: 'yabba'
      }, 
      body: {
        messageContents: ''
      }
    })
  
    expect(response.statusCode).toBe(400)
    expect(response.statusMessage).toBe('Bad Request')
  })
})