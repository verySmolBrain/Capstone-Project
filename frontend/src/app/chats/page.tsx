'use client'

import React from 'react'
import { GeneralNavBar } from '@/components/general-navbar'
import { TypographyH2 } from '@/components/typography-h2'
import ChatList from '@/components/chat-list'

export default function ChatListPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <GeneralNavBar />
      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4">
          <TypographyH2 text="Active chats" />
        </div>
        <ChatList />
      </section>
    </div>
  )
}