'use client'

import * as React from 'react'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { Loader2 } from 'lucide-react'
import { CreateForumPostButton } from '../button/create-forum-post-button'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default function ForumList({ campaign }: { campaign: string }) {
  const [forumPosts, setForumPosts] = React.useState<ForumPost[]>()

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

  const { data: forumPostData, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/${campaign}/forum`,
    fetcher,
    { refreshInterval: 2500 }
  )

  React.useEffect(() => {
    if (forumPostData) {
      console.log(forumPostData)
      setForumPosts(forumPostData)
    }
  }, [forumPostData])

  if (forumPosts) {
    if (forumPosts.length === 0) {
      return (
        <div className="flex items-center justify-center flex-col gap-2">
          <h1 className="text-xl font-semibold tracking-tight">
            No messages in the Forum!
          </h1>
          <CreateForumPostButton campaign={campaign} mutate={mutate} />
        </div>
      )
    } else {
      return (
        <div className="flex flex-col items-center justify-center gap-5">
          <CreateForumPostButton campaign={campaign} mutate={mutate} />
          <section className="flex flex-col gap-3 pb-10">
            {forumPosts.map((forumPost, index) => (
              <Link href={`/posts/${forumPost.id}`} key={index}>
                <div className="container w-[400px] md:w-[600px] lg:w-[800px] flex flex-col gap-2 border rounded-2xl justify-start items-start pr-4 pl-4 pb-4 pt-4">
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-2xl font-semibold truncate">
                      {forumPost.title}
                    </p>
                    <p className="text-xs">
                      Posted by {forumPost.author.name}{' '}
                      {dayjs(forumPost.createdAt).fromNow()}
                    </p>
                  </div>

                  <p className="line-clamp-3 w-full break-all">
                    {forumPost.description}
                  </p>
                  <p className="text-xs">
                    {forumPost.comments?.length ?? 0} Comments
                  </p>
                </div>
              </Link>
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
