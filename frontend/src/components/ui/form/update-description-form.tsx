'use client'

import * as React from 'react'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { descriptionUpdateSchema } from '@/lib/validation/update-details'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import * as z from 'zod'

type FormData = z.infer<typeof descriptionUpdateSchema>

export function UpdateDescriptionForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(descriptionUpdateSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const updateResult = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/profile/description`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'update-type': 'description',
          authorization: token!,
        },
        body: JSON.stringify(data),
      }
    )

    setIsLoading(false)

    if (!updateResult?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: updateResult?.statusText,
        variant: 'destructive',
      })
    }

    return toast({
      title: 'Success!',
      description: 'Your description has been updated!',
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
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself!"
                  className="resize-y w-full h-32"
                  {...field}
                  {...form.register('description')}
                />
              </FormControl>
              <FormDescription>
                This is your public description. It will be visible to anyone
                who views your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Update
        </Button>
      </form>
    </Form>
  )
}
