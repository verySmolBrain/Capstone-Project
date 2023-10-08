import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function PUT(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.json()

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const token = (await supabase.auth.getSession()).data.session?.access_token

  if (!token) {
    return NextResponse.redirect(requestUrl.origin, {
      status: 301,
    })
  }
  try {
    const response = await fetch(
      `${process.env.BACKEND_HOSTNAME}/chat/send/${formData.receiver}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
        body: JSON.stringify(formData),
      }
    )

    if (!response.ok) {
      throw new Error('Cannot create chat')
    }
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    })
  }

  return new NextResponse(JSON.stringify({}), {
    status: 200,
  })
}
