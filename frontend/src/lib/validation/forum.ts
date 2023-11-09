import * as z from 'zod'

export const createForumPostSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.',
    })
    .max(50, {
      message: 'Title must not be longer than 50 characters.',
    }),

  description: z
    .string()
    .min(10, {
      message: 'Content must be at least 10 characters.',
    })
    .max(500, {
      message: 'Content must not be longer than 500 characters.',
    }),
})

export const createPostCommentSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: 'Content must be at least 10 characters.',
    })
    .max(500, {
      message: 'Content must not be longer than 500 characters.',
    }),
})
