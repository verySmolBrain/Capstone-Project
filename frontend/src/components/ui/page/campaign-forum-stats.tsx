'use client'
import * as React from 'react'

import { Database } from '@/lib/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import useSWR from 'swr'
import dayjs from 'dayjs'
import Link from 'next/link'

export function ForumStats({ campaign }: { campaign: string }) {
  const [forumPosts, setForumPosts] = React.useState<ForumPost[]>()
  let uniqueUserCount = 0
  let uniquePosterCount = 0
  let uniqueCommenterCount = 0

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

  const { data: forumPostData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/${campaign}/forum`,
    fetcher,
    { refreshInterval: 2500 }
  )

  React.useEffect(() => {
    if (forumPostData) {
      setForumPosts(forumPostData)
    }
  }, [forumPostData])

  if (forumPosts) {
    const forumPosters = forumPosts.map((x) => x.authorId)
    const commentPosters = forumPosts.map((x) =>
      x.comments.map((y) => y.author.id)
    )
    uniqueUserCount = new Set(forumPosters.concat(...commentPosters)).size
    uniquePosterCount = new Set(forumPosters).size
    uniqueCommenterCount = new Set(commentPosters).size
  }

  return (
    <div>
      <p className="text-sm font-medium">Forum stats</p>
      <div className="flex text-sm justify-between">
        <div>
          <p>{uniqueUserCount} unique user(s)</p>
          <p>
            {forumPosts ? forumPosts.length : 0} post(s) by {uniquePosterCount}{' '}
            user(s)
          </p>
          <p>
            {forumPosts
              ? forumPosts.reduce(
                  (accumulator, curr) => accumulator + curr.comments.length,
                  0
                )
              : 0}{' '}
            comment(s) by {uniqueCommenterCount} user(s)
          </p>
          <hr></hr>
          <p>
            Latest post{' '}
            {forumPosts && forumPosts.length > 0
              ? `${dayjs(
                  forumPosts[forumPosts.length - 1].createdAt
                ).fromNow()} by `
              : 'never'}
            {forumPosts && forumPosts.length > 0 ? (
              <Link
                href={`../profile/${
                  forumPosts[forumPosts.length - 1].author.name
                }`}
                className="hover:underline"
              >
                {forumPosts[forumPosts.length - 1].author.name}
              </Link>
            ) : (
              ''
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
