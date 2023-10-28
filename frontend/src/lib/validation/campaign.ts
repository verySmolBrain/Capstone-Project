import * as z from 'zod'

// const MAX_IMAGE_SIZE = 500000 // 500kb
// const ALLOWED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/png',
//   'image/webp',
//   'image/jpg',
//   'image/svg+xml',
// ]

export const createCampaignSchema = z.object({
  name: z.string().min(1),
  // image: z
  //   .custom<File>(
  //     (val) => val instanceof File,
  //     'Required to import at least one image'
  //   )
  //   .refine(
  //     (file) => Number(file.size) <= Number(MAX_IMAGE_SIZE),
  //     `File size should be less than 50kb`
  //   )
  //   .refine(
  //     (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
  //     'Only these types are allowed .jpg, .jpeg, .png, .svg and .webp'
  //   ),
  // start: z.date(),
  // end: z.date(),
})
