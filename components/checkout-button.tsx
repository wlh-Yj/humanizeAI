"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface CheckoutButtonProps {
  productId: string
  productName: string
  price: string
  highlighted?: boolean
}

export function CheckoutButton({ productId, productName, price, highlighted }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const supabase = createClient()

  const handleCheckout = async () => {
    setLoading(true)
    setErrorMessage("")

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!productId) {
        throw new Error("This plan is not configured for checkout yet.")
      }

      if (!user?.email) {
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/auth/callback?next=/pricing`,
          },
        })
        return
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          email: user?.email,
          userId: user?.id,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Failed to create checkout')
      }

      const { checkoutUrl } = await response.json()

      window.location.href = checkoutUrl
    } catch (error) {
      console.error('Checkout error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleCheckout}
        disabled={loading || !productId}
        className={
          highlighted
            ? "w-full bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg hover:shadow-xl"
            : "w-full"
        }
        variant={highlighted ? "default" : "outline"}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            {productId ? `Subscribe - ${price}` : "Coming Soon"}
          </>
        )}
      </Button>
      {errorMessage && (
        <p className="text-center text-xs text-destructive" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
