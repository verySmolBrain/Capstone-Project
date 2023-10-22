'use client'

import * as React from 'react'
import { Loader2Icon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { usernameUpdateSchema } from '@/lib/validation/update-details'
import { useForm } from 'react-hook-form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import * as z from 'zod'

type FormData = z.infer<typeof usernameUpdateSchema>

export function UpdateUsernameForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(usernameUpdateSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const updateResult = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/profile/name`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'update-type': 'name',
          authorization: token!,
        },
        body: JSON.stringify(data),
      }
    )

    setIsLoading(false)

    if (!updateResult?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!', // Fix edge case can still update username if same as before
        description: updateResult?.statusText,
        variant: 'destructive',
      })
    }

    return toast({
      title: 'Success!',
      description: 'Your username has been updated!',
      variant: 'default',
    })
  }

  return (
    <div className="grid gap-4 w-fill">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label>Change Display Name</Label>

          <div className="flex w-full items-center space-x-2">
            <Input
              className="w-full justify-self-start"
              type="username"
              placeholder="This is your public display name"
              autoCapitalize="none"
              autoCorrect="off"
              required
              disabled={isLoading}
              {...register('name')}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-auto justify-self-end transition-transform duration-300 transform active:translate-y-3"
            >
              {isLoading && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update
            </Button>
          </div>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase"></div>
      </div>
    </div>
  )
}
