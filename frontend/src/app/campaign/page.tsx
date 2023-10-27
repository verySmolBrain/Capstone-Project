import React from 'react'

import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import { TypographyH2 } from '@/components/ui/assets/typography-h2'
import { Carousel } from '@/components/ui/carousel'
import { EditCampaignButton } from '@/components/ui/button/edit-campaign-button'
import { AddCollectionButton } from '@/components/ui/button/add-collection-button'
import { RemoveCollectionButton } from '@/components/ui/button/remove-collection-button'
import Image from 'next/image'

const collections = [
  'https://archives.bulbagarden.net/media/upload/thumb/e/e0/SWSH10_Logo_EN.png/300px-SWSH10_Logo_EN.png',
  'https://archives.bulbagarden.net/media/upload/thumb/e/e0/SWSH10_Logo_EN.png/300px-SWSH10_Logo_EN.png',
  'https://archives.bulbagarden.net/media/upload/thumb/e/e0/SWSH10_Logo_EN.png/300px-SWSH10_Logo_EN.png',
  'https://archives.bulbagarden.net/media/upload/thumb/e/e0/SWSH10_Logo_EN.png/300px-SWSH10_Logo_EN.png',
  'https://archives.bulbagarden.net/media/upload/thumb/e/e0/SWSH10_Logo_EN.png/300px-SWSH10_Logo_EN.png',
  'https://archives.bulbagarden.net/media/upload/thumb/e/e0/SWSH10_Logo_EN.png/300px-SWSH10_Logo_EN.png',
  'https://archives.bulbagarden.net/media/upload/thumb/e/e0/SWSH10_Logo_EN.png/300px-SWSH10_Logo_EN.png',
]

export default function CampaignPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <GeneralNavBar />
      campaign name: campaign picture: list of collections in the campaign:
      <EditCampaignButton></EditCampaignButton>
      <div>
        <div className="container flex flex-col gap-4 border bg-card text-card-foreground shadow-sm rounded-2xl pt-6 pb-6">
          <div className="flex flex-row">
            <div className="grow">
              <TypographyH2 text="Collections" />
            </div>

            <div>
              <AddCollectionButton></AddCollectionButton>
            </div>
          </div>
          <Carousel>
            {collections.map((src, i) => {
              return (
                <div key={i} className="">
                  <div className="group relative aspect-10/50 mt-6 mb-6 h-16 xs:h-24 w-auto mr-3 ml-3">
                    <Image
                      src={src}
                      layout="fill"
                      className="cursor-pointer object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                      alt="alt"
                    />
                    <RemoveCollectionButton></RemoveCollectionButton>
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
      </div>
    </div>
  )
}
