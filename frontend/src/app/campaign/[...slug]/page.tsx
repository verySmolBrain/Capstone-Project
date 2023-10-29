'use client'
import * as React from 'react'

import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import { Carousel } from '@/components/ui/carousel'
import { EditCampaignButton } from '@/components/ui/button/edit-campaign-button'
import { AddCollectionToCampaignButton } from '@/components/ui/button/add-collection-to-campaign-button'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { RemoveCollectionFromCampaignButton } from '@/components/ui/button/remove-collection-from-campaign-button'
import { Skeleton } from '@/components/ui/skeleton'
import { LoadingScreen } from '@/components/ui/page/loading-page'
import { Role } from '@/lib/utils'

export default function CampaignPage({ params }: { params: { slug: string } }) {
  const [campaign, setCampaign] = React.useState<Campaign>()
  const [role, setRole] = React.useState<Role>()

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

  const { data: campaignResult } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaign/${params.slug}`,
    fetcher
  )

  const { data: roleResult } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/role`,
    fetcher
  )

  React.useEffect(() => {
    if (campaignResult) {
      setCampaign(campaignResult)
    }
    if (roleResult?.role) {
      setRole((roleResult?.role as Role) ?? Role.NULL)
    }
  }, [campaignResult, roleResult, params.slug])

  return campaign ? (
    <>
      <GeneralNavBar />
      <section className="container flex flex-col lg:flex-row">
        <div className="container flex flex-col gap-2 w-fit">
          <div className="flex flex-row">
            <div className="group relative aspect-10/50 mt-6 mb-6 h-16 xs:h-24 w-auto mr-3 ml-3">
              {campaign?.image ? (
                <Image
                  src={campaign.image}
                  width={300}
                  height={100}
                  className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                  alt="Campaign Image"
                />
              ) : (
                <Skeleton className="object-cover h-full w-full rounded-2xl" />
              )}
            </div>
            <div className="pt-4">
              {role === Role.MANAGER && (
                <EditCampaignButton></EditCampaignButton>
              )}
            </div>
          </div>
          <h2 className="text-2xl font-semibold truncate">{campaign?.name}</h2>
          <hr />
          <div className="flex flex-row flex-wrap gap-2">
            <p className="text-sm font-normal break-words pt-1">Tags:</p>
            {campaign?.tags.map((tag, i) => {
              return (
                <p
                  key={i}
                  className="bg-secondary pl-2 pr-2 pb-1 pt-1 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  {tag}
                </p>
              )
            })}
          </div>
          <p className="text-sm font-normal break-words md:max-w-[400px] lg:max-w-[600px]">
            Status: {campaign.isActive ? 'Active' : 'Inactive'}
          </p>
        </div>

        <div className="container gap-4 pb-3 md:pb-6 pt-3 md:pt-6 lg:max-w-[calc(100vw-600px)]">
          <div className="container border rounded-2xl pt-3 pb-3">
            <div className="flex flex-row">
              <h2 className="grow text-lg md:text-2xl font-semibold break-word">
                Collections Within {campaign.name}
              </h2>
              {role === Role.MANAGER && (
                <AddCollectionToCampaignButton></AddCollectionToCampaignButton>
              )}
            </div>
            <Carousel>
              {campaign.collections.map(({ image, name }, i) => {
                return (
                  <div key={i} className="">
                    <div className="group relative aspect-63/88 mt-6 mb-6 h-20 xs:h-96 w-auto mr-3 ml-3">
                      <Link href={`/collection/${name}`}>
                        <Image
                          src={image!}
                          height={528}
                          width={702}
                          className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                          alt="alt"
                        />
                        {role === Role.MANAGER && (
                          <div
                            onClick={(e) => {
                              e.preventDefault()
                            }}
                          >
                            <RemoveCollectionFromCampaignButton></RemoveCollectionFromCampaignButton>
                          </div>
                        )}
                      </Link>
                    </div>
                  </div>
                )
              })}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  ) : (
    <LoadingScreen />
  )
}
