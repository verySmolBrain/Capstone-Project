import React from 'react'

import { GeneralNavBar } from '@/components/general-navbar'
import { ChatList } from '@/components/chat-list'

export default function ChatOverviewPage({
  params,
}: {
  params: { slug: string }
}) {
  const receiver = params?.slug

  return (
    <>
      <GeneralNavBar />
      <ChatList />
    </>
  )
}
