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
import { AddCollectableCollectionForm } from '../form/add-collectable-collection-form'

export function AddCollectableCollectionButton(props: {
  mutate: () => void
  collection: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-2">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Add a collectable to the collection</DialogTitle>
        </DialogHeader>
        <AddCollectableCollectionForm
          collection={props.collection}
          setOpen={setOpen}
          mutate={props.mutate}
        />
      </DialogContent>
    </Dialog>
  )
}
