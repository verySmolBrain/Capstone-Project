import * as z from 'zod'

export const usernameUpdateSchema = z.object({
  name: z.string(),
})

const MAX_IMAGE_SIZE = 50000 // 50kb
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
  'image/svg+xml',
]

export const profilePictureUpdateSchema = z.object({
  image: z
    .custom<File>(
      (val) => val instanceof File,
      'Required to import at least one image'
    )
    .refine(
      (file) => Number(file.size) <= Number(MAX_IMAGE_SIZE),
      `File size should be less than 50kb`
    )
    .refine(
      (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
      'Only these types are allowed .jpg, .jpeg, .png, .svg and .webp'
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
