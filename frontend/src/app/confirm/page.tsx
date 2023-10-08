import React from 'react'
import { BackButton } from '@/components/ui/button/back-button'
import { IconLogo } from '@/components/ui/assets/IconLogo'

export default function ConfirmationPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <BackButton />
      <div className="mx-auto flex w-full flex-col justify-center space-y-3 sm:w-[350px]">
        <div className="flex flex-col text-center">
          <IconLogo className="w-16 h-16 mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">
            <br></br>
            Thank you for signing up!
          </h1>
          <p className="text-sm text-muted-foreground">
            Please check your email to confirm your account.
          </p>
        </div>
      </div>
    </div>
  )
}
