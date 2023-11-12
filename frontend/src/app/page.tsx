import { DefaultNavBar } from '@/components/ui/navbar/welcome-nav-bar'
import { WelcomePage } from '@/components/ui/page/welcome-page'

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DefaultNavBar />
      <WelcomePage />
    </div>
  )
}
