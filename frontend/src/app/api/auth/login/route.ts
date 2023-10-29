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

  if (supabase_response.error) {
    return new NextResponse(supabase_response.error.message, {
      status: supabase_response.error.status,
    })
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

  return NextResponse.redirect(`${requestUrl.origin}/dashboard`, {
    status: 301,
  })
}
