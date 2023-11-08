'use client'

import Image from 'next/image'
import * as React from 'react'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { Loader2, User } from 'lucide-react'
import { Rating } from '@smastrom/react-rating'
import { Avatar } from '../avatar'

export function CampaignReviewList({ campaign }: { campaign: string }) {
  const [campaignReviews, setCampaignReviews] = React.useState<
    CampaignReview[]
  >([])

  const fetcher = async (url: string) => {
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

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

  const { data: profileReviewsData } = useSWR<CampaignReview[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/reviews/campaign/${campaign}`,
    fetcher,
    { refreshInterval: 5000 }
  )

  React.useEffect(() => {
    if (profileReviewsData) {
      setCampaignReviews(profileReviewsData)
    }
  }, [profileReviewsData])

  if (campaignReviews) {
    if (campaignReviews.length === 0) {
      return (
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            This campaign has no reviews!
          </h1>
        </div>
      )
    } else {
      return (
        <div>
          <section className="space-y-10 pb-8 pt-6 md:pb-12 md:pt-10">
            {campaignReviews.map((review, index) => (
              <div key={index}>
                <a href={`/profile/${review.reviewer.name}`}>
                  <div className="flex items-center gap-4 border rounded-2xl pt-6 pb-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden ml-6 shrink-0">
                      {review.reviewer.image ? (
                        <Image
                          src={
                            review.reviewer.image ? review.reviewer.image : ''
                          } // change this to skeleton
                          fill
                          className="object-cover w-full h-full"
                          alt="profile picture"
                        />
                      ) : (
                        <Avatar className="flex items-center justify-center w-full h-full">
                          <User className="w-10 h-10" />
                        </Avatar>
                      )}
                    </div>
                    <div className="flex flex-col gap-4 overflow-hidden">
                      <p className="text-2xl font-semibold truncate">
                        {review.reviewer.name}
                      </p>

                      <div className="w-28">
                        <Rating value={review.review} readOnly />
                      </div>

                      <hr></hr>
                      <div className="text-500 truncate">
                        {review.description}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </section>
        </div>
      )
    }
  } else {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    )
  }
}
