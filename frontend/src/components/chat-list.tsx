'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from './ui/input'
import { SendMessageButton } from './ui/button/send-message-button'

import { zodResolver } from '@hookform/resolvers/zod'
import { messageSchema } from '@/lib/validation/chat'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

enum MessageType {
  USER,
  RECEIVER,
}

type Message = {
  type: MessageType
  content: string
  timestamp: Date
}

type FormData = z.infer<typeof messageSchema>

export function ChatList() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const { register, reset, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(messageSchema),
  })

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

  async function onSubmit(data: FormData) {
    setMessages([
      ...messages,
      {
        type: MessageType.USER,
        content: data.message,
        timestamp: new Date(),
      },
    ])
    reset()
  }

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-2 min-w-full pt-4 fixed inset-x-0 bottom-8 pr-4 pl-4">
          <Input
            id="message"
            placeholder="Type your message..."
            className="w-full"
            autoComplete="off"
            {...register('message')}
          />
          <SendMessageButton />
        </div>
      </form>
    </div>
  )
}
