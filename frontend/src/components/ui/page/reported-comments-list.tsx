'use client'

import * as React from 'react'
import useSWR from 'swr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { Loader2 } from 'lucide-react'

export default function ReportedCommentsList() {
  const [reports, setReports] = React.useState<CommentReport[]>()

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

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/comment/reports`,
    fetcher,
    { refreshInterval: 2500 }
  )

  React.useEffect(() => {
    if (data) {
      setReports(data)
    }
  }, [data])

  if (reports) {
    if (reports.length === 0) {
      return (
        <div>
          <h1 className=" tracking-tight">No reported comments</h1>
        </div>
      )
    } else {
      return (
        <div>
          <section className="space-y-10 pb-8 pt-6 md:pb-12 md:pt-10">
            {reports.map((report, index) => (
              <div key={index}>
                <a href={`/profile/${report.author}`}>
                  <div className="flex items-center gap-4 border rounded-2xl pt-6 pb-6">
                    <div className="flex flex-col gap-4 overflow-hidden ml-6">
                      <p className="text-1xl font-semibold truncate">
                        {report.author}
                      </p>
                      <div className="text-500 truncate">{report.content}</div>
                    </div>
                  </div>
                </a>
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
