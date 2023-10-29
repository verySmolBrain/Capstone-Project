'use client'
import * as React from 'react'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import { Carousel } from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { Loader2 } from 'lucide-react'
import { AddCollectableToCollection } from '@/components/ui/button/add-collectable-to-collection-button'
import { EditCollectionButton } from '@/components/ui/button/edit-collection-button'
import { RemoveCollectableFromCollectionButton } from '@/components/ui/button/remove-collectable-from-collection-button'

const default_img =
  'https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg'

export default function CollectionPage({
  params,
}: {
  params: { slug: string }
}) {
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

  const { data: result } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collection/${params.slug}`,
    fetcher
  )

  React.useEffect(() => {
    if (result) {
      setCollection(result)
    }
  }, [result, params.slug])

  return collection ? (
    <>
      <GeneralNavBar />
      <section className="pt-6 md:pt-10">
        <div className="relative aspect-10/50 mt-6 mb-6 h-16 xs:h-24 w-auto mr-3 ml-3">
          <Image
            src={collection.image ? collection.image : default_img}
            width={500}
            height={500}
            className="object-cover w-full"
            alt="Campaign Image"
          />
        </div>
        <div className="container flex flex-row flex-wrap gap-4">
          <div className="flex flex-col order-last gap-2 md:order-none w-screen md:w-fit">
            <h2 className="text-2xl font-semibold truncate">
              {collection?.name}
            </h2>
            <hr />
            <p className="text-sm font-normal break-words md:max-w-[400px] lg:max-w-[600px]">
              Tags: {collection?.tags.join(', ')}
            </p>
          </div>
          <EditCollectionButton></EditCollectionButton>
        </div>

        <div className="container gap-4 pb-6">
          <div className="flex pb-3 md:pb-6 pt-3 md:pt-6"></div>
          <div className="container border rounded-2xl pt-3 pb-3">
            <div className="flex flex-row">
              <h2 className="grow text-lg md:text-2xl font-semibold truncate">
                Collectables apart of &quot;{collection.name}&quot;
              </h2>
              <AddCollectableToCollection></AddCollectableToCollection>
            </div>
            <Carousel>
              {collection.collectables.map(({ image, name }, i) => {
                return (
                  <div key={i} className="">
                    <div className="group relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3 w-auto">
                      <Link href={`/collectable/${name}`}>
                        <Image
                          src={image ? image : default_img}
                          layout="fill"
                          className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                          alt="alt"
                        />
                        <div
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                        >
                          <RemoveCollectableFromCollectionButton></RemoveCollectableFromCollectionButton>
                        </div>
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
    <>
      <GeneralNavBar />
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    </>
  )
}
