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
import ForumList from '@/components/ui/page/forum-list'
import { ReviewCampaignButton } from '@/components/ui/button/review-campaign-button'
import { ManagerCampaignRating } from '@/components/ui/button/manager-campaign-rating'
import { CollectibleChart } from '@/components/ui/page/campaign-collectible-chart'
import { ForumStats } from '@/components/ui/page/campaign-forum-stats'
import { ViewChart, ViewGraph, ViewPosters } from '@/components/ui/page/campaign-view-chart'
import dayjs from 'dayjs'

export default function CampaignPage({ params }: { params: { slug: string } }) {
  const [campaign, setCampaign] = React.useState<Campaign>()
  const [postMetrics, setMetrics] = React.useState<{ date: string; Posts: number }[]>([]);
  const [postersMetrics, setPosterMetrics] = React.useState<{ Poster: string; Posts: number }[]>([]);

  const [role, setRole] = React.useState<Role>()

  let data: ChartData = []
  const localViewData = []

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

  const { data: campaignResult, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaign/${params.slug}`,
    fetcher
  )

  const { data: roleResult } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/role`,
    fetcher
  )

  const { data: occurrencesObjectResult } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaign/metrics/post/${params.slug}`,
    fetcher
  )

  const { data: topPosters } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaign/metrics/posters/${params.slug}`,
    fetcher
  )

  React.useEffect(() => {
    if (occurrencesObjectResult) {
      setMetrics(occurrencesObjectResult)
    }
    if (topPosters) {
      setPosterMetrics(topPosters)
    }
  }, [occurrencesObjectResult, topPosters]);


  React.useEffect(() => {
    if (campaignResult) {
      setCampaign(campaignResult)
    }
    if (roleResult?.role) {
      setRole((roleResult?.role as Role) ?? Role.NULL)
    }
  }, [campaignResult, roleResult, params.slug])

  React.useEffect(() => {
    const updatePageView = async () => {
      const supabase = createClientComponentClient<Database>()
      const token = (await supabase.auth.getSession()).data.session
        ?.access_token

      const currTime = dayjs().unix()
      console.log(currTime)
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaign/${params.slug}/view`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'update-type': 'name',
            authorization: token!,
          },
          body: JSON.stringify({
            timestamp: currTime,
          }),
        }
      )
    }

    updatePageView()
  }, [params.slug])


  if (campaign) {
    data = campaign.collections.map((x) => ({
      name: x.name,
      value: x.collectables.length,
    }))
    const now = dayjs()

    for (let i = 0; i < 20; i++) {
      const viewsInInterval = campaign.viewData.filter(
        (x) => x < now.subtract(i, 'minutes').unix()
      ).length

      localViewData.push({
        name: `${i} minutes ago`,
        Views: viewsInInterval,
      })
    }
  }

  return campaign ? (
    <>
      <GeneralNavBar />
      <section className="container flex flex-col lg:flex-row max-w-full">
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
                <EditCampaignButton name={campaign.name} mutate={mutate} />
              )}
            </div>
          </div>
          <h2 className="text-2xl font-semibold truncate">{campaign?.name}</h2>
          <hr />
          <div className="flex items-top justify-between">
            <div className="flex flex-row flex-wrap gap-2 pb-3 w-28 items-center">
              {role === Role.USER ? (
                <ReviewCampaignButton campaign={campaign.name} />
              ) : (
                <ManagerCampaignRating campaign={campaign.name} />
              )}
            </div>
            <div>
              {campaign.isActive && (
                <p className="flex flex-row justify-center items-centertext-sm bg-green-700 max-w-fit rounded-2xl font-normal break-words lg:w-[60%] xl:w-[70%] min-w-[150px]">
                  {`Active | ${campaign.views} views`}
                </p>
              )}
              {!campaign.isActive && (
                <p className="flex flex-row justify-center items-centertext-sm bg-red-700 max-w-fit rounded-2xl font-normal break-words lg:w-[60%] xl:w-[70%] min-w-[100px]">
                  {`Inactive`}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2 pb-3">
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
          <hr></hr>

          <h3 className="text-1xl font-bold">Stats at a glance</h3>
          <p className="text-sm font-normal break-words">
            {`${campaign.collections.reduce(
              (accumulator, curr) => accumulator + curr.collectables.length,
              0
            )} collectable(s) across ${campaign.collections.length} ${
              campaign.collections.length > 1 ? 'collections' : 'collection'
            }`}
          </p>
          <div className="-mt-10">
            <CollectibleChart data={data}></CollectibleChart>
            {(role === Role.MANAGER || role === Role.ADMIN) && (
              <ForumStats campaign={campaign.name} />
            )}
          </div>
        </div>

        <div className="container gap-4 pb-3 md:pb-6 pt-3 md:pt-6 lg:max-w-[calc(100vw-600px)]">
          <div className="container border rounded-2xl pt-3 pb-3">
            <div className="flex flex-row">
              <h2 className="grow text-lg md:text-2xl font-semibold break-word">
                Collections Within {campaign.name}
              </h2>
              {role === Role.MANAGER && (
                <AddCollectionToCampaignButton
                  campaign={campaign.name}
                  mutate={mutate}
                />
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
                            <RemoveCollectionFromCampaignButton
                              campaign={campaign.name}
                              collection={name}
                              mutate={mutate}
                            />
                          </div>
                        )}
                      </Link>
                    </div>
                  </div>
                )
              })}
            </Carousel>
          </div>
          {(role === Role.MANAGER || role === Role.ADMIN) && (
            <div>
              {/* First Row */}
              <div className="flex">
                <div className="pt-5 pr-5">
                  <h3 className="text-sm font-bold">View Counts Over Time</h3>
                  <br></br>
                  <ViewChart data={localViewData.reverse()}></ViewChart>
                </div>
              
                <div className="pt-5 pl-5">
                  <h3 className="text-sm font-bold">Post Metrics Over Time</h3>
                  <br></br>
                  <ViewGraph data={postMetrics}></ViewGraph>
                </div>
              </div>

              {/* Second Row */}
              <div className="flex">
                <div className="pt-5 pr-5">
                  <h3 className="text-sm font-bold">Top Forum Posters</h3>
                  <br></br>
                  <ViewPosters data={postersMetrics}></ViewPosters>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <ForumList campaign={params.slug} />
    </>
  ) : (
    <LoadingScreen />
  )
}
