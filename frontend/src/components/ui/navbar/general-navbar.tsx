'use client'

import { LogoutButton } from '../button/logout-button'
import { SearchButton } from '../button/search-button'
import { ToggleDarkMode } from '../button/theme-toggle-button'
import { IconLogo } from '@/components/ui/assets/IconLogo'
import Link from 'next/link'
import { RedirectButton } from '../button/redirect-button'
import { MessageSquare, User, Megaphone } from 'lucide-react'
import * as React from 'react'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import { Role } from '@/lib/utils'

export function GeneralNavBar() {
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
    <header className="w-full border-b bg-background">
      <Link href="/dashboard">
        <IconLogo className="w-10 h-10 mx-auto absolute left-4 top-4 2xl:left-36 md:top-4" />
      </Link>

      <p className="text-2xl font-semibold tracking-tight absolute left-4 top-4 md:left-20 2xl:left-52 md:top-4 invisible md:visible">
        Goomba Market
      </p>
      <div className="container flex h-16 mr-0 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          {role === Role.MANAGER && (
            <RedirectButton url={'/manager'} Icon={Megaphone} />
          )}
          <SearchButton />
          <ToggleDarkMode />
          <RedirectButton url={'/chat'} Icon={MessageSquare} />
          <RedirectButton url={'/profile'} Icon={User} />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
