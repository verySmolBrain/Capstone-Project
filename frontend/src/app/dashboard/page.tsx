import * as React from 'react'

import { DashboardNavBar } from '@/components/dashboard-navbar'
import { TypographyH2 } from '@/components/typography-h2'
import { Carousel } from '@/components/ui/carousel'
import { MoveLeftIcon } from 'lucide-react'
import Image from 'next/image'

export default function Dashboard() {
  const images = [
    'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_038_R_EN_LG.png',
    'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_034_R_EN_LG.png',
    'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_034_R_EN_LG.png',
    'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_034_R_EN_LG.png',
    'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_034_R_EN_LG.png',
    'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_034_R_EN_LG.png',
    'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_034_R_EN_LG.png',
    'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/MEW/MEW_034_R_EN_LG.png',
  ]

  const collections = [
    'https://archives.bulbagarden.net/media/upload/thumb/e/e0/SWSH10_Logo_EN.png/300px-SWSH10_Logo_EN.png',
    'https://archives.bulbagarden.net/media/upload/thumb/e/e0/SWSH10_Logo_EN.png/300px-SWSH10_Logo_EN.png',
    'https://archives.bulbagarden.net/media/upload/thumb/e/e0/SWSH10_Logo_EN.png/300px-SWSH10_Logo_EN.png',
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavBar />

      <section className="space-y-8 pr-5 pl-5 pt-6 md:pt-10 2xl:pr-0 2xl:pl-0">
        <div className="container flex flex-col gap-4 border-4 border-primary rounded-2xl pt-6">
          <TypographyH2 text="Active Campaigns" />
          <div className="container flex flex-row">
            <MoveLeftIcon className="w-6 h-6" />
            <Carousel>
            {collections.map((src, i) => {
              return (
                <div key={i} className="">
                  <div className="relative aspect-10/50 mt-6 mb-6 h-24 w-auto">
                    <Image
                      src={src}
                      layout="fill"
                      className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-4 border-primary rounded-2xl"
                      alt="alt"
                    />
                  </div>
                </div>
              )
            })}
          </Carousel>
          </div>

        </div>
      </section>

      <section className="space-y-8 pr-5 pl-5 pt-6 md:pt-10 2xl:pr-0 2xl:pl-0">
        <div className="container flex flex-col gap-4 border-4 border-primary rounded-2xl pt-6">
          <TypographyH2 text="Popular Collectibles" />
          <Carousel>
            {images.map((src, i) => {
              return (
                <div
                  className="relative aspect-63/88 mt-6 mb-6 h-96 mr-3 ml-3 w-auto"
                  key={i}
                >
                  <Image
                    src={src}
                    layout="fill"
                    className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-4 border-primary rounded-2xl"
                    alt="alt"
                  />
                </div>
              )
            })}
          </Carousel>
        </div>
      </section>

      <section className="space-y-8 pr-5 pl-5 pt-6 md:pt-10 2xl:pr-0 2xl:pl-0pb-4 md:pb-12">
        <div className="container flex flex-col gap-4 border-4 border-primary rounded-2xl pt-6">
          <TypographyH2 text="Recommended For You" />
          <Carousel>
            {images.map((src, i) => {
              return (
                <div
                  className="relative aspect-63/88 mt-6 mb-6 h-96 mr-3 ml-3 w-auto"
                  key={i}
                >
                  <Image
                    src={src}
                    layout="fill"
                    className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-4 border-primary rounded-2xl"
                    alt="alt"
                  />
                </div>
              )
            })}
          </Carousel>
        </div>
      </section>
    </div>
  )
}
