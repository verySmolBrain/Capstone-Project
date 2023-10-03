import * as React from 'react'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LogoutButton } from '@/components/ui/button/logout-button'

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="flex flex-col min-h-screen">
      {JSON.stringify(session)}
      <LogoutButton />
    </div>
  )
}
