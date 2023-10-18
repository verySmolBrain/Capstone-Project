'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from './ui/input'
import { SendMessageButton } from './ui/button/send-message-button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { messageSchema } from '@/lib/validation/chat'
import { useForm } from 'react-hook-form'
import LinkParser from 'react-link-parser'
import * as z from 'zod'
import useSWR from 'swr'

enum MessageType {
  USER,
  RECEIVER,
}

type Message = {
  type: MessageType
  content: string
  timestamp: Date
}

type Props = {
  receiver: string
}

type FormData = z.infer<typeof messageSchema>

export function ChatPage({ receiver }: Props) {
  const [messages, setMessages] = React.useState<Message[]>([])
  const { register, reset, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(messageSchema),
  })
  const messagesEndRef = React.useRef<null | HTMLDivElement>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

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
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/chat/${receiver}`,
    fetcher,
    { refreshInterval: 2500 }
  )

  React.useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages)
    }
  }, [data])

  async function onSubmit(data: FormData) {
    setMessages([
      ...messages,
      {
        type: MessageType.USER,
        content: data.message,
        timestamp: new Date(),
      },
    ])

    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/chat/send/${receiver}`,
      {
        // Add a check later and raise toast
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'update-type': 'name',
          authorization: token!,
        },
        body: JSON.stringify({
          messageContents: data.message,
          receiver: receiver,
        }),
      }
    )

    reset()
    scrollToBottom()
  }

  // Array of watchers which specify how to render certain string types (i.e links)
  const linkWatcher = [
    {
      watchFor: 'http',
      render: (url: string) => (
        <u>
          <a href={url} target="_blank" rel="noreferrer noopener nofollow">
            {url}
          </a>
        </u>
      ),
    },
    {
      watchFor: 'www.',
      render: (url: string) => (
        <u>
          <a
            href={'http://' + url.slice(url.lastIndexOf('w') + 2)}
            target="_blank"
            rel="noreferrer noopener nofollow"
          >
            {url}
          </a>
        </u>
      ),
    },
  ]

  return (
    <div className="container flex w-screen pt-4 pb-24 min-w-full flex-grow overflow-x-hidden">
      <div className="space-y-4 min-w-full flex-grow">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'flex w-max max-w-[90%] flex-col gap-2 rounded-lg px-3 py-2 text-sm break-all',
              message.type === MessageType.USER
                ? 'ml-auto bg-primary text-primary-foreground'
                : 'bg-muted'
            )}
          >
            <LinkParser watchers={linkWatcher}>{message.content}</LinkParser>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-2 min-w-full pt-4 fixed inset-x-0 bottom-8 pr-4 pl-4 z-10">
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
      <div className="bg-primary-foreground fixed inset-x-1 bottom-0 h-20 z-0"></div>
    </div>
  )
}
