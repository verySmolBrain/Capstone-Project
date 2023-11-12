'use client'

import * as React from 'react'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { createForumPostSchema } from '@/lib/validation/forum'
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
import * as z from 'zod'
import { Input } from '../input'

type FormData = z.infer<typeof createForumPostSchema>

export function CreateForumPostForm({
  campaign,
  mutate,
  setOpen,
}: {
  campaign: string
  mutate: () => void
  setOpen: (open: boolean) => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(createForumPostSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const updateResult = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/${campaign}/forum`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'update-type': 'description',
          authorization: token!,
        },
        body: JSON.stringify({ ...data }),
      }
    )

    setIsLoading(false)

    if (!updateResult?.ok) {
      const { message } = await updateResult?.json()
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
      description: 'Your forum post has been successfully submitted!',
      variant: 'default',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="w-full justify-self-start"
                  type="username"
                  placeholder="Make your title stand out!"
                  autoCapitalize="none"
                  autoCorrect="off"
                  required
                  disabled={isLoading}
                  {...field}
                  {...form.register('title')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Post something cool!"
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
