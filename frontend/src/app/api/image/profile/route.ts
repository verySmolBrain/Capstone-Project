import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const imageData = await request.json()

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const token = (await supabase.auth.getSession()).data.session?.access_token

  if (!token) {
    return NextResponse.redirect(requestUrl.origin, {
      status: 301,
    })
  }

  let uploadResponse

  const formData = new FormData()
  formData.append('file', imageData.image)
  formData.append(
    'api_key',
    process.env.CLOUDINARY_API_SECRET ? process.env.CLOUDINARY_API_SECRET : ''
  )

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: JSON.stringify(formData),
      }
    )

    const data = await response.json()
    console.log(data)

    if (!response.ok || response.status === 500) {
      throw new Error('Cannot create chat')
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({}), {
      status: 500,
      statusText: 'Something went wrong during image upload',
    })
  }

  return new NextResponse(
    JSON.stringify({ imageURL: '' }), // TODO: return the actual image URL
    {
      status: 200,
    }
  )
}

/**
 * Todo:
 *
 * - Profile page
 * - Zustand
 * - Cloudinary upload
 *
 * - Clean up the code
 */
