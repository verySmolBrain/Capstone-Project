'use client'

import React from 'react'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import { TypographyH2 } from '@/components/ui/assets/typography-h2'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { useRouter } from 'next/navigation'
import { Role } from '@/lib/utils'
import TradeList from '@/components/ui/page/trade-list'
import { CreateTradeButton } from '@/components/ui/button/create-trade-button'
import { Button } from '@/components/ui/button'

export default function TradeListPage({
  params,
}: {
  params: { slug: string }
}) {
  const [profile, setProfile] = React.useState<Profile>()
  const [role, setRole] = React.useState<Role>(Role.NULL)
  const [isOwnProfile, setIsOwnProfile] = React.useState<boolean>(false)
  const [tradeType, setTradeType] = React.useState<'sell' | 'buy' | 'history'>(
    'buy'
  )

  const router = useRouter()

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
    } else {
      router.push('/dashboard')
    }
  }

  const profileData = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/profile/${params.slug}`,
    fetcher,
    { refreshInterval: 3000 }
  )

  const ownProfileData = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/profile`,
    fetcher,
    { refreshInterval: 3000 }
  )

  const { data: roleData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/role/${params.slug}`,
    fetcher,
    { refreshInterval: 3000 }
  )

  React.useEffect(() => {
    if (role && role !== Role.USER) {
      router.push('/dashboard')
    }
  }, [role, router])

  React.useEffect(() => {
    if (profileData?.data) {
      setProfile(profileData?.data)
      if (ownProfileData?.data?.name === params.slug[0]) {
        setIsOwnProfile(true)
      }
    }
    if (roleData) {
      setRole((roleData?.role as Role) ?? Role.NULL)
    }
  }, [profileData?.data, ownProfileData?.data, params.slug, roleData])

  return (
    <div className="flex flex-col min-h-screen">
      <GeneralNavBar />
      <section className="space pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4 w-full">
          <div className="flex flex-row w-full justify-between">
            <TypographyH2 text="Trades" />
            {role === Role.USER && <CreateTradeButton user={profile} />}
          </div>

          <div className="flex flex-row gap-4 justify-center pt-4">
            <Button
              type="button"
              variant={tradeType === 'buy' ? 'secondary' : 'ghost'}
              onClick={() => setTradeType('buy')}
            >
              Buy
            </Button>
            <Button
              type="button"
              variant={tradeType === 'sell' ? 'secondary' : 'ghost'}
              onClick={() => setTradeType('sell')}
            >
              Sell
            </Button>
            <Button
              type="button"
              variant={tradeType === 'history' ? 'secondary' : 'ghost'}
              onClick={() => setTradeType('history')}
            >
              History
            </Button>
          </div>

          <TradeList
            tradeType={tradeType}
            isOwnProfile={isOwnProfile}
            profile={profile}
          />
        </div>
      </section>
    </div>
  )
}
