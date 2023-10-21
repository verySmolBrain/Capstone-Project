import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold tracking-tight">Uh oh 😕</h2>
      <p className="text-muted-foreground">
        We couldn&apos;t find what you were after.
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
