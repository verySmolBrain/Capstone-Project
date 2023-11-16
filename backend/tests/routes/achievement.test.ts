import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'

/*
* GET /achievement
* Returns all achievements
* @returns {object} achievements
*/
describe('/achievement - get', () => {
  it('Successfully retrieves achievements - return 200', async () => {
    const sampleAchievements = [
        {
          users: [
            {
              id: "3",
              name: "Bob Johnson",
              description: "Contributed to a project",
              image: "user3.jpg",
              reputation: 8,
            },
            {
              id: "4",
              name: "Alice Brown",
              description: "Helped others in the community",
              image: "user4.jpg",
              reputation: 12,
            },
          ],
          id: "achievement2",
          name: "Community Hero",
          description: "Recognizing outstanding contributions to the community",
          image: "achievement2.jpg",
        },
      ];
    
    prismaMockInstance.achievement.findMany.mockResolvedValue(sampleAchievements);

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/achievement',
      headers: {
        Authorization: 'yobba',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe("[{\"users\":[{\"id\":\"3\",\"name\":\"Bob Johnson\",\"description\":\"Contributed to a project\",\"image\":\"user3.jpg\",\"reputation\":8},{\"id\":\"4\",\"name\":\"Alice Brown\",\"description\":\"Helped others in the community\",\"image\":\"user4.jpg\",\"reputation\":12}],\"id\":\"achievement2\",\"name\":\"Community Hero\",\"description\":\"Recognizing outstanding contributions to the community\",\"image\":\"achievement2.jpg\"}]")
  })
})
/*
   * GET /achievement/:id
   * Returns an achievement by id
   * @returns {object} achievement
*/
describe('/achievement/:id - get', () => {
  it('Successfully retrieves achievements of a user - return 200', async () => {
    const sampleAchievements = 
        {
          users: [
            {
              id: "3",
              name: "Bob Johnson",
              description: "Contributed to a project",
              image: "user3.jpg",
              reputation: 8,
            },
            {
              id: "4",
              name: "Alice Brown",
              description: "Helped others in the community",
              image: "user4.jpg",
              reputation: 12,
            },
          ],
          id: "achievement2",
          name: "Community Hero",
          description: "Recognizing outstanding contributions to the community",
          image: "achievement2.jpg",
        };
    
    prismaMockInstance.achievement.findFirstOrThrow.mockResolvedValue(sampleAchievements);

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/achievement/:id',
      headers: {
        Authorization: 'yobba',
      },
      query: {
        id: 'aa'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    expect(response.body).toBe("{\"users\":[{\"id\":\"3\",\"name\":\"Bob Johnson\",\"description\":\"Contributed to a project\",\"image\":\"user3.jpg\",\"reputation\":8},{\"id\":\"4\",\"name\":\"Alice Brown\",\"description\":\"Helped others in the community\",\"image\":\"user4.jpg\",\"reputation\":12}],\"id\":\"achievement2\",\"name\":\"Community Hero\",\"description\":\"Recognizing outstanding contributions to the community\",\"image\":\"achievement2.jpg\"}")
  })
})

  /*
   * PUT /achievement/:id
   * Updates an achievement by id
   * @param {string} id
   * @param {string} name
   * @param {string} description
   * @param {string} image
   * @returns {object} achievement
   */
describe('/achievement/:id - PUT', () => {
    it('Successfully retrieves achievements of a user - return 200', async () => {
      const sampleAchievements = 
          {
            users: [
              {
                id: "3",
                name: "Bob Johnson",
                description: "Contributed to a project",
                image: "user3.jpg",
                reputation: 8,
              },
              {
                id: "4",
                name: "Alice Brown",
                description: "Helped others in the community",
                image: "user4.jpg",
                reputation: 12,
              },
            ],
            id: "achievement2",
            name: "Community Hero",
            description: "Recognizing outstanding contributions to the community",
            image: "achievement2.jpg",
          };
      
      prismaMockInstance.achievement.update.mockResolvedValue(sampleAchievements);
  
      const app = await build({})
      const response = await app.inject({
        method: 'PUT',
        url: '/achievement/:id',
        headers: {
          Authorization: 'yobba',
        },
        query: {
          id: 'aa'
        },
        body: {
            name: 'a',
            description: 'a',
            image: 'nobba'
        }
      })
  
      expect(response.statusCode).toBe(200)
      expect(response.statusMessage).toBe('OK')
      expect(response.body).toBe("{\"users\":[{\"id\":\"3\",\"name\":\"Bob Johnson\",\"description\":\"Contributed to a project\",\"image\":\"user3.jpg\",\"reputation\":8},{\"id\":\"4\",\"name\":\"Alice Brown\",\"description\":\"Helped others in the community\",\"image\":\"user4.jpg\",\"reputation\":12}],\"id\":\"achievement2\",\"name\":\"Community Hero\",\"description\":\"Recognizing outstanding contributions to the community\",\"image\":\"achievement2.jpg\"}")
    })
  })

/*
   * DELETE /achievement/:id
   * Deletes an achievement by id
   * @param {string} id
   * @returns {boolean} success
*/

  describe('/achievement/:id - DELETE', () => {
    it('Successfully retrieves achievements of a user - return 200', async () => {
      const sampleAchievements = 
          {
            id: "achievement2",
            name: "Community Hero",
            description: "Recognizing outstanding contributions to the community",
            image: "achievement2.jpg",
          };
      
      prismaMockInstance.achievement.delete.mockResolvedValue(sampleAchievements);
  
      const app = await build({})
      const response = await app.inject({
        method: 'DELETE',
        url: '/achievement/:id',
        headers: {
          Authorization: 'yobba',
        },
        query: {
          id: 'aa'
        },
        body: {
            name: 'a',
            description: 'a',
            image: 'nobba'
        }
      })
  
      expect(response.statusCode).toBe(200)
      expect(response.statusMessage).toBe('OK')
      expect(response.body).toBe("{\"id\":\"achievement2\",\"name\":\"Community Hero\",\"description\":\"Recognizing outstanding contributions to the community\",\"image\":\"achievement2.jpg\"}"
      )
    })
  })
