'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { toast } from '../use-toast'

export function DeclineTradeButton({
  tradeId,
  mutate,
}: {
  tradeId: string
  mutate: () => void
}) {
  const declineTrade = async () => {
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/trade/status/${tradeId}/DECLINED`,
      {
        method: 'PUT',
        headers: {
          authorization: token!,
        },
      }
    )

    if (!res?.ok) {
      const { message } = await res?.json()
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: message,
        variant: 'destructive',
      })
    }

    mutate()

    return toast({
      title: 'Success!',
      description: 'Trade was declined!',
      variant: 'default',
    })
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-fit pl-2 pr-2"
      onClick={declineTrade}
    >
      Decline Trade
    </Button>
  )
}
