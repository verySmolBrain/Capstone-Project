import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const token = (await supabase.auth.getSession()).data.session?.access_token

  if (!token) {
    return NextResponse.redirect(requestUrl.origin, {
      status: 301,
    })
  }

  try {
    const response = await fetch(`${process.env.BACKEND_HOSTNAME}/chats`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        }
      }
    )
    const data = await response.json()

    if (!response.ok || response.status === 404) {
      throw new Error('Cannot find chat list')
    }
    return new NextResponse(JSON.stringify(data), { status: 200 })
  } catch {
    return NextResponse.redirect(requestUrl.origin)
  }
}