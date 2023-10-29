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
import { CreateCollectableForm } from '../form/create-collectable-form'

export function AddCollectableCollectionButton(props: {
  mutate: () => void
  collection: string
}) {
  const [open, setOpen] = React.useState(false)
  const [newCollectable, setNewCollectable] = React.useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-2">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="container flex flex-col">
        <DialogHeader>
          <DialogTitle>Add A Collectable To This Collection</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row gap-4 justify-center">
          <Button
            variant={newCollectable ? 'ghost' : 'secondary'}
            onClick={() => setNewCollectable(!newCollectable)}
          >
            Create New Collectable
          </Button>
          <Button
            variant={newCollectable ? 'secondary' : 'ghost'}
            onClick={() => setNewCollectable(!newCollectable)}
          >
            Add Existing Collectable
          </Button>
        </div>
        <div className="max-h-[600px]">
          {newCollectable ? (
            <AddCollectableCollectionForm
              collection={props.collection}
              setOpen={setOpen}
              mutate={props.mutate}
            />
          ) : (
            <CreateCollectableForm setOpen={setOpen} mutate={props.mutate} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
