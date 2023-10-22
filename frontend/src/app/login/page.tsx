import React from 'react'

import { UserAuthForm } from '@/components/ui/form/login-form'
import { IconLogo } from '@/components/ui/assets/IconLogo'
import { BackButton } from '@/components/ui/button/back-button'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <BackButton />
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
