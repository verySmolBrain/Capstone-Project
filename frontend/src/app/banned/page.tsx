import { IconLogo } from '@/components/ui/assets/IconLogo'
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <IconLogo className="w-16 h-16 mx-auto" />
      <h2 className="text-3xl font-semibold tracking-tight">Uh oh!</h2>
      <p className="text-muted-foreground">
        This email has been permanently banned.
      </p>
      <p className="text-muted-foreground">
        Go back{' '}
        <Link href="/">
          <u>Home</u>.
        </Link>
      </p>
    </div>
  )
}
