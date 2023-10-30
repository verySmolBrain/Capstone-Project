'use client'
import * as React from 'react'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import { TypographyH2 } from '@/components/ui/assets/typography-h2'
import { Carousel } from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import { AddCampaignButton } from '@/components/ui/button/add-campaign-button'
import { Database } from '@/lib/database.types'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ArchiveCampaignButton } from '@/components/ui/button/archive-campaign-button'

const default_img =
  'https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg'

export default function ManagerPage() {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([])

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

  const { data: result, mutate: campaignMutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaign`,
    fetcher
  )

  React.useEffect(() => {
    if (result) {
      setCampaigns(result)
    }
  }, [result])

  return (
    <div className="flex flex-col min-h-screen">
      <GeneralNavBar />
      <section className="space-y-8 pr-5 pl-5 pt-6 md:pt-10 2xl:pr-0 2xl:pl-0">
        <div className="container flex flex-col gap-4 border bg-card text-card-foreground shadow-sm rounded-2xl pt-6 pb-6">
          <div className="flex">
            <div className="grow w-full">
              <TypographyH2 text="All Your Campaigns" />
            </div>
            <AddCampaignButton mutate={campaignMutate}></AddCampaignButton>
          </div>
          <Carousel>
            {campaigns.map(({ image, name }, i) => {
              return (
                <div key={i} className="">
                  <div className="group relative aspect-10/50 mt-6 mb-6 h-24 xs:h-24 w-auto mr-3 ml-3">
                    <Link href={`/campaign/${name}`}>
                      <Image
                        src={image ? image : default_img}
                        height={100}
                        width={300}
                        className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                        alt="alt"
                      />
                      <div
                        onClick={(e) => {
                          e.preventDefault()
                        }}
                      >
                        <ArchiveCampaignButton
                          campaign={name}
                          mutate={campaignMutate}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
      </section>
      <section className="space-y-8 pr-5 pl-5 pt-6 md:pt-10 2xl:pr-0 2xl:pl-0">
        <div className="container flex flex-col gap-4 border bg-card text-card-foreground shadow-sm rounded-2xl pt-6 pb-6">
          <div className="flex flex-row">
            <div className="grow">
              <TypographyH2 text="Archived Campaigns" />
            </div>
          </div>
          <Carousel>
            {campaigns
              .filter((c) => !c.isActive)
              .map(({ image, name }, i) => {
                return (
                  <div key={i} className="">
                    <div className="relative aspect-10/50 mt-6 mb-6 h-16 xs:h-24 w-auto mr-3 ml-3">
                      <Link href={`/campaign/${name}`}>
                        <Image
                          src={image ? image : default_img}
                          height={100}
                          width={300}
                          className="grayscale object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                          alt="alt"
                        />
                      </Link>
                    </div>
                  </div>
                )
              })}
          </Carousel>
        </div>
      </section>
    </div>
  )
}
