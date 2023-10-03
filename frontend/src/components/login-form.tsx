'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'
import { GithubIcon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { userAuthSchema } from '@/lib/validation/auth'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: signInResult?.statusText,
        variant: 'destructive',
      })
    }

    if (signInResult?.redirected && signInResult?.url) {
      // We need to redirect manually as we're using fetch instead of form
      // We aren't using native html forms due to issues with Nextjs Server Actions
      // which are required to make form interactive
      router.push(signInResult.url)
    }
  }

  async function handleGithubSubmit() {
    setIsGitHubLoading(true)

    setTimeout(() => {
      setIsGitHubLoading(false)
    }, 3000)
  }

  return (
    <div className="grid gap-4 w-fill">
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
            disabled={isLoading || isGitHubLoading}
            className="w-full transition-transform duration-300 transform active:translate-y-3"
          >
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Login with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type="submit"
        size="sm"
        disabled={isLoading || isGitHubLoading}
        className="w-full transition-transform duration-300 transform active:translate-y-3"
        onClick={() => handleGithubSubmit()}
      >
        {isGitHubLoading ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GithubIcon className="mr-2 h-5 w-5" />
        )}
        Github
      </Button>
    </div>
  )
}
