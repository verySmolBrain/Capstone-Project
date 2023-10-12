'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from './ui/input'
import { SendMessageButton } from './ui/button/send-message-button'
import _ from 'lodash'

import { zodResolver } from '@hookform/resolvers/zod'
import { messageSchema } from '@/lib/validation/chat'
import { useForm } from 'react-hook-form'
import LinkParser from "react-link-parser";
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

  React.useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`/api/chat/${receiver}`, {
        // Add a check later and raise toast
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      const newMessagesOmittedTimestamp = _.omit(data.messages, 'prop2')
      const messagesOmittedTimestamp = _.omit(messages, 'prop2')

      console.log('newMessagesOmittedTimestamp', newMessagesOmittedTimestamp)
      console.log('messagesOmittedTimestamp', messagesOmittedTimestamp)
      console.log(
        _.isEqual(newMessagesOmittedTimestamp, messagesOmittedTimestamp)
      )

      if (
        !_.isEqual(newMessagesOmittedTimestamp, messagesOmittedTimestamp) &&
        data.messages.length >= messages.length
      ) {
        setMessages(data.messages) // Fix this sometime
      }
    }

    fetchMessages()
    const timeout = setTimeout(fetchMessages, 5000)
    return () => clearTimeout(timeout)
  }, [messages, receiver])

  async function onSubmit(data: FormData) {
    setMessages([
      ...messages,
      {
        type: MessageType.USER,
        content: data.message,
        timestamp: new Date(),
      },
    ])

    await fetch('/api/chat/send', {
      // Add a check later and raise toast
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'update-type': 'name',
      },
      body: JSON.stringify({
        messageContents: data.message,
        receiver: receiver,
      }),
    })

    reset()
    scrollToBottom()
  }

  // Array of watchers which specify how to render certain string types (i.e links)
  const linkWatcher = [
    {
      watchFor: "http",
      render: (url: string) => (
        <u><a href={url} target="_blank" rel="noreferrer noopener nofollow">
          {url}
        </a></u>
      ),
    },
    {
      watchFor: "www.",
      render: (url: string) => (
        <u><a href={"http://" + url.slice(url.lastIndexOf('w') + 2)} target="_blank" rel="noreferrer noopener nofollow">
          {url}
        </a></u>
      ),
    },
  ];

  return (
    <div className="container flex w-screen pt-4 pb-24 min-w-full flex-grow overflow-x-hidden">
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
            <LinkParser watchers={linkWatcher}>{message.content}</LinkParser>
          </div>
        ))}
      </div>
      <div ref={messagesEndRef} />
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
