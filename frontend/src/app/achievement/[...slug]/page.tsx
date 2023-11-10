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

const default_profile =
  'https://upload.wikimedia.org/wikipedia/en/c/ce/Goomba.PNG'

const default_img =
  'https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg'

const default_badge =
  'https://archives.bulbagarden.net/media/upload/d/dd/Boulder_Badge.png'

export default function AchievementPage({
  params,
}: {
  params: { slug: string }
}) {
  const [achievement, setAchievement] = React.useState<Achievement>()
  const [inventory, setInventory] = React.useState<CollectionCollectable>()
  const [profile, setProfile] = React.useState<Profile>()

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

  const { data: profileData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/profile`,
    fetcher,
    { refreshInterval: 3000 }
  )

  React.useEffect(() => {
    if (achievementData) {
      setAchievement(achievementData)
    }
    if (inventoryData) {
      setInventory(inventoryData)
    }
    if (profileData) {
      setProfile(profileData)
    }
  }, [achievementData, inventoryData, profileData, params.slug])

  return achievement ? (
    <>
      <GeneralNavBar />
      <section className="container flex flex-col pt-3 items-center">
        <div className="relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3">
          {achievement?.image ? (
            <Image
              src={achievement.image ?? default_badge}
              width={528}
              height={702}
              className={
                'object-cover w-full rounded-full' +
                (!achievement.users.find((u) => u.id == profile?.id)
                  ? ' grayscale'
                  : '')
              }
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
              <h2 className="text-lg md:text-2xl font-semibold truncate">
                Your progress on {achievement.collection.name}:{' '}
                {inventory
                  ? inventory[achievement.id]?.collectables.length ?? 0
                  : 0}
                /{achievement.collection.collectables.length}
              </h2>
              <Carousel>
                {achievement.collection?.collectables.map((collectable, i) => {
                  const count = inventory
                    ? inventory[achievement.id]?.collectables.find(
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
          <div className="container border rounded-2xl pt-6 pb-6">
            <h2 className="text-lg md:text-2xl font-semibold truncate">
              Users who have this achievement
              {achievement.users.length ? (
                <Carousel>
                  {achievement.users.map((user, i) => {
                    return (
                      <div key={i} className="pt-5">
                        <div className="group relative pl-4">
                          <Link href={`/profile/${user.name}`}>
                            <Image
                              src={user.image ?? default_profile}
                              height={45}
                              width={45}
                              className="h-20 w-20 rounded-full object-cover transition-transform duration-300 transform hover:translate-y-3"
                              alt="alt"
                            />
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </Carousel>
              ) : (
                <div className="flex flex-col justify-center items-center h-[200px]">
                  <h2 className="place-self-center">
                    Seems empty... You could be the first!
                  </h2>
                </div>
              )}
            </h2>
          </div>
        </div>
      </section>
    </>
  ) : (
    <LoadingScreen />
  )
}
