'use client'

import * as React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import useSWR from 'swr'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import Image from 'next/image'

type Profile = {
  id: string
  name: string
  description: string | null
  image: string | null
  reputation: number
}

export default function ProfilePage() {
  const [profile, setProfile] = React.useState<Profile>()

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
    fetcher,
    { refreshInterval: 3000 }
  )

  React.useEffect(() => {
    if (data) {
      setProfile(data)
    }
  }, [data])

  return (
    <>
      <GeneralNavBar />
      {JSON.stringify(profile)}
      <section className="space pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden ml-6 shrink-0">
            <Image // make it so no crash if invalid source
              src={!profile?.image ? '' : profile!.image}
              layout="fill"
              className="object-cover w-full h-full"
              alt="profile picture"
            />
          </div>
        </div>
      </section>
    </>
  )
  // Maybe change this to redirect to profile/name later
}
