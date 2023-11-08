'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog'
import { CreateForumPostForm } from '../form/create-forum-post-form'

export function CreateForumPostButton({
  campaign,
  mutate,
}: {
  campaign: string
  mutate: () => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="w-fit pl-2 pr-2">
          Create Forum Post
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Create Forum Post</DialogTitle>
        </DialogHeader>
        <CreateForumPostForm
          campaign={campaign}
          setOpen={setOpen}
          mutate={mutate}
        />
      </DialogContent>
    </Dialog>
  )
}
