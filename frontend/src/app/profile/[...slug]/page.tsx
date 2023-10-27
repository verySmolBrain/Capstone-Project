'use client'

import * as React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import useSWR from 'swr'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import Image from 'next/image'
import { ProfileEditButton } from '@/components/ui/button/profile-edit-button'
import { Rating } from '@smastrom/react-rating'
import Link from 'next/link'
import { Carousel } from '@/components/ui/carousel'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { AddCollectionButton } from '@/components/ui/button/add-collection-button'
import { ChatButton } from '@/components/ui/button/chat-button'

export default function ProfilePage({ params }: { params: { slug: string } }) {
  const [profile, setProfile] = React.useState<Profile>()
  const [isOwnProfile, setIsOwnProfile] = React.useState<boolean>(false)
  const router = useRouter()

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
    } else {
      router.push('/dashboard')
    }
  }

  const profileData = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/profile/${params.slug}`,
    fetcher,
    { refreshInterval: 3000 }
  )

  const ownProfileData = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/profile`,
    fetcher,
    { refreshInterval: 3000 }
  )

  React.useEffect(() => {
    if (profileData?.data) {
      setProfile(profileData?.data)

      if (ownProfileData?.data?.name === params.slug[0]) {
        setIsOwnProfile(true)
      }
    }
  }, [profileData?.data, ownProfileData?.data, params.slug])

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

  const default_profile =
    'https://upload.wikimedia.org/wikipedia/en/c/ce/Goomba.PNG'

  return profile ? (
    <>
      <GeneralNavBar />
      <section className="pt-6 md:pt-10">
        <div className="flex flex-row flex-wrap gap-4">
          <div className="container flex flex-row flex-wrap gap-4">
            <Image
              src={profile?.image ?? default_profile}
              sizes="(max-width: 475px) 6rem"
              width={20}
              height={20}
              className="h-20 w-20 rounded-full"
              alt="profile picture"
            />
            <div className="flex flex-col order-last gap-2 md:order-none w-screen md:w-fit">
              <h2 className="text-2xl font-semibold truncate">
                {profile?.name}
              </h2>
              <hr />
              <p className="text-sm font-normal break-words md:max-w-[400px] lg:max-w-[600px]">
                {profile?.description}
              </p>
            </div>
            <div className="ml-auto flex flex-row">
              <div className="flex flex-col overflow-hidden pr-4 max-w-min gap-2">
                <Link href="/reputation">
                  <h2 className="text-xl font-semibold text-right hover:underline">
                    Reputation
                  </h2>
                </Link>
                <Rating className="overflow-hidden" value={4.37} readOnly />
              </div>
              {isOwnProfile ? (
                <ProfileEditButton />
              ) : (
                <ChatButton user={profile?.name} />
              )}
            </div>
          </div>

          <div className="container gap-4 pb-6">
            <div className="flex pb-3 md:pb-6 pt-3 md:pt-6">
              <h2 className="text-lg md:text-2xl font-semibold truncate">
                My collections
              </h2>
              {isOwnProfile && <AddCollectionButton />}
            </div>
            <div className="container border rounded-2xl pt-3 pb-3">
              <Carousel>
                {collections.map((src, i) => {
                  return (
                    <div key={i} className="">
                      <div className="relative aspect-10/50 mt-6 mb-6 h-16 xs:h-24 w-auto mr-3 ml-3">
                        <Image
                          src={src}
                          sizes="(max-width: 475px) 6rem" // Fix this later
                          fill
                          className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                          alt="alt"
                        />
                      </div>
                    </div>
                  )
                })}
              </Carousel>
            </div>
            <div className="flex pb-3 md:pb-6 pt-3 md:pt-6">
              <h2 className="text-lg md:text-2xl font-semibold truncate">
                Looking for
              </h2>
              {isOwnProfile && <AddCollectionButton />}
            </div>
            <div className="container border rounded-2xl pt-6 pb-6">
              <Carousel>
                {images.map((src, i) => {
                  return (
                    <div
                      className="relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3 w-auto"
                      key={i}
                    >
                      <Image
                        src={src}
                        sizes="(max-width: 475px) 24rem" // Fix this later
                        fill
                        className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 rounded-2xl"
                        alt="alt"
                      />
                    </div>
                  )
                })}
              </Carousel>
            </div>
            <div className="flex pb-3 md:pb-6 pt-3 md:pt-6">
              <h2 className="text-lg md:text-2xl font-semibold truncate">
                Willing to trade
              </h2>
              {isOwnProfile && <AddCollectionButton />}
            </div>
            <div className="container border rounded-2xl pt-6 pb-6">
              <Carousel>
                {images.map((src, i) => {
                  return (
                    <div
                      className="relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3 w-auto"
                      key={i}
                    >
                      <Image
                        src={src}
                        sizes="(max-width: 475px) 24rem" // Fix this later
                        fill
                        className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 rounded-2xl"
                        alt="alt"
                      />
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
    <>
      <GeneralNavBar />
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    </>
  )
}

/**
 * Todo later:
 *
 * - Move to smaller components. Shouldn't put everything client side
 * - Add skeleton so we don't get NaN errors
 * - Profile getting is buggy right now
 * - Stars should be out of 5
 */
