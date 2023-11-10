import * as z from 'zod'

export const createTradeSchema = z.object({
  collectableId: z.string(),
  userId: z.string(),
  price: z
    .custom<number>()
    .refine((value) => value ?? false, 'Required')
    .refine((value) => Number.isFinite(Number(value)), 'Invalid number')
    .refine((value) => value > 0, 'Must be greater than 0')
    .refine((value) => value < 1000000, 'Must be less than 1,000,000'),
})
