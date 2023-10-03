import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function GetStartedButton() {
  return (
    <Button
      size="lg"
      className="transition-transform duration-300 transform active:translate-y-3"
    >
      <Link href="/register">Get Started</Link>
    </Button>
  )
}
