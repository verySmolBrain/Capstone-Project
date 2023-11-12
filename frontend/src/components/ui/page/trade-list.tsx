'use client'

import * as React from 'react'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { Loader2 } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import { Skeleton } from '../skeleton'
import { ConfirmTradeButton } from '../button/confirm-trade-button'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip'
import { DeclineTradeButton } from '../button/decline-trade-button'
import { PendingSpan } from '../span/PendingSpan'

dayjs.extend(relativeTime)

export default function TradeList({
  tradeType,
  isOwnProfile,
  profile,
}: {
  tradeType: 'sell' | 'buy' | 'history'
  isOwnProfile: boolean
  profile?: Profile
}) {
  const [trades, setTrades] = React.useState<Trade[]>([])

  const fetcher = async (url: string) => {
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token!,
      },
    })

    if (res?.ok) {
      return await res.json()
    }
  }

  const { data: tradeData, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/trade/${tradeType}`,
    fetcher,
    { refreshInterval: 2500 }
  )

  const hasUserConfirmed = (trade: Trade) => {
    if (!profile) {
      return false
    }

    const isUserBuyer = trade.buyer.id === profile.id
    return isUserBuyer ? trade.buyerConfirmed : trade.sellerConfirmed
  }

  React.useEffect(() => {
    if (tradeData) {
      setTrades(tradeData)
    }
  }, [tradeData])

  if (trades) {
    if (trades.length === 0) {
      return (
        <div className="flex items-center justify-center flex-col gap-2">
          <h1 className="text-xl font-semibold tracking-tight">
            No trades here!
          </h1>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col items-center justify-center gap-5">
          <section className="flex flex-col gap-3 pb-10">
            {trades.map((trade, index) => (
              <div
                key={index}
                className="container w-[400px] md:w-[600px] lg:w-[800px] flex flex-col gap-2 border rounded-2xl justify-start items-start pr-4 pl-4 pb-4 pt-4 h-[500px]"
              >
                <div className="flex flex-col md:flex-row justify-between w-full gap-1">
                  <div className="flex flex-row gap-2 ">
                    <p className="text-xl font-semibold truncate underline">
                      {trade.buyer.name}
                    </p>
                  </div>

                  <div className="flex flex-row gap-2">
                    <p className="text-xs">Posted by</p>
                    <p className="text-xs underline">{trade.seller.name}</p>
                    <p className="text-xs">
                      {' '}
                      {dayjs(trade.createdAt).fromNow()}
                    </p>
                    <p className="text-xs">for ${trade.price}</p>
                  </div>
                </div>

                <div className="flex flex-row justify-between items-end w-full">
                  <div className="flex flex-col md:flex-row items-center md:items-end justify-between w-full">
                    {trade.collectable?.image ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="relative aspect-63/88 mt-6 mb-6 h-60 xs:h-80 md:h-96 mr-3 ml-3 w-auto">
                              <Link
                                href={`/collectable/${trade.collectable.name}`}
                              >
                                <Image
                                  src={trade.collectable.image}
                                  width={300}
                                  height={100}
                                  className="object-cover w-full transition-transform duration-300 transform hover:translate-y-3 border-primary border-1 rounded-2xl"
                                  alt="Collectable Image"
                                />
                              </Link>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="md:text-base w-full text-center">
                              {trade.collectable.name} for ${trade.price}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Skeleton className="object-cover h-full w-full rounded-2xl" />
                    )}
                    <div className="flex flex-row pb-4 gap-2">
                      {isOwnProfile &&
                        trade.status === 'PENDING' &&
                        !hasUserConfirmed(trade) && (
                          <ConfirmTradeButton
                            tradeId={trade.id}
                            mutate={mutate}
                          />
                        )}
                      {isOwnProfile &&
                        trade.status === 'PENDING' &&
                        hasUserConfirmed(trade) && <PendingSpan />}
                      {isOwnProfile && trade.status === 'PENDING' && (
                        <DeclineTradeButton
                          tradeId={trade.id}
                          mutate={mutate}
                        />
                      )}
                      {trade.status === 'ACCEPTED' && (
                        <p className="underline border rounded-2xl pt-2 pb-2 pr-2 pl-2">
                          Accepted
                        </p>
                      )}
                      {trade.status === 'DECLINED' && (
                        <p className="underline border rounded-2xl pt-2 pb-2 pr-2 pl-2">
                          Declined
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      )
    }
  } else {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    )
  }
}
