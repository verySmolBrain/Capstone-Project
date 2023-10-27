'use client'

import * as React from 'react'
import { Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createCollectableSchema } from '@/lib/validation/collectable'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Tag, TagInput } from '../tags'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'

type FormData = z.infer<typeof createCollectableSchema>

export function CreateCollectableForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  const [tags, setTags] = React.useState<Tag[]>([])

  const form = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(createCollectableSchema),
  })

  const { setValue } = form

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const createResult = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collectable`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
        body: JSON.stringify(data),
      }
    )

    setIsLoading(false)

    if (!createResult?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: createResult?.statusText,
        variant: 'destructive',
      })
    }
    return toast({
      title: 'Success!',
      description: 'The collectable was successfully created!',
      variant: 'default',
    })
  }

  return (
    <div className="grid gap-6 w-fill">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <div className="grid gap-2.5">
              <Label htmlFor="name">Collectable Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="Pick something cool and collectable!"
                className="w-full"
                autoCapitalize="none"
                autoCorrect="off"
                required
                disabled={isLoading}
                {...form.register('name')}
              />
            </div>

            {/* TODO: image, tags */}

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left">Topics</FormLabel>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="Enter a topic"
                      tags={tags}
                      className="sm:min-w-[450px]"
                      setTags={(newTags) => {
                        setTags(newTags)
                        setValue('tags', newTags as [Tag, ...Tag[]])
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    These are the topics that you&apos;re interested in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-auto justify-self-end transition-transform duration-300 transform active:translate-y-3"
            >
              {isLoading && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
