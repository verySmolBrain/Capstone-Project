import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function LoginButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="transition-transform duration-300 transform active:translate-y-3"
    >
      <Link href="/login">Login</Link>
    </Button>
  )
}
