import SupabaseService from '@Source/utils/Supabase.service'

jest.mock('@Source/utils/Supabase.service', () => ({
  getInstance: jest.fn().mockReturnValue({
    auth: {
      getUser: jest.fn().mockReturnValue({
        data: {
          user: {
            id: '123',
          },
        },
      }),
    },
  }),
}))

export const supabaseMock = SupabaseService as unknown as jest.Mocked<
  typeof SupabaseService
>
