'use client'

import * as React from 'react'
import { Megaphone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import { Role } from '@/lib/utils'

export function ManagerButton() {
  const [role, setRole] = React.useState<Role>(Role.NULL)

  const fetcher = async (url: string) => {
    const supabase = createClientComponentClient<Database>()
    const session = (await supabase.auth.getSession()).data.session
    const token = session?.access_token

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

  const { data: roleData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/role`,
    fetcher,
    { refreshInterval: 3000 }
  )

  React.useEffect(() => {
    if (roleData?.role === Role.MANAGER.valueOf()) {
      setRole(Role.MANAGER)
    }
  }, [roleData])

  return (
    role === Role.MANAGER && (
      <Link href="/manager">
        <Button variant="outline" size="icon">
          <Megaphone className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </Link>
    )
  )
}
