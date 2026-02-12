import { NextRequest, NextResponse } from 'next/server'
import { creem } from '@/lib/creem'

export async function POST(request: NextRequest) {
  try {
    const { productId, email, userId } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Create checkout session
    const checkout = await creem.checkouts.create({
      product_id: productId,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003'}/success`,
      customer: email ? { email } : undefined,
      metadata: userId ? { userId } : undefined,
    })

    return NextResponse.json({ 
      checkoutUrl: checkout.checkout_url,
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
