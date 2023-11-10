'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

export function viewLogger() {
  const campaignViewDataUpdater = async () => {
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token
    console.log(token)

    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaigns/viewData`,
      {
        method: 'PUT',
        headers: {
          'update-type': 'name',
          authorization: token!,
        },
      }
    )
  }
  setInterval(async () => {
    campaignViewDataUpdater()
  }, 1000)
}
