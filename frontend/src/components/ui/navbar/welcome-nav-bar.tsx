import { LogIn } from 'lucide-react'
import { RedirectButton } from '../button/redirect-button'
import { ToggleDarkMode } from '../button/theme-toggle-button'

export function DefaultNavBar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ToggleDarkMode />
          <RedirectButton
            url={'/login'}
            text={{
              variant: 'outline',
              content: 'Login',
              size: 'sm',
              params:
                'transition-transform duration-300 transform active:translate-y-3',
              includeIcon: false,
            }}
            Icon={LogIn}
          />
        </div>
      </div>
    </header>
  )
}
