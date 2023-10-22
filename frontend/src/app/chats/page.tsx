import React from 'react'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import { TypographyH2 } from '@/components/ui/assets/typography-h2'
import ChatList from '@/components/ui/page/chat-list'

export default function ChatListPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <GeneralNavBar />
      <section className="space pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4">
          <TypographyH2 text="Active chats" />
          <ChatList />
        </div>
      </section>
    </div>
  )
}
