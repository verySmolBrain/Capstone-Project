'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from './ui/input'
import { SendMessageButton } from './ui/button/send-message-button'

enum MessageType {
  USER,
  RECEIVER,
}

type Message = {
  type: MessageType
  content: string
  timestamp: Date
}

export function ChatList() {
  const [messages, setMessages] = React.useState<Message[]>([])

  React.useEffect(() => {
    const chats = async () => {
      setMessages([
        {
          type: MessageType.USER,
          content: 'Hello',
          timestamp: new Date(),
        },
        {
          type: MessageType.RECEIVER,
          content: 'Hi',
          timestamp: new Date(),
        },
        {
          type: MessageType.USER,
          content: 'How are you?',
          timestamp: new Date(),
        },
      ])
    }
    chats()
  }, [])

  return (
    <div className="container flex w-screen flex-col items-center pt-4">
      <div className="space-y-4 min-w-full flex-grow">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
              message.type === MessageType.USER
                ? 'ml-auto bg-primary text-primary-foreground'
                : 'bg-muted'
            )}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-2 min-w-full pt-4 fixed inset-x-0 bottom-8 pr-4 pl-4">
        <Input
          id="message"
          placeholder="Type your message..."
          className="w-full"
          autoComplete="off"
        />
        <SendMessageButton />
      </div>
    </div>
  )
}
