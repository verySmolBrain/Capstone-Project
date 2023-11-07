'use client'
import * as React from 'react'

import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import Image from 'next/image'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { LoadingScreen } from '@/components/ui/page/loading-page'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Carousel } from '@/components/ui/carousel'

const default_img =
  'https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg'

export default function AchievementPage({
  params,
}: {
  params: { slug: string }
}) {
  const [achievement, setAchievement] = React.useState<Achievement>()
  const [inventory, setInventory] = React.useState<CollectionCollectable>()
  const [collection, setCollection] = React.useState<Collection>()

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

  const { data: achievementData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/achievement/${params.slug}`,
    fetcher
  )

  const { data: inventoryData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/inventory`,
    fetcher
  )

  const { data: collectionData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collection/Pikachu Clones`,
    fetcher
  )

  React.useEffect(() => {
    if (achievementData) {
      setAchievement(achievementData)
    }
    if (inventoryData) {
      setInventory(inventoryData)
    }
    if (collectionData) {
      setCollection(collectionData)
    }
  }, [achievementData, inventoryData, collectionData, params.slug])

  return achievement ? (
    <>
      <GeneralNavBar />
      <section className="container flex flex-col pt-3 items-center">
        <div className="relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3">
          {achievement?.image ? (
            <Image
              src={achievement.image}
              width={528}
              height={702}
              className="object-cover w-full rounded-2xl"
              alt="Campaign Image"
            />
          ) : (
            <Skeleton className="h-60 xs:h-96" />
          )}
        </div>
        <div className="container flex flex-row flex-wrap gap-4 justify-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold truncate">
              {achievement?.name} - {achievement?.description}
            </h2>
            <div className="container border rounded-2xl pt-6 pb-6">
              <h2 className="text-lg md:text-2xl font-semibold truncate w-full">
                Your progress
              </h2>
              <Carousel>
                {collection?.collectables.map((collectable, i) => {
                  const count = inventory
                    ? inventory[collection.name]?.collectables.find(
                        (inventoryCollectable) =>
                          inventoryCollectable.name === collectable.name
                      )?.count
                    : 0
                  return (
                    <div key={i} className="pt-5">
                      <div className="group relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3 w-auto">
                        <Link href={`/collectable/${collectable.name}`}>
                          <Image
                            src={collectable?.image ?? default_img}
                            height={100}
                            width={300}
                            className={
                              'object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl' +
                              (!count ? ' grayscale' : '')
                            }
                            alt="alt"
                          />
                        </Link>
                      </div>

                      <p className="text-center rounded-2xl bg-secondary mt-3">
                        {collectable.name} x{count ?? 0}
                      </p>
                    </div>
                  )
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <LoadingScreen />
  )
}
