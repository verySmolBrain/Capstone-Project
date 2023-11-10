'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { EditAchievemnetForm } from '../form/edit-achievement-form'
import { EditCollectionForm } from '../form/edit-collection-form'

export function EditCollectionButton(props: {
  mutate: () => void
  id: string
}) {
  const [open, setOpen] = React.useState(false)
  const [editAchievement, setEditAchievement] = React.useState<boolean>(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-2">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="container flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Details</DialogTitle>
          <div className="flex flex-row gap-4 justify-center">
            <Button
              variant={editAchievement ? 'ghost' : 'secondary'}
              onClick={() => setEditAchievement(!editAchievement)}
            >
              Edit Collection Details
            </Button>
            <Button
              variant={editAchievement ? 'secondary' : 'ghost'}
              onClick={() => setEditAchievement(!editAchievement)}
            >
              Edit Achievement Details
            </Button>
          </div>
        </DialogHeader>
        <div className="max-h-[600px]">
          {editAchievement ? (
            <EditAchievemnetForm
              id={props.id}
              mutate={props.mutate}
              setOpen={setOpen}
            />
          ) : (
            <EditCollectionForm
              id={props.id}
              mutate={props.mutate}
              setOpen={setOpen}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
