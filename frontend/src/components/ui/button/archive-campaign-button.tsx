'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Archive } from 'lucide-react'
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

async function onArchive(campaign: string, mutate: () => void) {
  const supabase = createClientComponentClient<Database>()
  const token = (await supabase.auth.getSession()).data.session?.access_token

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaign/${campaign}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: token!,
      },
      body: JSON.stringify({ isActive: false }),
    }
  )

  if (!response?.ok) {
    const { message } = await response?.json()
    return toast({
      title: 'Uh Oh! Something went wrong!',
      description: message,
      variant: 'destructive',
    })
  }

  mutate()

  return toast({
    title: 'Success!',
    description: 'The collection was successfully archived!',
    variant: 'default',
  })
}

export function ArchiveCampaignButton({
  campaign,
  mutate,
}: {
  campaign: string
  mutate: () => void
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className="hidden group-hover:block">
        <Button className="absolute right-0 top-0 p-2">
          <Archive className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto m-20">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to archive this campaign?
          </DialogTitle>
        </DialogHeader>
        <div className="flex-col justify-left">
          <DialogTrigger asChild className="group-hover:block">
            <Button
              className="flex-col m-2"
              onClick={() => {
                onArchive(campaign, mutate)
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
