'use client'

import * as React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import useSWR from 'swr'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import Image from 'next/image'
import { ProfileEditButton } from '@/components/ui/button/profile-edit-button'

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
      <section className="space pb-8 pt-6 md:pt-10 container flex gap-4">
        <div className="container gap-4 border rounded-2xl pt-6 pb-6">
          <div className="float-right">
            <ProfileEditButton />
          </div>
          <div className="flex items-center gap-4 pt-6 pb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
              <Image // make it so no crash if invalid source
                src={!profile?.image ? '' : profile!.image}
                layout="fill"
                className="object-cover w-full h-full"
                alt="profile picture"
              />
            </div>
            <div className="flex flex-col gap-4 overflow-hidden">
              <p className="text-2xl font-semibold truncate">{profile?.name}</p>
              <p className="text-sm truncate">{profile?.description}</p>
            </div>
          </div>
          <div className="">
            <h2 className="text-2xl font-semibold truncate pt-6 pb-6">
              My collections
            </h2>
            <div className="container gap-4 border rounded-2xl pt-6 pb-6">
              PLACEHOLDER
            </div>
            <h2 className="text-2xl font-semibold truncate pt-6 pb-6">
              Looking for
            </h2>
            <div className="container gap-4 border rounded-2xl pt-6 pb-6">
              PLACEHOLDER
            </div>
            <h2 className="text-2xl font-semibold truncate pt-6 pb-6">
              Willing to trade
            </h2>
            <div className="container gap-4 border rounded-2xl pt-6 pb-6">
              PLACEHOLDER
            </div>
          </div>
        </div>
      </section>
    </>
  )
  // Maybe change this to redirect to profile/name later
}
