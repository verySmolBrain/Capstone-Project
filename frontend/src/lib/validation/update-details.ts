import * as z from 'zod'

export const usernameUpdateSchema = z.object({
  name: z.string(),
})

export const profilePictureUpdateSchema = z.object({
  picture: z
    .any()
    .refine((file) => file?.size < 1000000, 'File size must be less than 1MB.')
    .refine(
      (file) => ['image/png', 'image/jpg', 'image/jpeg'].includes(file?.type),
      'File type must be .png, .jpg, or .jpeg.'
    ),
})

export const descriptionUpdateSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
})

export const emailUpdateSchema = z.object({
  email: z.string().email(),
})

export const passwordUpdateSchema = z.object({
  password: z.string().min(8),
})
