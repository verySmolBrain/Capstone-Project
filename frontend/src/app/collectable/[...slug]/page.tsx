'use client'
import * as React from 'react'

import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import Image from 'next/image'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { LoadingScreen } from '@/components/ui/page/loading-page'
import { Skeleton } from '@/components/ui/skeleton'
import { Carousel } from '@/components/ui/carousel'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const default_profile =
  'https://upload.wikimedia.org/wikipedia/en/c/ce/Goomba.PNG'

export default function CollectablePage({
  params,
}: {
  params: { slug: string }
}) {
  const [collectable, setCollectable] = React.useState<Collectable>()
  const [profiles, setProfiles] = React.useState<Profile[]>([])

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

  const { data: profileData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/search/users/wares/${params.slug}`,
    fetcher
  )

  React.useEffect(() => {
    if (result) {
      setCollectable(result)
    }
    if (profileData) {
      setProfiles(profileData)
    }
  }, [result, params.slug, profileData])

  return collectable ? (
    <>
      <GeneralNavBar />
      <section className="container flex flex-col pt-3 items-center">
        <div className="relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3">
          {collectable?.image ? (
            <Image
              src={collectable.image}
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
              {collectable?.name}
            </h2>
            <hr />
            <div className="flex flex-row flex-wrap gap-2 pb-3">
              <p className="text-sm font-normal break-words pt-1">Tags:</p>
              {collectable?.tags.map((tag, i) => {
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
          </div>
        </div>
        <div className="container flex flex-row flex-wrap gap-4 pb-6">
          <div className="flex pb-3 md:pb-6 pt-3 md:pt-6">
            <h2 className="text-lg md:text-2xl font-semibold truncate w-full">
              Users who are trading {collectable.name}
            </h2>
          </div>
          <div className="container border rounded-2xl pt-6 pb-6">
            {profiles.length ? (
              <Carousel>
                {profiles.map((user, i) => {
                  return (
                    <div key={i} className="pt-5">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="mt-6 mb-6 mr-3 ml-3 w-auto">
                              <Link href={`/profile/${user.name}`}>
                                <Image
                                  src={user.image ?? default_profile}
                                  sizes="(max-width: 475px) 6rem"
                                  width={20}
                                  height={20}
                                  className="h-20 w-20 rounded-full object-cover transition-transform duration-300 transform hover:translate-y-3 border-primary border-1"
                                  alt="alt"
                                />
                              </Link>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="overflow-hidden w-full">
                            <p className="md:text-base text-center truncate">
                              {user.name}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )
                })}
              </Carousel>
            ) : (
              <div className="flex flex-col justify-center items-center h-[150px]">
                <h2 className="place-self-center">
                  No one is trading this collectable... &#128533;
                </h2>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  ) : (
    <LoadingScreen />
  )
}
