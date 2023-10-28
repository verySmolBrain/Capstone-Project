'use client'

import * as React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import useSWR from 'swr'

export function AvatarButton() {
  const [image, setImage] = React.useState<string | undefined>(undefined)

  const fetcher = async (url: string) => {
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token!,
      },
    })

    if (res?.ok) {
      return await res.json()
    }
  }

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/profile`,
    fetcher
  )

  React.useEffect(() => {
    if (data) {
      setImage(data.image)
    }
  }, [data])

  return (
    <Link rel="prefetch" href="/profile">
      {' '}
      <Button variant="outline" size="icon">
        <Avatar className="w-8 h-8">
          <AvatarImage src={image} alt="Profile Picture" className="" />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </Button>
    </Link>
  )
}
