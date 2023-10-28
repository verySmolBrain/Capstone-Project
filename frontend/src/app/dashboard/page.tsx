'use client'
import * as React from 'react'
import { DashboardNavBar } from '@/components/ui/navbar/dashboard-navbar'
import { TypographyH2 } from '@/components/ui/assets/typography-h2'
import { Carousel } from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { Loader2 } from 'lucide-react'
import useSWR from 'swr'

export default function Dashboard() {
  const [active, setActive] = React.useState<Campaign[]>([])
  const [trending, setTrending] = React.useState<Collection[]>()
  const [recommended, setRecommended] = React.useState<Collection>()

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

  const { data: resActive } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaign`,
    fetcher
  )

  const { data: resTrending } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collection`,
    fetcher
  )

  const { data: resRecommended } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collection/Pikachu Clones`,
    fetcher
  )

  React.useEffect(() => {
    if (resActive) {
      setActive(resActive)
    }
    if (resTrending) {
      setTrending(resTrending)
    }
    if (resRecommended) {
      setRecommended(resRecommended)
    }
  }, [resActive, resTrending, resRecommended])

  return recommended ? (
    <>
      <div className="flex flex-col min-h-screen">
        <DashboardNavBar />

        <section className="space-y-8 pr-5 pl-5 pt-6 md:pt-10 2xl:pr-0 2xl:pl-0">
          <div className="container flex flex-col gap-4 border bg-card text-card-foreground shadow-sm rounded-2xl pt-6 pb-6">
            <TypographyH2 text="Active Campaigns" />
            <Carousel>
              {active
                .filter((c) => c.isActive)
                .map(({ image, name }, i) => {
                  return (
                    <div key={i} className="">
                      <div className="group relative aspect-10/50 mt-6 mb-6 h-16 xs:h-24 w-auto mr-3 ml-3">
                        <Link href={`/campaign/${name}`}>
                          <Image
                            src={image!}
                            layout="fill"
                            className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
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

        <section className="space-y-8 pr-5 pl-5 pt-6 md:pt-10 2xl:pr-0 2xl:pl-0">
          <div className="container flex flex-col gap-4 border bg-card text-card-foreground shadow-sm rounded-2xl pt-6 pb-6">
            <TypographyH2 text="Trending Collections" />
            <Carousel>
              {trending?.map(({ image, name }, i) => {
                return (
                  <div key={i} className="">
                    <div className="group relative aspect-10/50 mt-6 mb-6 h-16 xs:h-24 w-auto mr-3 ml-3">
                      <Link href={`/collection/${name}`}>
                        <Image
                          src={image!}
                          layout="fill"
                          className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
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

        <section className="space-y-8 pr-5 pl-5 pt-6 md:pt-10 2xl:pr-0 2xl:pl-0pb-4 pb-8 md:pb-12">
          <div className="container flex flex-col gap-4 border bg-card text-card-foreground shadow-sm rounded-2xl pt-6 pb-6">
            <TypographyH2 text="Popular Collectables" />
            <Carousel>
              {recommended.collectables.map(({ image, name }, i) => {
                return (
                  <div key={i} className="">
                    <div className="relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3 w-auto">
                      <Link href={`/collectable/${name}`}>
                        <Image
                          src={image!}
                          layout="fill"
                          className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
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
    </>
  ) : (
    <>
      <DashboardNavBar />
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    </>
  )
}
