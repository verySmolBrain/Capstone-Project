'use client'

import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../dialog'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { Button } from '../button'

export function ReportCommentButton({ comment }: { comment: number }) {
  const [open, setOpen] = React.useState(false)

  async function handleClick() {
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token
    const reportingUser = (await supabase.auth.getSession()).data.session?.user
      .id

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/forum/report/${comment}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
        body: JSON.stringify({ userId: reportingUser }),
      }
    )
    console.log(res)
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
            Are you sure you want to report?
          </p>
        </DialogHeader>
        <div className="flex justify-center">
          <Button
            type="submit"
            size="sm"
            className="transition-transform duration-300 transform active:translate-y-3"
            onClick={handleClick}
          >
            Yes, report this comment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
