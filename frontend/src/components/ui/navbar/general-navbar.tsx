import { BackButton } from '../button/back-button'
import { LogoutButton } from '../button/logout-button'
import { SettingsButton } from '../button/settings-button'
import { ToggleDarkMode } from '../button/theme-toggle-button'
import { IconLogo } from '@/components/ui/assets/IconLogo'
import { ChatsButton } from '../button/chats-button'
import { AvatarButton } from '../button/avatar-button'
import { ManagerButton } from '../button/manager-button'

export function GeneralNavBar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container flex items-center space-x-4 sm:justify-left sm:space-x-0">
        <BackButton />
        <IconLogo className="w-10 h-10 mx-auto absolute left-4 top-4 hidden md:block md:left-36 md:top-4" />
        <p className="text-2xl font-semibold tracking-tight absolute left-4 top-4 md:left-52 md:top-4 hidden md:block">
          Goomba Market
        </p>
      </div>
      <div className="container flex mr-0 h-16 space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ManagerButton />
          <ToggleDarkMode />
          <ChatsButton />
          <SettingsButton />
          <AvatarButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
