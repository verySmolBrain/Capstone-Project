'use client'

import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../dialog'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { Button } from '../button'
import { toast } from '../use-toast'
import { Ban } from 'lucide-react'

export function BanUserButton({ user }: { user: string }) {
  const [open, setOpen] = React.useState(false)

  async function handleClick() {
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/ban/${user}`,
      {
        method: 'DELETE',
        headers: {
          authorization: token!,
        },
      }
    )
    setOpen(false)
    console.log(res)
    if (!res.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: res?.statusText,
        variant: 'destructive',
      })
    }
    return toast({
      title:
        'The banhammer has claimed another victim. User deleted from the platform.',
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Ban className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <p className="font-medium text-center">
            Are you sure you want to ban this user?
          </p>
          <p className="text-center text-sm">
            Banning a user will delete them from the platform.
          </p>
        </DialogHeader>
        <div className="flex justify-center">
          <Button
            type="submit"
            size="sm"
            className="transition-transform duration-300 transform active:translate-y-3"
            onClick={handleClick}
          >
            Yes, use the banhammer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
