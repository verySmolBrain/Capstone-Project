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

export function AddCampaignButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Create a campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>We&apos;re letting you cook...</DialogTitle>
        </DialogHeader>
        <CreateCampaignForm></CreateCampaignForm>
      </DialogContent>
    </Dialog>
  )
}
