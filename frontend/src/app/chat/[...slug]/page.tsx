'use client'

import React from 'react'
import useSWR from 'swr'
import { GeneralNavBar } from '@/components/general-navbar'
import { ChatPage } from '@/components/chat-page'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const fetcher = (url: string, receiver: string) =>
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'update-type': 'name',
    },
    body: JSON.stringify({ name: receiver }),
  }).then((res) => res)

export default function ChatOverviewPage({
  params,
}: {
  params: { slug: string }
}) {
  const receiver = params?.slug[0]
  const { data } = useSWR('/api/chat/create', (url) => fetcher(url, receiver))

  React.useEffect(() => {
    if (data?.redirected && data?.url) {
      redirect('/dashboard')
    }
  }, [data])

  return (
    <>
      <GeneralNavBar />
      <ChatPage receiver={receiver} />
    </>
  )
}
