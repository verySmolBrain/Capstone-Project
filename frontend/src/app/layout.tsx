import '@/styles/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import '@smastrom/react-rating/style.css'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

export const metadata: Metadata = {
  title: 'Goomba Market',
  description: 'A Collectables Trading App',
  icons: {
    icon: '/icon.png',
  },
}

const campaignViewDataUpdater = async () => {
  const supabase = createClientComponentClient<Database>()
  const token = (await supabase.auth.getSession()).data.session?.access_token

  await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaigns/viewData`,
    {
      method: 'PUT',
      headers: {
        'update-type': 'name',
        authorization: token!,
      },
    }
  )
}
setInterval(async () => {
  campaignViewDataUpdater()
}, 60000 * 5)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <TailwindIndicator />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
