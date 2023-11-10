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
} from '@/components/ui/dialog'
import { CreateCollectableForm } from '../form/create-collectable-form'

export function AddCollectionButton({ mutate }: { mutate: () => void }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Add a collection to this campaign</DialogTitle>
        </DialogHeader>
        <div>
          <CreateCollectableForm setOpen={setOpen} mutate={mutate} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
