import { GetStartedButton } from './ui/button/signup-button'

export function WelcomePage() {
  return (
    <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 lg:gap-6 text-center">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to the Collectibles Exchange Hub
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Unlock the World of Collectibles - Where Passion Meets Possibility
        </p>
        <GetStartedButton />
      </div>
    </section>
  )
}
