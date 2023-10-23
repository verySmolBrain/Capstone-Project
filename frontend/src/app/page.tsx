import { DefaultNavBar } from '@/components/ui/navbar/welcome-nav-bar'
import { WelcomePage } from '@/components/ui/page/welcome-page'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DefaultNavBar />
      <WelcomePage />
    </div>
  )
}
