'use client'

import * as React from 'react'

type FormattedChat = {
  id: number,
  latestMessage: string,
  users: string[]
}

export default function ChatList() {
  const [chats, setChats] = React.useState<FormattedChat[]>([])

  React.useEffect(() => {
    // Fetching chat list by making call to api route
    const fetchChats = async () => {
      const response = await fetch('/api/chat/retrieve', {
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
  }, [chats])

  return (
    <div className="space-y-4 min-w-full flex-grow">
      {chats.map((chat, index) => (
        <div
          key={index}
        >
          {chat.toString()}
        </div>
      ))}
    </div>
  )
}
