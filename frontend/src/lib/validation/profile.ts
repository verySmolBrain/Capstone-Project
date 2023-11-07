import * as z from 'zod'

export const reviewProfileDescriptionUpdateSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: 'Review must be at least 10 characters.',
    })
    .max(160, {
      message: 'Review must not be longer than 160 characters.',
    }),
})
