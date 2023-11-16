'use client'
import * as React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { Database } from '@/lib/database.types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import useSWR from 'swr'

dayjs.extend(relativeTime)

export function CollectiblePriceChart(props: { slug: string }) {
  const [priceData, setPriceData] = React.useState<PriceData>()

  const fetcher = async (url: string) => {
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const currTime = dayjs().unix()
    console.log(currTime)
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        authorization: token!,
      },
    })

    if (res?.ok) {
      return await res.json()
    }
  }

  const { data: priceResult } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/trade/${props.slug}`,
    fetcher
  )

  React.useEffect(() => {
    if (priceResult) {
      const now = dayjs()
      const currIntervalPrices = priceResult.filter(
        (x: { date: number; price: number }) =>
          dayjs(x.date).year() === now.year()
      )

      const currPriceData = currIntervalPrices.map(
        (x: { date: number; price: number }) => ({
          date: dayjs(x.date).fromNow(),
          Price: x.price,
        })
      )

      setPriceData(currPriceData)
    }
  }, [priceResult])

  return (
    <LineChart
      width={1000}
      height={300}
      data={priceData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Price"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  )
}
