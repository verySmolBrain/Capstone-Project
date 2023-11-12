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
  const create_profile_resp = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/user`,
    {
      method: 'POST',
      headers: {
        authorization: token!,
      },
    }
  )

  if (!create_profile_resp.ok) {
    return new NextResponse('Error creating profile', {
      status: 500,
    })
  }

  return NextResponse.redirect(requestUrl.origin)
}
