'use client'

import Image from 'next/image'
import * as React from 'react'

type FormattedChat = {
  id: number,
  latestMessage: string,
  receiver: string,
  image: string
}

export default function ChatList() {
  const [chats, setChats] = React.useState<FormattedChat[]>([])

  React.useEffect(() => {
    // Fetching chat list by making call to api route
    const fetchChats = async () => {
      const response = await fetch('/api/chat', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      setChats(data.chats)
    }
    fetchChats()
    const timeout = setTimeout(fetchChats, 5000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div>
      <section className="space-y-16 pb-8 pt-6 md:pb-12 md:pt-10">
        {chats.map((chat, index) => (
          <div key={index}>
            <a href = {`/chat/${chat.receiver}`}>
            <div className="container flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={chat.image}
                  layout="fill"
                  className="object-cover w-full h-full"
                  alt="profile picture"
                />
              </div>
              <div className="flex flex-col gap-3.5">
                <p className="text-2xl font-semibold">{chat.receiver}</p>
                <p className="text-500">{chat.latestMessage}</p>
              </div>
            </div>
            </a>
          </div>
        ))
        }
      </section >
    </div >
  )
}
