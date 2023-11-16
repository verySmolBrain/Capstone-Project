'use client'

import Image from 'next/image'
import * as React from 'react'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { Loader2 } from 'lucide-react'
import * as emoji from 'node-emoji'
import dayjs from 'dayjs'

export default function ChatList() {
  const [chats, setChats] = React.useState<FormattedChat[]>()

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

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/chat`,
    fetcher,
    { refreshInterval: 2500 }
  )

  React.useEffect(() => {
    if (data) {
      setChats(data.chats)
    }
  }, [data])

  if (chats) {
    if (chats.length === 0) {
      return (
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            You&apos;ve no one to talk to 😢
          </h1>
        </div>
      )
    } else {
      return (
        <div>
          <section className="space-y-10 pb-8 pt-6 md:pb-12 md:pt-10">
            {chats.map((chat, index) => (
              <div key={index}>
                <a href={`/chat/${chat.receiver.name}`}>
                  <div className="flex items-center gap-4 border rounded-2xl pt-6 pb-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden ml-6 shrink-0">
                      <Image
                        src={
                          chat.image
                            ? chat.image
                            : 'https://upload.wikimedia.org/wikipedia/en/c/ce/Goomba.PNG'
                        }
                        fill
                        className="object-cover w-full h-full"
                        alt="profile picture"
                      />
                    </div>
                    <div className="flex flex-col gap-4 overflow-hidden">
                      <p className="text-2xl font-semibold truncate">
                        {chat.receiver.name}
                      </p>
                      <div className="text-xs text-gray-400	-mt-3 truncate">
                        {chat?.latestMessage?.updatedAt
                          ? dayjs(chat.latestMessage.updatedAt).format(
                              'h:mm a'
                            ) +
                            ' on ' +
                            dayjs(chat.latestMessage.updatedAt).format('D/M/YY')
                          : ''}
                      </div>
                      <div className="text-500 truncate">
                        {chat?.latestMessage?.content
                          ? emoji.emojify(chat.latestMessage.content)
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
  } else {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    )
  }
}
