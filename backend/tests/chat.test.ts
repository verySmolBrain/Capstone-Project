// import { prismaMock } from '../singleton'
// import { getChats, getChat} from './chat'

// import { fastify } from '@Source/index'

// test('Getting a list of chats for a user', async () => {})

// test('PUT /chat/send/:receiverId should update chat', async () => {
//   const payload = {
//     messageContents: 'Hello, World!',
//   }

//   const response = await fastify.inject({
//     method: 'PUT',
//     url: '/chat/send/jin',
//     headers: {
//       Authorization:
//         'eyJhbGciOiJIUzI1NiIsImtpZCI6IlIxZXRKakE3cVdJaTBEK3UiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjk2NzU3OTY2LCJpYXQiOjE2OTY3NTQzNjYsImlzcyI6Imh0dHBzOi8vZmpnd2dpbHFua2tyZWdrd3lndXEuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjRiZTVhYTVlLTQyNDUtNDZlNi04NGVkLWVkMmM0MTBlN2M4MyIsImVtYWlsIjoicmFuZG9tbHlyYW5kYW11QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNjk2NzU0MzY2fV0sInNlc3Npb25faWQiOiJlOWQ1MzQxNS1iNGI3LTRhZWEtODEzMi02NmM3N2FjOTQ0NWYifQ.cRh0Ttb8-asXK4esDl0byyxOAyJ_MjWAHQxZmSP5J0g',
//     },
//     payload: payload,
//   })

//   expect(response.statusCode).toBe(200)
//   console.log(response)
// })

// curl -X PUT \
//   -H "Content-Type: application/json" \
//   -H "Authorization: eyJhbGciOiJIUzI1NiIsImtpZCI6IlIxZXRKakE3cVdJaTBEK3UiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjk2NzYxNjQxLCJpYXQiOjE2OTY3NTgwNDEsImlzcyI6Imh0dHBzOi8vZmpnd2dpbHFua2tyZWdrd3lndXEuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjRiZTVhYTVlLTQyNDUtNDZlNi04NGVkLWVkMmM0MTBlN2M4MyIsImVtYWlsIjoicmFuZG9tbHlyYW5kYW11QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNjk2NzU4MDQxfV0sInNlc3Npb25faWQiOiI1ZmY2NDJmMi1mZjA4LTQyMjItOWMwOS1mOTYzZTUzYTdhYjAifQ.czzxrOBxGhllU2G6sR3cXeoN1FAFKsnA2ILnmmb3O1w" \
//   -d '{"messageContents":"Hello, World!"}' \
//   localhost:3001/chat/send/jin
