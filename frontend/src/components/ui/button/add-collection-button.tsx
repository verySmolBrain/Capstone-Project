'use client'

import * as React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AddCollectionButton() {
  return (
    <Button variant="outline" size="icon" className="ml-auto">
      <Plus className="w-5 h-5 text-primary" />
    </Button>
  )
}
