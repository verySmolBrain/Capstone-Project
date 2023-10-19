'use client'

import Image from 'next/image'
import * as React from 'react'
import { format } from 'date-fns'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

type FormattedChat = {
  id: number
  latestMessage?: Message | null | undefined
  receiver: Receiver
  image: string
}

type Receiver = {
  description: string
  id: string
  image: string
  name: string
  reputation: number
}

export default function ChatList() {
  const [chats, setChats] = React.useState<FormattedChat[]>([])

  const fetcher = async (url: string) => {
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    console.log('a')

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token!,
      },
    })

    console.log('b')

    if (res?.ok) {
      return await res.json()
    }
  }

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/chats`,
    fetcher,
    { refreshInterval: 2500 }
  )

  React.useEffect(() => {
    if (data) {
      console.log(data)
      setChats(data.chats)
    }
  }, [data])

  if (chats.length === 0) {
    return (
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          You&apos;ve no one to talk to 😢
        </h1>
      </div>
    )
  }

  return (
    <div>
      <section className="space-y-10 pb-8 pt-6 md:pb-12 md:pt-10">
        {chats.map((chat, index) => (
          <div key={index}>
            <a href={`/chat/${chat.receiver.name}`}>
              <div className="container flex items-center gap-4 border rounded-2xl pt-6 pb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden ">
                  <Image // make it so no crash if invalid source
                    src={chat.image}
                    layout="fill"
                    className="object-cover w-full h-full"
                    alt="profile picture"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-2xl font-semibold">{chat.receiver.name}</p>
                  <div className="text-xs text-gray-400	 -mt-3">
                    {chat?.latestMessage?.updatedAt
                      ? format(
                          new Date(chat.latestMessage.updatedAt),
                          'h:mm a'
                        ) +
                        ' on ' +
                        format(new Date(chat.latestMessage.updatedAt), 'd/M/y')
                      : ''}
                  </div>
                  <div
                    className="text-500 overflow-hidden"
                    style={{
                      maxHeight: '3em',
                      maxWidth: '69em',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {chat?.latestMessage?.content
                      ? chat.latestMessage.content
                      : ''}
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
