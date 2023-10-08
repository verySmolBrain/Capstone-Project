import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const protectedRoutes = ['/dashboard', '/dashboard/settings']
  const blockedRoutesAfterLogin = ['/', '/login', '/register']

  if (session && blockedRoutesAfterLogin.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (!session && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (!session && req.nextUrl.pathname === '/settings') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}
