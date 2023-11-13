'use client'

import * as React from 'react'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

import { zodResolver } from '@hookform/resolvers/zod'
import { userAuthSchema } from '@/lib/validation/auth'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type FormData = z.infer<typeof userAuthSchema>

export function CreateManagerForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const email = String(data.email)
    const password = String(data.password)

    const signUpResult = await fetch('/api/auth/register/manager', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    setIsLoading(false)

    if (!signUpResult?.ok) {
      const { message } = await signUpResult.json()
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: message,
        variant: 'destructive',
      })
    }

    if (signUpResult?.redirected && signUpResult?.url) {
      // We need to redirect manually as we're using fetch instead of form
      // We aren't using native html forms due to issues with Nextjs Server Actions
      // which are required to make form interactive
      // We also use router.push instead of redirect as it doesn't work nicely with
      // async and onSubmit functions

      router.push(signUpResult.url)
    }
  }

  return (
    <div className="grid gap-6 w-fill">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <div className="grid gap-2.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
              disabled={isLoading}
              {...register('email')}
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full"
              minLength={8}
              required
              disabled={isLoading}
              {...register('password')}
            />
          </div>

          <Button
            type="submit"
            size="sm"
            disabled={isLoading}
            className="w-full transition-transform duration-300 transform active:translate-y-3"
          >
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
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
