'use client'

import * as React from 'react'

import { Rating } from '@smastrom/react-rating'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import useSWR from 'swr'
import Link from 'next/link'

export function ManagerCampaignRating({ campaign }: { campaign: string }) {
  const [rating, setRating] = React.useState(0)
  const [campaignReviews, setCampaignReviews] = React.useState<
    CampaignReview[]
  >([])

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

  const { data: campaignReviewsData } = useSWR<CampaignReview[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/reviews/campaign/${campaign}`,
    fetcher,
    { refreshInterval: 5000 }
  )

  React.useEffect(() => {
    if (campaignReviewsData) {
      const averageRating =
        campaignReviewsData.reduce((a, b) => a + b.review, 0) /
        campaignReviewsData.length
      setRating(Number.isNaN(averageRating) ? 0 : averageRating)
      setCampaignReviews(campaignReviewsData)
    }
  }, [campaignReviewsData])

  return (
    <>
      {' '}
      <Rating className="overflow-hidden" value={rating} readOnly />
      <span className="text-sm font-medium leading-none hover:underline">
        <Link href={`/campaign/reviews/${campaign}`}>
          Reviews: {campaignReviews.length}
        </Link>
      </span>
    </>
  )
}
