'use client'

import * as React from 'react'
import { Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  createCollectableSchema,
  updateProfileCollectionSchema,
} from '@/lib/validation/collectable'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'

import Cropper, { Area } from 'react-easy-crop'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { profilePictureUpdateSchema } from '@/lib/validation/update-details'
import NextImage from 'next/image'
import { Label } from '@radix-ui/react-label'

type FormData = z.infer<typeof createCollectableSchema>

export function UpdateProfileCollectionForm(props: {
  type: profileCollection
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const form = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(updateProfileCollectionSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    if (props.type === profileCollection.INVENTORY) {
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/image/collectable/upload`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'update-type': 'image',
          authorization: token!,
        },
        body: JSON.stringify({ image: image, name: data.name }),
      }
    )

    const body = {
      name: data.name,
      image: (await response.json()).image,
      tags: data.tags,
    }

    const createResult = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collectable`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
        body: JSON.stringify(body),
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="createCollectionForm">
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collectable Name</FormLabel>
                <FormControl>
                  <Input placeholder="Pikachu" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
