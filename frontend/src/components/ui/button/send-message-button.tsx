'use client'

import * as React from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SendMessageButton() {
  return (
    <Button variant="outline" size="icon">
      <Send className="w-6 h-6 text-primary" />
    </Button>
  )
}
