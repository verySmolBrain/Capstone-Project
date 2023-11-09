'use client'

import * as React from 'react'

import { Rating } from '@smastrom/react-rating'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import useSWR from 'swr'

export function PersonalProfileRating({ username }: { username: string }) {
  const [rating, setRating] = React.useState(0)
  const [profileReviews, setProfileReviews] = React.useState<ProfileReview[]>(
    []
  )

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

  const { data: profileReviewsData } = useSWR<ProfileReview[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/reviews/profile/${username}`,
    fetcher,
    { refreshInterval: 5000 }
  )

  React.useEffect(() => {
    if (profileReviewsData) {
      const averageRating =
        profileReviewsData.reduce((a, b) => a + b.review, 0) /
        profileReviewsData.length
      setRating(Number.isNaN(averageRating) ? 0 : averageRating)
      setProfileReviews(profileReviewsData)
    }
  }, [profileReviewsData])

  return (
    <>
      {' '}
      <Rating className="overflow-hidden" value={rating} readOnly />
      <span className="text-sm font-medium leading-none">
        ( Reviews: {profileReviews.length} )
      </span>
    </>
  )
}
