'use client'

import * as React from 'react'
import Link from 'next/link'
import { Carousel } from '../carousel'
import Image from 'next/image'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip'
import { Button } from '../button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog'
import { ScrollArea } from '../scroll-area'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { RemoveCollectableFromProfileButton } from '../button/remove-collectable-from-profile-button'

enum profileCollection {
  INVENTORY,
  WISHLIST,
  WARES,
}

export function ProfileCollectionCarousel({
  isOwnProfile,
  inventory,
  inventoryMutate,
  default_img,
}: {
  inventory: CollectionCollectable
  isOwnProfile: boolean
  default_img: string
  inventoryMutate: () => void
}) {
  const [activeCollectionName, setActiveCollectionName] =
    React.useState<string>('')
  const [activeCollection, setActiveCollection] = React.useState<Collection>()

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

  const { data: collectionData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collection/${activeCollectionName}`,
    fetcher
  )

  React.useEffect(() => {
    if (collectionData) {
      console.log(collectionData)
      setActiveCollection(collectionData)
    }
  }, [collectionData])

  return (
    <Carousel>
      {Object.keys(inventory).map((key, i) => {
        return (
          <div key={i} className="flex flex-col items-center pt-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="group relative aspect-63/88 mt-6 mb-3 h-60 xs:h-96 w-auto mr-3 ml-3">
                    <Link href={`/collection/${key}`}>
                      <Image
                        src={inventory[key]?.image ?? default_img}
                        height={100}
                        width={300}
                        className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                        alt="alt"
                      />
                    </Link>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="md:text-base w-full text-center">{`${key}`}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setActiveCollectionName(key)}>
                  Open Collection
                </Button>
              </DialogTrigger>
              <DialogContent className="container max-w-[350px] xs:min-w-[90%]">
                <DialogHeader>
                  <DialogTitle>{key}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[80vh]">
                  <ScrollArea>
                    <div className="w-full flex flex-row flex-wrap items-center justify-center gap-4">
                      {activeCollection?.collectables.map((collectable, i) => {
                        const count = inventory[key]?.collectables.find(
                          (inventoryCollectable) =>
                            inventoryCollectable.name === collectable.name
                        )?.count

                        return (
                          <div
                            key={i}
                            className="group relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3 max-w-[300px]"
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link
                                    href={`/collectable/${collectable.name}`}
                                  >
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
                                    {isOwnProfile &&
                                      Number.isInteger(count) && (
                                        <div
                                          onClick={(e) => {
                                            e.preventDefault()
                                            console.log(collectable.name)
                                          }}
                                        >
                                          <RemoveCollectableFromProfileButton
                                            type={profileCollection.INVENTORY}
                                            collectable={collectable.name}
                                            mutate={inventoryMutate}
                                          />
                                        </div>
                                      )}
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="md:text-base w-full text-center">{`${collectable.name}`}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <p className="text-center rounded-2xl bg-secondary mt-3">
                              {collectable.name} x{count ?? 0}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )
      })}
    </Carousel>
  )
}
