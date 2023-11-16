import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'
import { Status } from '@prisma/client'

/*
   * GET /trade/sell
   * returns all sell offer trades of a user
   * @param {string} query
   * @returns {object} trades
  */
describe('/trade/sell - GET', () => {
  it('Successfully trade - return 200', async () => {

    prismaMockInstance.trade.findUnique.mockResolvedValue(null)

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/trade/sell',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })
    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })
})




/*
 * GET /trade/buy
 * returns a trade by id
 * @param {string} id
 * @returns {object} trade
 */

describe('/trade/buy - GET', () => {
  it('Successfully trade - return 200', async () => {

    prismaMockInstance.trade.findUnique.mockResolvedValue(null)
    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/trade/buy',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })
    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })
})

  /*
   * GET /trade/history
   * returns all sell offer trades of a user
   * @param {string} query
   * @returns {object} trades
   */

describe('/trade/history - GET', () => {
  it('Successfully retrieve history - return 200', async () => {
    const trades= [
      {
          collectable: {
              name: "Rare Coin",
              image: "coin.jpg",
              tags: ["numismatic", "rare"],
          },
          seller: {
              id: "seller1",
              name: "John Seller",
              description: "Experienced collector",
              image: "john_seller.jpg",
              reputation: 4.8,
          },
          buyer: {
              id: "buyer1",
              name: "Alice Buyer",
              description: "Enthusiastic collector",
              image: "alice_buyer.jpg",
              reputation: 4.5,
          },
      },
      {
          collectable: {
              name: "Vintage Stamp",
              image: "stamp.jpg",
              tags: ["philatelic", "vintage"],
          },
          seller: {
              id: "seller2",
              name: "Jane Seller",
              description: null,
              image: null,
              reputation: 4.2,
          },
          buyer: {
              id: "buyer2",
              name: "Bob Buyer",
              description: "Stamp lover",
              image: "bob_buyer.jpg",
              reputation: 4.0,
          },
      },
  ];
  // @ts-expect-error: testing only necessary fields
    prismaMockInstance.trade.findMany.mockResolvedValue(trades)
    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/trade/history',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })
    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })
})


/** 
   * POST /trade
   * creates a trade
   * @param {string} buyerId
   * @param {string} sellerId
   * @param {string} collectableId
   * @param {number} price
   * @returns {object} trade
*/

   describe('/trade - POST', () => {
    it('Self trade - return 400', async () => {
      const trade: {
        collectable: {
            name: string;
            image: string | null;
            tags: string[];
        };
        seller: {
            id: string;
            name: string;
            description: string | null;
            image: string | null;
            reputation: number;
        };
        buyer: {
            id: string;
            name: string;
            description: string | null;
            image: string | null;
            reputation: number;
        };
    } & {
        additionalProperty: string; // Add your additional properties here
    } = {
        collectable: {
            name: "Rare Coin",
            image: "coin.jpg",
            tags: ["numismatic", "rare"],
        },
        seller: {
            id: "seller1",
            name: "John Seller",
            description: "Experienced collector",
            image: "john_seller.jpg",
            reputation: 4.8,
        },
        buyer: {
            id: "buyer1",
            name: "Alice Buyer",
            description: "Enthusiastic collector",
            image: "alice_buyer.jpg",
            reputation: 4.5,
        },
        additionalProperty: "Additional data for the trade",
        // Add more additional properties as needed
    };  
  
      prismaMockInstance.collectableCount.findFirst.mockResolvedValue(null)
      // @ts-expect-error: testing only necessary fields 
      prismaMockInstance.trade.create.mockResolvedValue(trade)
  
      const app = await build({})
      const response = await app.inject({
        method: 'POST',
        url: '/trade',
        headers: {
          Authorization: 'Bearer your-token-here',
        },
        body: {
          userID: 'a',
          collectableId: 'string',
          price: 'a',
          sellOrBuy: true
        }
      })

      expect(response.statusCode).toBe(400)
      await app.close()
    })

    it('Self trade - return 400', async () => {

      const c = {
        id: 1,
        name: "Rare Coin",
        count: 5,
        inventoryId: "user1",
        wishlistId: null,
        waresId: "wares1",
        // Add more properties as needed
    };
      const trade: {
        collectable: {
            name: string;
            image: string | null;
            tags: string[];
        };
        seller: {
            id: string;
            name: string;
            description: string | null;
            image: string | null;
            reputation: number;
        };
        buyer: {
            id: string;
            name: string;
            description: string | null;
            image: string | null;
            reputation: number;
        };
    } & {
        additionalProperty: string; // Add your additional properties here
    } = {
        collectable: {
            name: "Rare Coin",
            image: "coin.jpg",
            tags: ["numismatic", "rare"],
        },
        seller: {
            id: "seller1",
            name: "John Seller",
            description: "Experienced collector",
            image: "john_seller.jpg",
            reputation: 4.8,
        },
        buyer: {
            id: "buyer1",
            name: "Alice Buyer",
            description: "Enthusiastic collector",
            image: "alice_buyer.jpg",
            reputation: 4.5,
        },
        additionalProperty: "Additional data for the trade",
        // Add more additional properties as needed
    };  
  
      prismaMockInstance.collectableCount.findFirst.mockResolvedValue(c)
      // @ts-expect-error: testing only necessary fields 
      prismaMockInstance.trade.create.mockResolvedValue(trade)
  
      const app = await build({})
      const response = await app.inject({
        method: 'POST',
        url: '/trade',
        headers: {
          Authorization: 'Bearer your-token-here',
        },
        body: {
          userID: 'a',
          collectableId: 'string',
          price: 'a',
          sellOrBuy: true
        }
      })

      expect(response.statusCode).toBe(200)
      expect(response.statusMessage).toBe('OK')
      await app.close()
    })
  })
    /*
   * PUT /trade/status/:id/:status
   * updates a trade's status by id
   * @param {string} id
   * @param {string} status
   * @returns {object} trade
   */


describe('/trade/status/:id/:status - PUT', () => {
  it('Update Accepted - return 200', async () => {

    const trade = {
      id: 1,
      sellerId: "seller123",
      buyerId: "buyer456",
      collectableName: "Rare Coin",
      status: "Pending",
      price: 100,
      createdAt: new Date(),
      buyerConfirmed: false,
      sellerConfirmed: true,
    };
    
    // @ts-expect-error: testing only necessary fields 
    prismaMockInstance.trade.findUniqueOrThrow.mockResolvedValue(trade)
    // @ts-expect-error: testing only necessary fields 
    prismaMockInstance.trade.update.mockResolvedValue(trade)

    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/trade/status/:id/ACCEPTED',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        id: 'a',
        status: 'ACCEPTED'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })
  it('Update  trade - return 200', async () => {

    const trade = {
      id: 1,
      sellerId: "seller123",
      buyerId: "buyer456",
      collectableName: "Rare Coin",
      status: "Pending",
      price: 100,
      createdAt: new Date(),
      buyerConfirmed: false,
      sellerConfirmed: true,
    };
    
    // @ts-expect-error: testing only necessary fields 
    prismaMockInstance.trade.findUniqueOrThrow.mockResolvedValue(trade)
    // @ts-expect-error: testing only necessary fields 
    prismaMockInstance.trade.update.mockResolvedValue(null)



    const app = await build({})
    const response = await app.inject({
      method: 'PUT',
      url: '/trade/status/:id/a',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        id: 'a',
        status: 'ACCEPTED'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })
})

describe('/trade:collectableName', () => {
  it('Successfully trade - return 200', async () => {
    const app = await build({})
    // @ts-expect-error only populating necessary fields
    prismaMockInstance.trade.findMany.mockResolvedValue([{
      status: Status.FINISHED, 
      collectableName: 'yabba', 
      createdAt: new Date(2023, 10),
      price: 69
    },
    // @ts-expect-error only populating necessary fields
    { status: Status.FINISHED,
      collectableName: 'yabba',
      createdAt: new Date(2023, 11),
      price: 96
    }])

    const response = await app.inject({
      method: 'GET',
      url: '/trade/:collectableName',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
      query: {
        name: 'a'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.statusMessage).toBe('OK')
    await app.close()
  })
})
