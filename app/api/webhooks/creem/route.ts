import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('creem-signature')

    // Verify webhook signature
    const webhookSecret = process.env.CREEM_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('CREEM_WEBHOOK_SECRET not configured')
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex')

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)

    // Handle different webhook events
    switch (event.type) {
      case 'checkout.completed':
        console.log('Payment successful:', {
          checkoutId: event.data.id,
          customerId: event.data.customer,
          productId: event.data.product,
        })
        // TODO: Grant access to user, send confirmation email
        break

      case 'subscription.created':
        console.log('New subscription:', event.data)
        // TODO: Activate subscription for user
        break

      case 'subscription.canceled':
        console.log('Subscription canceled:', event.data)
        // TODO: Revoke access
        break

      case 'subscription.updated':
        console.log('Subscription updated:', event.data)
        // TODO: Update user's plan
        break

      default:
        console.log('Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
