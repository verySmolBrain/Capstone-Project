'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AddCollectionCampaignForm } from '../form/add-collection-campaign-form'
import { CreateCollectionForm } from '../form/create-collection-form'

export function AddCollectionToCampaignButton({
  mutate,
  campaign,
}: {
  mutate: () => void
  campaign: string
}) {
  const [open, setOpen] = React.useState(false)
  const [newCollection, setNewCollection] = React.useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Add A Collection To This Campaign</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row gap-4 justify-center">
          <Button
            variant={newCollection ? 'ghost' : 'secondary'}
            onClick={() => setNewCollection(!newCollection)}
          >
            Create New Collection
          </Button>
          <Button
            variant={newCollection ? 'secondary' : 'ghost'}
            onClick={() => setNewCollection(!newCollection)}
          >
            Add Existing Collection
          </Button>
        </div>

        <div className="max-h-[600px]">
          {newCollection ? (
            <AddCollectionCampaignForm
              campaign={campaign}
              mutate={mutate}
              setOpen={setOpen}
            />
          ) : (
            <CreateCollectionForm setOpen={setOpen} mutate={mutate} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
