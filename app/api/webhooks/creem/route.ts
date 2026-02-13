import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createAdminClient } from '@/lib/supabase/admin'

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
    const supabaseAdmin = createAdminClient()

    switch (event.type) {
      case 'checkout.completed': {
        const { customer_email, client_reference_id, subscription_id, mode } = event.data
        // Assuming client_reference_id is the user ID passed from checkout session creation
        const userId = client_reference_id

        if (userId) {
          // Example plan mapping - adjust based on your actual product logic
          let wordLimit = 10000 // Starter
          let planName = 'starter'

          // You might want to fetch product details to determine the plan
          // For now, we'll default to updating the subscription ID and status

          const { error } = await supabaseAdmin
            .from('profiles')
            .update({
              status: 'active',
              plan: planName,
              subscription_id: subscription_id,
              word_limit: wordLimit,
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // approx 1 month
            })
            .eq('id', userId)

          if (error) console.error('Error updating profile:', error)
        }
        break
      }

      case 'subscription.created':
        // Usually handled by checkout.completed, but good for redundancy
        break

      case 'subscription.canceled': {
        const subscriptionId = event.data.id
        const { error } = await supabaseAdmin
          .from('profiles')
          .update({ status: 'canceled' })
          .eq('subscription_id', subscriptionId)

        if (error) console.error('Error canceling subscription:', error)
        break
      }

      case 'subscription.updated': {
        const subscriptionId = event.data.id
        const status = event.data.status
        // Update usage period or status
        const { error } = await supabaseAdmin
          .from('profiles')
          .update({ status: status })
          .eq('subscription_id', subscriptionId)

        if (error) console.error('Error updating subscription:', error)
        break
      }

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
