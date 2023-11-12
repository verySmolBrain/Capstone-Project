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
import { EditCampaignForm } from '../form/edit-campaign-form'

export function EditCampaignButton({
  mutate,
  name,
}: {
  mutate: () => void
  name: string
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
          <DialogTitle>Edit Campaign Details</DialogTitle>
        </DialogHeader>
        <EditCampaignForm name={name} mutate={mutate} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
