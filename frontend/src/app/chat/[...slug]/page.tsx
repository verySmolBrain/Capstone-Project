'use client'

import React from 'react'
import useSWR from 'swr'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import { ChatPage } from '@/components/ui/page/chat-page'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/lib/database.types'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const dynamic = 'force-dynamic'

const fetcher = async (
  url: string,
  receiver: string,
  router: AppRouterInstance
) => {
  const supabase = createClientComponentClient<Database>()
  const token = (await supabase.auth.getSession()).data.session?.access_token

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token!,
      'update-type': 'name',
    },
    body: JSON.stringify({ receiverName: receiver }),
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
