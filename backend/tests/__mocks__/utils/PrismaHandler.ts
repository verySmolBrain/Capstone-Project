import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import { getUserId } from '@Source/utils/utils'
import SupabaseService from '@Source/utils/Supabase.service'

const prismaMock = mockDeep<PrismaClient>()

jest.mock('@Source/utils/supabaseUtils', () => ({
  requestHandler: jest.fn(() => Promise.resolve(prismaMock)),
  supabase: jest.fn(() => SupabaseService.getInstance()),
  validateUser: jest.fn(() => Promise.resolve(true)),
  extractId: jest.fn(() => '1'),
  getUserId: jest.fn(() => '1'),
  getChatId: jest.fn(() => 1),
}))

beforeEach(() => {
  mockReset(prismaMock)
  console.log = jest.fn()
})

export const prismaMockInstance = prismaMock as unknown as DeepMockProxy<typeof prismaMock>
export const getUserIdMock = getUserId as unknown as jest.MockedFunction<typeof getUserId>
