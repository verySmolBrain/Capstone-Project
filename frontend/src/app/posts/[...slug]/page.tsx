'use client'

import * as React from 'react'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { Loader2, User } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import { CreatePostCommentButton } from '@/components/ui/button/create-post-comment-button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import Link from 'next/link'
import { ReportCommentButton } from '@/components/ui/button/report-comment-button'
import { Role } from '@/lib/utils'

dayjs.extend(relativeTime)

export default function ForumPost({ params }: { params: { slug: string } }) {
  const [forumPost, setForumPost] = React.useState<ForumPost>()

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
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/forum/${params.slug}`,
    fetcher,
    { refreshInterval: 2500 }
  )

  React.useEffect(() => {
    if (forumPostData) {
      console.log(forumPostData)
      setForumPost(forumPostData)
    }
  }, [forumPostData])

  function MainTopic(forumPost: ForumPost) {
    return (
      <div className="container w-[400px] md:w-[600px] lg:w-[800px] flex flex-col gap-2 border rounded-2xl justify-start items-start pr-4 pl-4 pb-4 pt-4 mt-4 mb-2">
        <div className="flex flex-row justify-between w-full pb-4">
          <p className="text-2xl font-semibold truncate">{forumPost.title}</p>
          <div>
            <p className="text-xs">
              Posted by{' '}
              <Link
                href={`../profile/${forumPost.author.name}`}
                className="hover:underline"
              >
                {forumPost.author.name}
              </Link>{' '}
              {dayjs(forumPost.createdAt).fromNow()}
            </p>
            <div className="float-right pt-2">
              {(forumPost.author.user.role.toString() as Role) ===
                Role.MANAGER && (
                <p className="flex flex-row justify-center items-center text-sm font-semibold text-primary bg-secondary rounded-2xl max-w-fit min-w-[150px]">
                  Campaign Manager
                </p>
              )}{' '}
              {(forumPost.author.user.role.toString() as Role) ===
                Role.ADMIN && (
                <p className="flex flex-row justify-center items-center text-sm font-semibold text-primary bg-destructive rounded-2xl max-w-fit min-w-[100px]">
                  Admin
                </p>
              )}{' '}
            </div>
          </div>
        </div>

        <p>{forumPost.description}</p>
        <p className="text-xs pt-4">
          {forumPost.comments?.length ?? 0} Comments
        </p>
      </div>
    )
  }

  if (forumPost) {
    if (forumPost?.comments?.length === 0) {
      return (
        <>
          <GeneralNavBar />
          <div className="flex items-center justify-center flex-col gap-4">
            <MainTopic {...forumPost} />
            <h1 className="text-xl font-semibold tracking-tight">
              No messages in this post!
            </h1>
            <CreatePostCommentButton post={params.slug} mutate={mutate} />
          </div>
        </>
      )
    } else {
      return (
        <>
          <GeneralNavBar />
          <div className="flex flex-col items-center justify-center gap-4">
            <MainTopic {...forumPost} />
            <CreatePostCommentButton post={params.slug} mutate={mutate} />
            <section className="flex flex-col gap-3 pb-10">
              {forumPost.comments.map((c, index) => (
                <div
                  key={index}
                  className="container w-[400px] md:w-[600px] lg:w-[800px] flex flex-col gap-2 border rounded-2xl justify-start items-start pr-4 pl-4 pb-4 pt-4"
                >
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-sm font-semibold truncate">
                      <Avatar className="flex items-center justify-center">
                        <AvatarImage
                          src={c.author.image ?? undefined}
                          alt={c.author.name}
                        ></AvatarImage>
                        <AvatarFallback className="flex items-center justify-center">
                          <User />
                        </AvatarFallback>
                      </Avatar>
                    </p>
                    <div>
                      <p className="text-xs">
                        Commented by{' '}
                        <Link
                          href={`../profile/${c.author.name}`}
                          className="hover:underline"
                        >
                          {c.author.name}
                        </Link>{' '}
                        {dayjs(c.createdAt).fromNow()}
                      </p>
                      <div className="float-right pt-2">
                        {(forumPost.author.user.role.toString() as Role) ===
                          Role.MANAGER && (
                          <p className="flex flex-row justify-center items-center text-sm font-semibold text-primary bg-secondary rounded-2xl max-w-fit min-w-[150px]">
                            Campaign Manager
                          </p>
                        )}{' '}
                        {(forumPost.author.user.role.toString() as Role) ===
                          Role.ADMIN && (
                          <p className="flex flex-row justify-center items-center text-sm font-semibold text-primary bg-destructive rounded-2xl max-w-fit min-w-[100px]">
                            Admin
                          </p>
                        )}{' '}
                      </div>
                    </div>
                  </div>

                  <p className="text-base">{c.content}</p>
                  <ReportCommentButton comment={c.id} />
                </div>
              ))}
            </section>
          </div>
        </>
      )
    }
  } else {
    return (
      <>
        <GeneralNavBar />
        <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      </>
    )
  }
}
