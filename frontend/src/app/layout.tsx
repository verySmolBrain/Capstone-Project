import '@/styles/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import '@smastrom/react-rating/style.css'

export const metadata: Metadata = {
  title: 'Goomba Market',
  description: 'A Collectables Trading App',
  icons: {
    icon: '/icon.png',
  },
}

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
