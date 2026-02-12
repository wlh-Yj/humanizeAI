"use client"

import { I18nProvider, useI18n } from "@/lib/i18n"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

function SuccessContent() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  
  const checkoutId = searchParams.get('checkout_id')
  const orderId = searchParams.get('order_id')
  const customerId = searchParams.get('customer_id')

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-bold">Payment Successful! 🎉</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Thank you for subscribing to humanizeAI. Your account has been upgraded successfully.
          </p>

          {checkoutId && (
            <div className="mb-8 rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Order Details</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Checkout ID:</span>
                  <span className="font-mono">{checkoutId}</span>
                </div>
                {orderId && (
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-mono">{orderId}</span>
                  </div>
                )}
                {customerId && (
                  <div className="flex justify-between">
                    <span>Customer ID:</span>
                    <span className="font-mono">{customerId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              ✅ A confirmation email has been sent to your inbox<br />
              ✅ You can now access all premium features<br />
              ✅ Your subscription will renew automatically
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href="/">
                  Start Humanizing
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/settings">View Account</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function SuccessContentWrapper() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}

export default function SuccessPage() {
  return (
    <I18nProvider>
      <SuccessContentWrapper />
    </I18nProvider>
  )
}
