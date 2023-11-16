import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'

/*
   *  POST /forum/:campaignName/post
   *  Creates a post in the campaign forum
   *  @returns {object} chat
*/
describe('/:campaignName/forum - POST', () => {
  it('Successfully creates post - return 200', async () => {

    const newPost = {
        comments: [
          {
            id: 1,
            parentCommentId: null,
            postId: 123,
            authorId: "user1",
            content: "This is a great post!",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            parentCommentId: 1,
            postId: 123,
            authorId: "user2",
            content: "I agree, well written!",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        author: {
          user: {
            id: "user1",
            role: "Author",
          },
        },
      };
    //@ts-expect-error: only testing the necessary fields 
    prismaMockInstance.post.create.mockResolvedValueOnce(newPost)

    const app = await build({})
    const response = await app.inject({
      method: 'POST',
      url: '/:campaignName/forum',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      body: {
        title: 'Yabbin',
        description: 'aaaa',
        image: 'aaaa',
        tags: ['aaaa'],
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body.startsWith("{\"comments\":[{\"id\":1,\"parentCommentId\":null,\"postId\":123,\"authorId\":\"user1\",\"content\":\"T")).toBe(true)
    await app.close()
  })
})


  /*
   *  GET /forum/:campaignName
   *  Returns all posts in the campaign forum
   *  @returns {object} chat
   */
describe('/forum/:campaignName - POST', () => {
  it('Successfully retrieves post - return 200', async () => {

    const newPost = {
        comments: [
          {
            id: 1,
            parentCommentId: null,
            postId: 123,
            authorId: "user1",
            content: "This is a great post!",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            parentCommentId: 1,
            postId: 123,
            authorId: "user2",
            content: "I agree, well written!",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        author: {
          user: {
            id: "user1",
            role: "Author",
          },
        },
      };
    //@ts-expect-error: only testing the necessary fields 
    prismaMockInstance.post.create.mockResolvedValueOnce(newPost)

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/:campaignName/forum',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      body: {
        title: 'Yabbin',
        description: 'aaaa',
        image: 'aaaa',
        tags: ['aaaa'],
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })
})


/*
*  GET /forum/:postId
*  Returns a post in the campaign forum given an id
*  @returns {object} chat
*/
describe('/forum/:postId - GET', () => {
it('Successfully retrieves post - return 200', async () => {
    const newPost = {
        comments: [
        {
            id: 1,
            parentCommentId: null,
            postId: 123,
            authorId: "user1",
            content: "This is a great post!",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            parentCommentId: 1,
            postId: 123,
            authorId: "user2",
            content: "I agree, well written!",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        ],
        author: {
        user: {
            id: "user1",
            role: "Author",
        },
        },
    };
    //@ts-expect-error: only testing the necessary fields 
    prismaMockInstance.post.findUnique.mockResolvedValueOnce(newPost)

    const app = await build({})
    const response = await app.inject({
    method: 'GET',
    url: '/forum/:postId',
    headers: {
        Authorization: 'Bearer your-token-here',
    },
    query: {
        campaignName: 'string',
        postId: 'string'
    },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
    })
})

  /*
   *  POST /forum/:postId
   *  Sends a message to the campaign forum
   *  @returns {object} chat
   */
describe('/forum/:postId - POST', () => {
    it(' Sends a message to the campaign forum - return 200', async () => {
        const newPost = {

            id: 1,
            parentCommentId: null,
            postId: 123,
            authorId: "user1",
            content: "This is a great post!",
            createdAt: new Date(),
            updatedAt: new Date(),
            author: {
            user: {
                id: "user1",
                role: "Author",
            },
            },
        };

        prismaMockInstance.comment.create.mockResolvedValueOnce(newPost)
    
        const app = await build({})
        const response = await app.inject({
        method: 'POST',
        url: '/forum/:postId',
        headers: {
            Authorization: 'Bearer your-token-here',
        },
        body: {
            description: 'a'
        }
        })
    
        expect(response.statusCode).toBe(200)
        expect(response.statusMessage).toBe('OK')
        await app.close()
    })
    })
/*
   *  POST /forum/report/:commentId
   *  Reports a comment on a post
   *  @returns {object} report
*/

describe('/forum/report/:commentId - POST', () => {
    it(' Reports a comment on a post- return 200', async () => {
        const currReport = {
            commentId: 1,
            reportingUsers: []
        } 
        // @ts-expect-error: only testing necessary fields
        prismaMockInstance.comment.create.mockResolvedValueOnce(currReport)
    
        const app = await build({})
        const response = await app.inject({
        method: 'POST',
        url: '/forum/report/:commentId',
        headers: {
            Authorization: 'Bearer your-token-here',
        },
        query: {
            commentId: 'a'
        },
        body: {
            description: 'a'
        }
        })
    
        expect(response.statusCode).toBe(200)
        expect(response.statusMessage).toBe('OK')
        await app.close()
    })
})
  /*
   *  GET /forum/reports/:commentId
   *  Gets the number of reports on a comment
   *  @returns {object} report
   */

describe('/forum/reports/:commentId - GET', () => {
    it(' Gets the number of reports on a comment - return 200', async () => {
        const commentWithReports: ({
            reports: {
                commentId: number;
                reportingUsers: string[];
            }[];
        } & {
            id: number;
            parentCommentId: number | null;
            postId: number;
            authorId: string;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        }) | null = {
            reports: [
                {
                    commentId: 1,
                    reportingUsers: ["user1", "user2"],
                },
                // Add more reports as needed
            ],
            id: 123,
            parentCommentId: null,
            postId: 456,
            authorId: "author123",
            content: "This is a great comment!",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        prismaMockInstance.comment.findUnique.mockResolvedValueOnce(commentWithReports)
    
        const app = await build({})
        const response = await app.inject({
        method: 'GET',
        url: '/forum/reports/:commentId',
        headers: {
            Authorization: 'Bearer your-token-here',
        },
        query: {
            commentId: 'a'
        },
        body: {
            description: 'a'
        }
        })
    
        expect(response.statusCode).toBe(200)
        expect(response.statusMessage).toBe('OK')
        await app.close()
    })
    it(' Gets the number of reports on a comment (No reports) - return 200', async () => {

        prismaMockInstance.comment.findUnique.mockResolvedValueOnce(null)
    
        const app = await build({})
        const response = await app.inject({
        method: 'GET',
        url: '/forum/reports/:commentId',
        headers: {
            Authorization: 'Bearer your-token-here',
        },
        query: {
            commentId: 'a'
        },
        body: {
            description: 'a'
        }
        })
    
        expect(response.statusCode).toBe(200)
        expect(response.statusMessage).toBe('OK')
        await app.close()
    })
})

  /*
   *  GET /comment/reports
   *  Gets a list of reported comments
   *  @returns {object}[] report array
   */

  describe('/forum/reports/:commentId - GET', () => {
    it(' Gets a list of reported comments - return 200', async () => {
        const commentReports = [
            {commentId: 1,
            reportingUsers: []},
        ]

        const comm = {
          id: 123,
          parentCommentId: null,
          postId: 456,
          authorId: "author123",
          content: "This is a great comment!",
          createdAt: new Date(),
          updatedAt: new Date(),
      };

        prismaMockInstance.comment.findFirst.mockResolvedValueOnce(comm)

        prismaMockInstance.commentReports.findMany.mockResolvedValueOnce(commentReports)
    
        const app = await build({})
        const response = await app.inject({
        method: 'GET',
        url: '/comment/reports',
        headers: {
            Authorization: 'Bearer your-token-here',
        },
        })
    
        expect(response.statusCode).toBe(200)
        expect(response.statusMessage).toBe('OK')
        await app.close()
    })
    it(' Gets a list of reported comments - return 200', async () => {
        const commentReports = [
            {commentId: 1,
            reportingUsers: []},
            {commentId: 1,
            reportingUsers: []},
            {commentId: 1,
            reportingUsers: []},
        ]
        prismaMockInstance.profile.findFirst.mockResolvedValueOnce({
            id: 'double',
            name: 'New name',
            description: null,
            image: null,
            reputation: 1,
            banned: false,
          })
      
        prismaMockInstance.commentReports.findMany.mockResolvedValueOnce(commentReports)
    
        const app = await build({})
        const response = await app.inject({
        method: 'GET',
        url: '/comment/reports',
        headers: {
            Authorization: 'Bearer your-token-here',
        },
        })
    
        expect(response.statusCode).toBe(200)
        expect(response.statusMessage).toBe('OK')
        await app.close()
    })
})