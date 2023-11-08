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
import { CreatePostCommentForm } from '../form/create-post-comment-form'

export function CreatePostCommentButton({
  post,
  mutate,
}: {
  post: string
  mutate: () => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="w-fit pl-2 pr-2">
          Post Comment
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Post Comment</DialogTitle>
        </DialogHeader>
        <CreatePostCommentForm post={post} setOpen={setOpen} mutate={mutate} />
      </DialogContent>
    </Dialog>
  )
}
