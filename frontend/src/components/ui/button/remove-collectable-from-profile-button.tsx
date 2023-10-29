'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { toast } from '../use-toast'

enum profileCollection {
  INVENTORY,
  WISHLIST,
  WARES,
}

async function onDelete(type: profileCollection, collectable: string) {
  const supabase = createClientComponentClient<Database>()
  const token = (await supabase.auth.getSession()).data.session?.access_token
  let response
  if (type === profileCollection.INVENTORY) {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/inventory/${collectable}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
      }
    )
  } else if (type === profileCollection.WARES) {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/wares/${collectable}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
      }
    )
  } else if (type === profileCollection.WISHLIST) {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/wishlist/${collectable}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
      }
    )
  }

  if (!response?.ok) {
    return toast({
      title: 'Uh Oh! Something went wrong!',
      description: response?.statusText,
      variant: 'destructive',
    })
  }
  return toast({
    title: 'Success!',
    description: 'The collectable was successfully deleted!',
    variant: 'default',
  })
}

export function RemoveCollectableFromProfileButton(props: {
  type: profileCollection
  collectable: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className="hidden group-hover:block">
        <Button className="absolute right-0 top-0 p-2">
          <X className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto m-20">
        <DialogHeader>
          <DialogTitle>Are you sure you want to remove this?</DialogTitle>
        </DialogHeader>
        <div className="flex-col justify-left">
          <DialogTrigger asChild className="group-hover:block">
            <Button
              className="flex-col m-2"
              onClick={() => {
                onDelete(props.type, props.collectable)
              }}
            >
              Yes
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild className="group-hover:block">
            <Button variant="secondary" className="flex-col m-2">
              Cancel
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  )
}
