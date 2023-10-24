import React from 'react'

//import { IconLogo } from '@/components/ui/assets/IconLogo'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import { TypographyH2 } from '@/components/ui/assets/typography-h2'

import { UpdateUsernameForm } from '@/components/ui/form/update-username-form'
import { UpdateProfilePictureForm } from '@/components/ui/form/update-profile-picture-form'
import { UpdateDescriptionForm } from '@/components/ui/form/update-description-form'
import { UpdateEmailForm } from '@/components/ui/form/update-email-form'
import { UpdatePasswordForm } from '@/components/ui/form/update-password-form'

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <GeneralNavBar />

      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4">
          <TypographyH2 text="Profile Settings" />
        </div>
      </section>

      <div className="mx-auto flex flex-col justify-center space-y-6 w-[400px] md:w-[700px]">
        <UpdateUsernameForm />
        <UpdateProfilePictureForm />
        <span className="w-full border-t" />
        <UpdateDescriptionForm />
      </div>

      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4">
          <TypographyH2 text="Security Settings" />
        </div>
      </section>

      <div className="mx-auto flex flex-col justify-center space-y-6 w-[400px] md:w-[700px] pb-20">
        <UpdateEmailForm />
        <p className="text-sm text-muted-foreground">
          Email must not belong to an existing account.
        </p>
        <span className="w-full border-t" />
        <UpdatePasswordForm />
        <p className="text-sm text-muted-foreground">
          Currently doesn&apos;t require email confirmation.
        </p>
        <span className="w-full border-t" />
      </div>
    </div>
  )
}
