import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ButtonProps {
  color?: string
}

export function BackButton({ ...props }: ButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn('absolute left-4 top-4 md:left-8 md:top-8', props)}
    >
      <Link href="/">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Link>
    </Button>
  )
}

// export function BackButton() {
//   return (
//     <Button>
//       <Link
//         href="/"
//         className={cn(
//           buttonVariants({ variant: 'outline' }),
//           'absolute left-4 top-4 md:left-8 md:top-8'
//         )}
//       >
//         <>
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back
//         </>
//       </Link>
//     </Button>
//   )
// }
