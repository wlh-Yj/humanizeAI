import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getCreemClient } from '@/lib/creem'

const checkoutRequestSchema = z.object({
  productId: z.string().trim().min(1).max(200),
  email: z.string().email().optional(),
  userId: z.string().uuid().optional(),
})

export async function POST(request: NextRequest) {
  try {
    let payload: unknown
    try {
      payload = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      )
    }

    const parsed = checkoutRequestSchema.safeParse(payload)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid checkout request' },
        { status: 400 }
      )
    }

    let creem
    try {
      creem = getCreemClient()
    } catch (error) {
      console.error('Creem configuration error:', error)
      return NextResponse.json(
        { error: 'Checkout is not configured' },
        { status: 503 }
      )
    }

    const { productId, email, userId } = parsed.data
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin

    const checkout = await creem.checkouts.create({
      productId,
      successUrl: new URL('/success', appUrl).toString(),
      customer: email ? { email } : undefined,
      metadata: userId ? { userId } : undefined,
    })

    return NextResponse.json({ 
      checkoutUrl: checkout.checkoutUrl,
      checkoutId: checkout.id 
    })
  } catch (error) {
    console.error('Creem checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
