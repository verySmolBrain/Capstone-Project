'use client'

import * as React from 'react'
import Link from 'next/link'
import { MessageSquarePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ChatButton({ user }: { user?: string }) {
  const href = user ? `/chat/${user}` : '/dashboard'

  return (
    <Link href={href}>
      <Button variant="outline" size="icon">
        <MessageSquarePlus className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    </Link>
  )
}
