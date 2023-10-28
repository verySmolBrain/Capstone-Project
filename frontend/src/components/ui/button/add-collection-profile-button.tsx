'use client'

import * as React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog'
import { UpdateProfileCollectionForm } from '../form/update-profile-collection-form'

export function AddCollectionProfileButton(props: { type: profileCollection }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-2">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>We&apos;re letting you cook...</DialogTitle>
        </DialogHeader>
        <UpdateProfileCollectionForm type={props.type} />
      </DialogContent>
    </Dialog>
  )
}
