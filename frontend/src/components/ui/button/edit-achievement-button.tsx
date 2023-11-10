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

export function EditAchievementButton({
  mutate,
  id,
}: {
  mutate: () => void
  id: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-10 w-10 flex-shrink-0"
          variant="outline"
          size="icon"
        >
          <Pencil className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Edit Achievement</DialogTitle>
        </DialogHeader>
        <EditAchievemnetForm id={id} mutate={mutate} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
