'use client'

import * as React from 'react'
import { Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import useSWR from 'swr'
import { addCollectionCampaignSchema } from '@/lib/validation/collection'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'

type FormData = z.infer<typeof addCollectionCampaignSchema>

export function AddCollectionCampaignForm(props: {
  campaign: string
  setOpen: (a: boolean) => void
  mutate: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [collection, setCollection] = React.useState<Collection[]>()
  const form = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(addCollectionCampaignSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaign/${props.campaign}/${data.name}`,
      {
        method: 'PUT',
        headers: {
          authorization: token!,
        },
        body: null,
      }
    )

    setIsLoading(false)

    if (!response?.ok) {
      const { message } = await response.json()
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: message,
        variant: 'destructive',
      })
    }
    props.setOpen(false)
    props.mutate()

    return toast({
      title: 'Success!',
      description: 'The collection was successfully added to the campaign!',
      variant: 'default',
    })
  }
  const fetcher = async (url: string) => {
    const supabase = createClientComponentClient<Database>()
    const session = (await supabase.auth.getSession()).data.session
    const token = session?.access_token

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token!,
      },
    })

    if (res?.ok) {
      return await res.json()
    }
  }
  const { data: collectionData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collection`,
    fetcher
  )

  React.useEffect(() => {
    if (collectionData) {
      setCollection(collectionData)
    }
  }, [collectionData])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="createCollectionForm">
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a collection to add" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-80">
                    <ScrollArea>
                      {collection?.map((collection) => (
                        <SelectItem
                          key={collection.name}
                          value={collection.name}
                        >
                          {collection.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          form="createCollectionForm"
          disabled={isLoading}
          className="w-auto justify-self-end transition-transform duration-300 transform active:translate-y-3 mt-2"
        >
          {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}I
          choose you!
        </Button>
      </form>
    </Form>
  )
}
