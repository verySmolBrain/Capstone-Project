import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import { requestHandler, getUserId } from '@Source/utils/SupabaseUtils'
import SupabaseService from '@Source/utils/Supabase.service'

const prismaMock = mockDeep<PrismaClient>()

jest.mock('@Source/utils/PrismaHandler', () => ({
  requestHandler: jest.fn(() => Promise.resolve(prismaMock)),
  supabase: jest.fn(() => SupabaseService.getInstance()),
  getUserId: jest.fn(() => Promise.resolve('')),
}))

afterEach(() => {
  mockReset(requestHandler)
  mockReset(prismaMock)
  mockReset(getUserId)
})

export const prismaMockInstance = prismaMock as unknown as DeepMockProxy<
  typeof prismaMock
>
export const getUserIdMock = getUserId as unknown as jest.MockedFunction<
  typeof getUserId
>
