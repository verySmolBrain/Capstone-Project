import { Loader2 } from 'lucide-react'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'

export function LoadingScreen() {
  return (
    <>
      <GeneralNavBar />
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    </>
  )
}
