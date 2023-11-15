import React from 'react'
import { IconLogo } from '@/components/ui/assets/IconLogo'
import { RedirectButton } from '@/components/ui/button/redirect-button'
import { ArrowLeft } from 'lucide-react'

export default function ConfirmationPage() {
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
        <div className="flex flex-col gap-2 text-center">
          <IconLogo className="w-16 h-16 mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">
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
