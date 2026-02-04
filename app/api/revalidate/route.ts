import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

import { revalidateSecret } from '@/sanity/lib/api'

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: string | undefined
    }>(req, revalidateSecret)

    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new Response(message, { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 })
    }

    // Revalidate the specific content type
    revalidateTag(body._type)

    // Revalidate the specific slug if available
    if (body.slug) {
      revalidateTag(`${body._type}:${body.slug}`)
    }

    // Also revalidate related content that might be affected
    // This ensures more comprehensive updates across your site
    revalidateTag('home')
    revalidateTag('settings')

    console.log(`Revalidated: ${body._type}${body.slug ? `:${body.slug}` : ''}`)

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    })
  } catch (err: any) {
    console.error('Revalidation error:', err)
    return new Response(err.message, { status: 500 })
  }
}
