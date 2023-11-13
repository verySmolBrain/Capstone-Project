import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  let supabase_response
  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    supabase_response = await supabase.auth.exchangeCodeForSession(code)
  }

  const token = supabase_response?.data?.session?.access_token
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/manager`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'update-type': 'name',
        authorization: token!,
      },
      body: JSON.stringify({
        id: supabase_response?.data.user?.id,
      }),
    }
  )

  if (!res.ok) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    supabase.auth.signOut()
    return NextResponse.redirect(`${requestUrl.origin}/banned`)
  }

  return NextResponse.redirect(requestUrl.origin)
}
