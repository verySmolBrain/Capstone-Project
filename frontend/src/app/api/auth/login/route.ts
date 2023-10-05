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

  const supabase_response = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  console.log('user', await supabase.auth.getSession())

  return supabase_response.error
    ? new NextResponse(supabase_response.error.message, {
        status: supabase_response.error.status,
      })
    : NextResponse.redirect(`${requestUrl.origin}/dashboard`, {
        status: 301,
      })
}
