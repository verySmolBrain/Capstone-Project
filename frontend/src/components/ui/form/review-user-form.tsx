'use client'

import * as React from 'react'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewProfileDescriptionUpdateSchema } from '@/lib/validation/profile'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import { Rating } from '@smastrom/react-rating'
import * as z from 'zod'

type FormData = z.infer<typeof reviewProfileDescriptionUpdateSchema>

export function ReviewUserForm({
  rating,
  username,
  mutate,
  setOpen,
}: {
  rating: number
  username: string
  mutate: () => void
  setOpen: (open: boolean) => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(reviewProfileDescriptionUpdateSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const updateResult = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/reviews/profile/${username}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'update-type': 'description',
          authorization: token!,
        },
        body: JSON.stringify({ ...data, review: rating }),
      }
    )

    setIsLoading(false)

    if (!updateResult?.ok) {
      const { message } = await updateResult.json()
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: message,
        variant: 'destructive',
      })
    }

    mutate()
    setOpen(false)

    return toast({
      title: 'Success!',
      description: 'Your review has been successfully submitted!',
      variant: 'default',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Rating</FormLabel>
              <div className="overflow-hidden h-10 w-36">
                <Rating value={rating} readOnly />
              </div>

              <FormLabel>Review Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us your thoughts about this user!"
                  className="resize-y w-full h-32"
                  {...field}
                  {...form.register('description')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
