'use client'

import * as React from 'react'

import { Rating } from '@smastrom/react-rating'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import useSWR from 'swr'
import { ReviewCampaignForm } from '../form/review-campaign-form'
import Link from 'next/link'

export function ReviewCampaignButton({ campaign }: { campaign: string }) {
  const [open, setOpen] = React.useState(false)
  const [rating, setRating] = React.useState(0) // Change to get request first
  const [userSetRating, setUserSetRating] = React.useState(0)
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

  const { data: campaignReviewsData, mutate } = useSWR<CampaignReview[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/reviews/campaign/${campaign}`,
    fetcher
  )

  React.useEffect(() => {
    if (campaignReviewsData) {
      const averageRating =
        campaignReviewsData.reduce((a, b) => a + b.review, 0) /
        campaignReviewsData.length

      setRating(averageRating)
      setCampaignReviews(campaignReviewsData)
    }
  }, [campaignReviewsData])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Rating
          className="overflow-hidden"
          value={Math.round(rating)}
          onChange={(r: number) => {
            setOpen(true)
            setUserSetRating(r)
          }}
        />
      </DialogTrigger>
      <span className="text-sm font-medium leading-none hover:underline">
        <Link href={`/campaign/reviews/${campaign}`}>
          Reviews: {campaignReviews.length}
        </Link>
      </span>
      <DialogContent className="w-auto m-20">
        <DialogHeader>
          <DialogTitle>Review Campaign</DialogTitle>
        </DialogHeader>
        <div className="flex-col justify-left">
          <ReviewCampaignForm
            rating={userSetRating}
            campaign={campaign}
            mutate={mutate}
            setOpen={setOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
