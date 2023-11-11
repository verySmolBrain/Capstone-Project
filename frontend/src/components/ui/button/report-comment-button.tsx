'use client'

import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../dialog'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

export function ReportCommentButton({ comment }: { comment: number }) {
  const [open, setOpen] = React.useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(data: FormData) {
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/comment/${comment}/report`,
      {
        method: 'update',
        headers: {
          'Content-Type': 'application/json',
          'update-type': 'description',
          authorization: token!,
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div style={{ cursor: 'pointer' }}>
          <p className="text-xs text-gray-400 hover:underline">Report</p>
        </div>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <p className="font-medium text-center">
            Thanks for the heads up, we&apos;ll investigate this shortly
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
