'use client'

import * as React from 'react'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import { Carousel } from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { LoadingScreen } from '@/components/ui/page/loading-page'
import { Skeleton } from '@/components/ui/skeleton'
import { Role } from '@/lib/utils'
import { AddCollectableCollectionButton } from '@/components/ui/button/add-collectable-collection-button'
import { RemoveCollectableCollectionButton } from '@/components/ui/button/remove-collectable-from-collection-button'
import { EditCollectionButton } from '@/components/ui/button/edit-collection-button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function CollectionPage({
  params,
}: {
  params: { slug: string }
}) {
  const [collection, setCollection] = React.useState<Collection>()
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

  const { data: collectionData, mutate: collectionMutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collection/${params.slug}`,
    fetcher,
    { refreshInterval: 3000 }
  )

  const { data: roleResult } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/role`,
    fetcher
  )

  React.useEffect(() => {
    if (collectionData) {
      setCollection(collectionData)
    }
    if (roleResult?.role) {
      setRole((roleResult?.role as Role) ?? Role.NULL)
    }
  }, [collectionData, roleResult, params.slug])

  return collection ? (
    <>
      <GeneralNavBar />
      <section className="container flex flex-col lg:flex-row pt-3 max-w-full">
        <div className="container flex flex-col gap-2 w-fit">
          <div className="flex flex-row">
            <div className="group relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 w-auto mr-3 ml-3">
              {collection?.image ? (
                <Image
                  src={collection.image}
                  width={702}
                  height={528}
                  className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                  alt="Campaign Image"
                />
              ) : (
                <Skeleton className="object-cover h-full w-full rounded-2xl" />
              )}
            </div>
            <div className="pt-4">
              {role === Role.MANAGER && (
                <EditCollectionButton
                  id={collection.name}
                  mutate={collectionMutate}
                />
              )}
            </div>
          </div>
          <div className="flex flex-row">
            <h2 className="text-2xl font-semibold truncate pr-3 pt-2">
              {collection?.name}{' '}
            </h2>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-45">
                      <Link href={`/achievement/${collection.achievement.id}`}>
                        <Image
                          src={collection.achievement.image}
                          width={45}
                          height={45}
                          className="rounded-full object-cover transition-transform duration-300 transform hover:-translate-y-3 border-primary border-1"
                          alt="Achievement Image"
                        />
                      </Link>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="md:text-base w-full text-center">
                      {collection.achievement.name} -{' '}
                      {collection.achievement.description}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <hr />
          <div className="flex flex-row flex-wrap gap-2 pb-3">
            <p className="text-sm font-normal break-words pt-1">Tags:</p>
            {collection?.tags.map((tag, i) => {
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

        <div className="container border rounded-2xl pt-3 lg:w-[60%] xl:w-[70%]">
          <div className="flex flex-row pb-3">
            <h2 className="grow text-lg md:text-2xl font-semibold break-word">
              Collectables Within {collection.name}
            </h2>
            {role === Role.MANAGER && (
              <AddCollectableCollectionButton
                collection={collection.name}
                mutate={collectionMutate}
              />
            )}
          </div>
          <Carousel>
            {collection.collectables.map(({ image, name }, i) => {
              return (
                <div key={i} className="">
                  <div className="group relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3 w-auto">
                    <Link href={`/collectable/${name}`}>
                      <Image
                        src={image!}
                        layout="fill"
                        className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                        alt="alt"
                      />
                      {role === Role.MANAGER && (
                        <div
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                        >
                          <RemoveCollectableCollectionButton
                            collection={collection.name}
                            collectable={name}
                            mutate={collectionMutate}
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
      </section>
    </>
  ) : (
    <LoadingScreen />
  )
}
