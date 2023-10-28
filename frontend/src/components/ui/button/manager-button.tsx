import * as React from 'react'
import { Megaphone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function ManagerButton() {
  return (
    <Link href="/manager">
      <Button variant="outline" size="icon">
        <Megaphone className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    </Link>
  )
}
