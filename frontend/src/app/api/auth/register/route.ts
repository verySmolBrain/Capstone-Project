import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.json()
  const email = String(formData.email)
  const password = String(formData.password)
  const supabase = createRouteHandlerClient<Database>({ cookies })

  const supabase_response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_FRONTEND_HOSTNAME}/auth/callback`,
    },
  })

  return supabase_response.error
    ? new NextResponse(supabase_response.error.message, {
        status: supabase_response.error.status,
      })
    : NextResponse.redirect(`${requestUrl.origin}/confirm`, {
        status: 301,
      })
}
