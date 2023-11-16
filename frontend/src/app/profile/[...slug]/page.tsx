'use client'

import * as React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import useSWR from 'swr'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import Image from 'next/image'
import Link from 'next/link'
import { Carousel } from '@/components/ui/carousel'
import { useRouter } from 'next/navigation'
import { AddCollectionProfileButton } from '@/components/ui/button/add-collection-profile-button'
import { RemoveCollectableFromProfileButton } from '@/components/ui/button/remove-collectable-from-profile-button'
import { Role } from '@/lib/utils'
import { ReviewProfileRating } from '@/components/ui/button/review-profile-rating'
import { LoadingScreen } from '@/components/ui/page/loading-page'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ProfileCollectionCarousel } from '@/components/ui/carousel/profile-collections-carousel'
import { PersonalProfileRating } from '@/components/ui/button/personal-profile-rating'
import { BanUserButton } from '@/components/ui/button/ban-user-button'
import { RedirectButton } from '@/components/ui/button/redirect-button'
import { MessageSquarePlus, Pencil, WalletCards } from 'lucide-react'

enum profileCollection {
  INVENTORY,
  WISHLIST,
  WARES,
}

const default_profile =
  'https://upload.wikimedia.org/wikipedia/en/c/ce/Goomba.PNG'

const default_img =
  'https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg'

const default_badge =
  'https://archives.bulbagarden.net/media/upload/d/dd/Boulder_Badge.png'

export default function ProfilePage({ params }: { params: { slug: string } }) {
  const [profile, setProfile] = React.useState<Profile>()
  const [role, setRole] = React.useState<Role>(Role.NULL)
  const [viewerRole, setViewerRole] = React.useState<Role>(Role.USER)
  const [isOwnProfile, setIsOwnProfile] = React.useState<boolean>(false)
  const [inventory, setInventory] = React.useState<CollectionCollectable>()
  const [wares, setWares] = React.useState<CollectableCount[]>()
  const [wishlist, setWishlist] = React.useState<CollectableCount[]>()
  const [achievements, setAchievements] = React.useState<Achievement[]>([])
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

  const { data: inventoryData, mutate: inventoryMutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/inventory/${params.slug}`,
    fetcher,
    { refreshInterval: 3000 }
  )

  const { data: waresData, mutate: waresMutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/wares/${params.slug}`,
    fetcher,
    { refreshInterval: 3000 }
  )

  const { data: wishlistData, mutate: wishlistMutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/wishlist/${params.slug}`,
    fetcher,
    { refreshInterval: 3000 }
  )

  const { data: roleData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/role/${params.slug}`,
    fetcher,
    { refreshInterval: 3000 }
  )

  const { data: achievementsData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/achievement`,
    fetcher,
    { refreshInterval: 3000 }
  )

  React.useEffect(() => {
    const getViewerRole = async () => {
      const supabase = createClientComponentClient<Database>()
      const session = (await supabase.auth.getSession()).data.session
      const token = session?.access_token
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/role`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: token!,
          },
        }
      )
      if (res.ok) {
        const roleData = await res.json()
        if (roleData.role === Role.ADMIN) {
          setViewerRole(Role.ADMIN)
        } else if (roleData.role === Role.MANAGER) {
          setViewerRole(Role.MANAGER)
        } else if (roleData.role === Role.USER) {
          setViewerRole(Role.USER)
        }
      }
    }
    if (profileData?.data) {
      setProfile(profileData?.data)

      if (ownProfileData?.data?.name === params.slug[0]) {
        setIsOwnProfile(true)
      }
    }
    if (inventoryData) {
      setInventory(inventoryData)
    }
    if (waresData) {
      setWares(waresData)
    }
    if (wishlistData) {
      setWishlist(wishlistData)
    }
    if (roleData) {
      setRole((roleData?.role as Role) ?? Role.NULL)
    }
    if (achievementsData) {
      setAchievements(achievementsData)
    }
    getViewerRole()
  }, [
    profileData?.data,
    ownProfileData?.data,
    params.slug,
    inventoryData,
    waresData,
    wishlistData,
    roleData,
    achievementsData,
    viewerRole,
  ])

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
              className="h-20 w-20 rounded-full "
              alt="profile picture"
            />
            <div className="flex flex-col order-last gap-2 md:order-none w-screen md:w-fit">
              <h2 className="text-2xl font-semibold truncate">
                {profile?.name}
              </h2>
              {role === Role.MANAGER && (
                <p className="flex flex-row justify-center items-center text-sm font-semibold text-primary bg-secondary rounded-2xl max-w-fit min-w-[100px]">
                  Manager
                </p>
              )}
              {role === Role.ADMIN && (
                <p className="flex flex-row justify-center items-center text-sm font-semibold text-primary bg-destructive rounded-2xl max-w-fit min-w-[100px]">
                  Admin
                </p>
              )}
              <hr />
              <p className="text-sm font-normal break-words md:max-w-[400px] lg:max-w-[600px]">
                {profile?.description}
              </p>
            </div>
            <div className="ml-auto flex flex-row gap-2">
              <div className="flex flex-col overflow-hidden pr-4 max-w-min gap-2">
                <Link href={`/profile/reviews/${profile.name}`}>
                  <h2 className="text-xl font-semibold text-right hover:underline">
                    Reputation
                  </h2>
                </Link>
                {isOwnProfile ? (
                  <PersonalProfileRating username={profile.name} />
                ) : (
                  <ReviewProfileRating username={profile.name} />
                )}
              </div>
              {isOwnProfile ? (
                <RedirectButton url={'/settings'} Icon={Pencil} />
              ) : (
                <RedirectButton
                  url={`/chat/${profile?.name}`}
                  Icon={MessageSquarePlus}
                />
              )}
              {role === Role.USER && (
                <RedirectButton
                  url={`/profile/trade/${profile?.name}`}
                  Icon={WalletCards}
                />
              )}
              {viewerRole === Role.ADMIN && !profile.banned && (
                <BanUserButton user={profile?.id} />
              )}
            </div>
          </div>
          <div className="container gap-4 pb-6">
            <div className="flex pb-3 md:pb-6 pt-3 md:pt-6">
              <h2 className="text-lg md:text-2xl font-semibold truncate w-full">
                {isOwnProfile ? 'My' : 'Their'} Achievements
              </h2>
            </div>
            <div className="container border rounded-2xl pt-6 pb-6">
              <Carousel>
                {achievements?.map((achievement, i) => {
                  const hasAchievement = achievement.users.find(
                    (u) => u.id == profile.id
                  )
                  return (
                    <div key={i} className="pt-5">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="mt-6 mb-6 mr-3 ml-3 w-auto">
                              <Link href={`/achievement/${achievement.id}`}>
                                <Image
                                  src={achievement.image ?? default_badge}
                                  width={125}
                                  height={125}
                                  className={
                                    'rounded-full object-cover transition-transform duration-300 transform hover:translate-y-3 border-primary border-1' +
                                    (!hasAchievement ? ' grayscale' : '')
                                  }
                                  alt={achievement.id}
                                />
                              </Link>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="md:text-base w-full text-center">
                              {achievement.name}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )
                })}
              </Carousel>
            </div>
            <div className="flex pb-3 md:pb-6 pt-3 md:pt-6">
              <h2 className="text-lg md:text-2xl font-semibold truncate w-full">
                {isOwnProfile ? 'My' : 'Their'} Collectables
              </h2>
              {isOwnProfile && (
                <AddCollectionProfileButton
                  type={profileCollection.INVENTORY}
                  mutate={inventoryMutate}
                />
              )}
            </div>
            <div className="container border rounded-2xl pt-3 pb-3">
              {Object.keys(inventory ?? {})?.length ? (
                <ProfileCollectionCarousel
                  inventory={inventory ?? {}}
                  isOwnProfile={isOwnProfile}
                  default_img={default_img}
                  inventoryMutate={inventoryMutate}
                />
              ) : (
                <div className="flex flex-col justify-center items-center h-[464px]">
                  <h2 className="place-self-center">
                    {isOwnProfile ? 'You' : 'I'} have no collectables. &#128533;
                  </h2>
                </div>
              )}
            </div>
            <div className="flex pb-3 md:pb-6 pt-3 md:pt-6">
              <h2 className="text-lg md:text-2xl font-semibold truncate w-full">
                Looking for
              </h2>
              {isOwnProfile && (
                <AddCollectionProfileButton
                  type={profileCollection.WISHLIST}
                  mutate={wishlistMutate}
                />
              )}
            </div>
            <div className="container border rounded-2xl pt-6 pb-6">
              {wishlist?.length ? (
                <Carousel>
                  {wishlist?.map((collectable, i) => {
                    return (
                      <div key={i} className="pt-5">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="group relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3 w-auto">
                                <Link href={`/collectable/${collectable.name}`}>
                                  <Image
                                    src={
                                      collectable.collectable.image
                                        ? collectable.collectable.image
                                        : default_img
                                    }
                                    sizes="(max-width: 475px) 6rem" // Fix this later
                                    fill
                                    className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                                    alt={collectable.name}
                                  />
                                  {isOwnProfile && (
                                    <div
                                      onClick={(e) => {
                                        e.preventDefault()
                                      }}
                                    >
                                      <RemoveCollectableFromProfileButton
                                        type={profileCollection.WISHLIST}
                                        collectable={collectable.name}
                                        mutate={wishlistMutate}
                                      />
                                    </div>
                                  )}
                                </Link>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="md:text-base w-full text-center">
                                {collectable.name} x{collectable.count}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )
                  })}
                </Carousel>
              ) : (
                <div className="flex flex-col justify-center items-center h-[464px]">
                  <h2 className="place-self-center">
                    {isOwnProfile ? 'You' : 'I'} want no collectables. &#128533;
                  </h2>
                </div>
              )}
            </div>
            <div className="flex pb-3 md:pb-6 pt-3 md:pt-6">
              <h2 className="text-lg md:text-2xl font-semibold truncate w-full">
                Willing to trade
              </h2>
              {isOwnProfile && (
                <AddCollectionProfileButton
                  type={profileCollection.WARES}
                  mutate={waresMutate}
                />
              )}
            </div>
            <div className="container border rounded-2xl pt-6 pb-6">
              {wares?.length ? (
                <Carousel>
                  {wares?.map((collectable, i) => {
                    return (
                      <div key={i} className="pt-5">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="group relative aspect-63/88 mt-6 mb-6 h-60 xs:h-96 mr-3 ml-3 w-auto">
                                <Link href={`/collectable/${collectable.name}`}>
                                  <Image
                                    src={
                                      collectable.collectable?.image
                                        ? collectable.collectable.image
                                        : default_img
                                    }
                                    sizes="(max-width: 475px) 6rem" // Fix this later
                                    fill
                                    className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                                    alt={collectable.name}
                                  />
                                  {isOwnProfile && (
                                    <div
                                      onClick={(e) => {
                                        e.preventDefault()
                                      }}
                                    >
                                      <RemoveCollectableFromProfileButton
                                        type={profileCollection.WARES}
                                        collectable={collectable.name}
                                        mutate={waresMutate}
                                      />
                                    </div>
                                  )}
                                </Link>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="md:text-base w-full text-center">
                                {collectable.name} x{collectable.count}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )
                  })}
                </Carousel>
              ) : (
                <div className="flex flex-col justify-center items-center h-[464px]">
                  <h2 className="place-self-center">
                    {isOwnProfile ? 'You are' : 'I am'} selling no collectables.
                    &#128533;
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <LoadingScreen />
  )
}
