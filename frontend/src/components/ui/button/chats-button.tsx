'use client'

import * as React from 'react'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ChatsButton() {
    return (
        <Link href="chats">
            {' '}
            <Button variant="outline" size="icon">
                <MessageSquare className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            </Button>
        </Link>
    )
}
