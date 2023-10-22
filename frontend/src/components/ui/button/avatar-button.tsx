import * as React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'

export function AvatarButton() {
  return (
    <Link href="/settings">
      {' '}
      <Button variant="outline" size="icon">
        <Avatar className="w-8 h-8">
          <AvatarImage
            src="https://archives.bulbagarden.net/media/upload/4/4a/0025Pikachu.png"
            alt="Profile Picture"
            className=""
          />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </Button>
    </Link>
  )
  // Else user
}
