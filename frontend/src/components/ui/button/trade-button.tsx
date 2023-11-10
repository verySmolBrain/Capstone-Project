'use client'

import * as React from 'react'
import Link from 'next/link'
import { WalletCards } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function TradeButton({ user }: { user?: string }) {
  return (
    <Link href={`/profile/trade/${user}`}>
      {' '}
      <Button variant="outline" size="icon">
        <WalletCards className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    </Link>
  )
}
