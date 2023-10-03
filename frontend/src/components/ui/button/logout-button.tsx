'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  async function onSubmit() {
    setIsLoading(true)

    const logOutResult = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    setIsLoading(false)

    if (!logOutResult?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: logOutResult?.statusText,
        variant: 'destructive',
      })
    }

    if (logOutResult?.redirected && logOutResult?.url) {
      // We need to redirect manually as we're using fetch instead of form
      // We aren't using native html forms due to issues with Nextjs Server Actions
      // which are required to make form interactive
      router.push(logOutResult.url)
    }
  }

  return (
    <Button onClick={() => onSubmit()}>
      {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}Logout
    </Button>
  )
}
