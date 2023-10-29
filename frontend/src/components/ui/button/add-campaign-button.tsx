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
import { CreateCampaignForm } from '../form/create-campaign-form'
import { DatePickerForm } from '../form/test'

export function AddCampaignButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>We&apos;re letting you cook...</DialogTitle>
        </DialogHeader>
        <DatePickerForm />
      </DialogContent>
    </Dialog>
  )
}
