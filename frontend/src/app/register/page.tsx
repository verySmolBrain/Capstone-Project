import React from 'react'

import { UserAuthForm } from '@/components/ui/form/signup-form'
import { IconLogo } from '@/components/ui/assets/IconLogo'
import Link from 'next/link'

import Image from 'next/image'
import { RedirectButton } from '@/components/ui/button/redirect-button'
import { ArrowLeft } from 'lucide-react'

export default function SignupPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid max-w-none lg:grid-cols-2 grid-rows-1 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex items-center justify-center">
        <Image
          className="object-contain w-auto"
          src="/images/logic.svg"
          alt="Logic"
          width={500}
          height={500}
          priority
        />
      </div>

      <div className="mx-auto flex flex-col justify-center space-y-3 w-[350px]">
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
        <div className="flex flex-col text-center">
          <IconLogo className="w-16 h-16 mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to start your journey!
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Have an account? Login here
          </Link>
        </p>
      </div>
    </div>
  )
}
