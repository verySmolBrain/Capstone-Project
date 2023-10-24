'use client'

import * as React from 'react'
import { Loader2Icon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordUpdateSchema } from '@/lib/validation/update-details'
import { useForm } from 'react-hook-form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import * as z from 'zod'

type FormData = z.infer<typeof passwordUpdateSchema>

export function UpdatePasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(passwordUpdateSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const supabase = createClientComponentClient<Database>()

    const supabase_response = await supabase.auth.updateUser({
      password: data.password,
    })

    setIsLoading(false)

    if (supabase_response.error) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: supabase_response.error.message,
        variant: 'destructive',
      })
    }

    return toast({
      title: 'Success!',
      description: 'Your password has been updated!',
      variant: 'default',
    })
  }

  return (
    <div className="grid gap-4 w-fill">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label>Change Password</Label>

          <div className="flex w-full items-center space-x-2">
            <Input
              className="w-full justify-self-start"
              type="new-password"
              placeholder="New password"
              autoCapitalize="none"
              autoCorrect="off"
              required
              disabled={isLoading}
              {...register('password')}
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
    </div>
  )
}
