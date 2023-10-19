import { PrismaClient, Role } from '@prisma/client'
import { build } from '@Source/app'
import { requestHandler, supabase } from '@Source/utils/supabaseUtils'
import { generateUsername } from '@Source/utils/utils'
import { generateUsernameMock, prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

afterEach(() => {
  mockReset(requestHandler)

  // ...
})


describe('/user', () => {

  it('Successful creation of a user - return 200', async () => {
    prismaMockInstance.user.create.mockResolvedValueOnce(
      {
        id: 'Sticky man',
        role: Role.USER,
      },
    )
    // prismaMockInstance.profile.findUnique.mockResolvedValueOnce(
    //   {
    //     id: 'Sticky man',
    //     name: 'Sticky man',
    //     description: 'string',
    //     image: 'string',
    //     reputation: 1
    //   },
    // )


    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/user',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe("{\"id\":\"Sticky man\",\"role\":\"USER\"}");

    await app.close();


  })

})


describe('/usser', () => {


  it('get', async () => {

    
    const app = await build({})

    prismaMockInstance.profile.findUniqueOrThrow.mockResolvedValueOnce({
      id: 'double',
      name: 'stringadsf',
      description: null,
      image: null,
      reputation: 1
    })
    
    const response1 = await app.inject({
    method: 'GET',
    url: '/profile',
    headers: {
      Authorization: 'double',
    },
  })

  expect(response1.statusCode).toBe(200)
  expect(response1.statusMessage).toBe('OK')
  })

})
