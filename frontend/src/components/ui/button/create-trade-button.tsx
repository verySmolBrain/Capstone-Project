'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog'
import { CreateTradeForm } from '../form/create-trade-form'

export function CreateTradeButton({ user }: { user?: Profile }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="w-fit pl-2 pr-2">
          Create Trade
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Create Trade</DialogTitle>
        </DialogHeader>
        <CreateTradeForm setOpen={setOpen} user={user} />
      </DialogContent>
    </Dialog>
  )
}
