import React from 'react'

import { IconLogo } from '@/components/ui/assets/IconLogo'
import { BackButton } from '@/components/ui/button/back-button'
import Link from 'next/link'

type Chat = z.infer<typeof >

export default async function ChatOverviewPage() {
    const res = await fetch('/chats', {
        method: 'GET'
    })
    const chats = await res.json()

    if (!chats) {
        return null
    }

    return (
        <div>
            {chats.map((chat, index) => (
                <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    {chat.text}
                </div> 
            ))}
        </div>
    )
}
