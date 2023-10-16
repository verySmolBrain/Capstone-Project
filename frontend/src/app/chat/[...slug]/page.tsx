'use client'

import React from 'react'
import useSWR from 'swr'
import { GeneralNavBar } from '@/components/general-navbar'
import { ChatPage } from '@/components/chat-page'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/lib/database.types'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const dynamic = 'force-dynamic'

const fetcher = (url: string, receiver: string) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token!,
      'update-type': 'name',
    },
    body: JSON.stringify({ receiverName: receiverName }),
  })

  if (res?.ok) {
    return res
  }

  router.push('/dashboard')
}

export default function ChatOverviewPage({
  params,
}: {
  params: { slug: string }
}) {
  const router = useRouter()
  const receiver = params?.slug[0]
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/chat/${receiver}`,
    (url: string) => fetcher(url, receiver, router)
  )

  if (!data) {
    return null // Loading screen later
  }

  return (
    <>
      <GeneralNavBar />
      <ChatPage receiver={receiver} />
    </>
  )
}
