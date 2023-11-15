import * as React from 'react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

// General button framework for redirect buttons: takes in a Lucide Icon and the url to redirect to, with options for text
// and the associated params
export function RedirectButton({
  url,
  Icon,
  text,
}: {
  url: string
  Icon: LucideIcon
  text?:
    | {
        variant:
          | 'default'
          | 'link'
          | 'destructive'
          | 'outline'
          | 'secondary'
          | 'ghost'
          | null
          | undefined
        content: string
        size: 'sm' | 'lg' | 'default' | 'icon' | null | undefined
        params: string
      }
    | undefined
}) {
  return (
    <Link href={url}>
      {text ? (
        <Button variant={text.variant} size={text.size} className={text.params}>
          {text.content}
        </Button>
      ) : (
        <Button variant="outline" size="icon">
          <Icon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      )}
    </Link>
  )
}
