'use client'
import * as React from 'react'

import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import Image from 'next/image'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { Loader2 } from 'lucide-react'

export default function CampaignPage({ params }: { params: { slug: string } }) {
  const [campaign, setCampaign] = React.useState<Collectable>()

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

  const { data: result } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collectable/${params.slug}`,
    fetcher
  )

  React.useEffect(() => {
    if (result) {
      setCampaign(result)
    }
  }, [result, params.slug])

  console.log('BB')
  console.log(params.slug)
  console.log(campaign)
  console.log('CC')

  return campaign ? (
    <>
      <GeneralNavBar />
      <section className="pt-6 md:pt-10">
        <div className="relative aspect-10/50 mt-6 mb-6 h-16 xs:h-24 w-auto mr-3 ml-3">
          <Image
            src={campaign.image}
            width={500}
            height={500}
            className="object-cover w-full"
            alt="Campaign Image"
          />
        </div>
        <div className="container flex flex-row flex-wrap gap-4">
          <div className="flex flex-col order-last gap-2 md:order-none w-screen md:w-fit">
            <h2 className="text-2xl font-semibold truncate">
              {campaign?.name}
            </h2>
            <hr />
            <p className="text-sm font-normal break-words md:max-w-[400px] lg:max-w-[600px]">
              Tags: {campaign?.tags.join(', ')}
            </p>
          </div>
          edit collectable details button
        </div>
      </section>
    </>
  ) : (
    <>
      <GeneralNavBar />
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    </>
  )
}
