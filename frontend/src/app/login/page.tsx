import React from 'react'

import { UserAuthForm } from '@/components/ui/form/login-form'
import { IconLogo } from '@/components/ui/assets/IconLogo'
import Link from 'next/link'
import { RedirectButton } from '@/components/ui/button/redirect-button'
import { ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <RedirectButton
        Icon={ArrowLeft}
        url="/"
        text={{
          variant: 'outline',
          content: 'Back',
          params: 'absolute left-4 top-4 md:left-8 md:top-4',
          size: 'sm',
          includeIcon: true,
        }}
      />
      <div className="mx-auto flex w-full flex-col justify-center space-y-3 sm:w-[350px]">
        <div className="flex flex-col text-center">
          <IconLogo className="w-16 h-16 mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
