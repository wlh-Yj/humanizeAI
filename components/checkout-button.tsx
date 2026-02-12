"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface CheckoutButtonProps {
  productId: string
  productName: string
  price: string
  highlighted?: boolean
}

export function CheckoutButton({ productId, productName, price, highlighted }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleCheckout = async () => {
    setLoading(true)

    try {
      // Get user info if logged in
      const { data: { user } } = await supabase.auth.getUser()

      // Create checkout session
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
        throw new Error('Failed to create checkout')
      }

      const { checkoutUrl } = await response.json()

      // Redirect to Creem checkout
      window.location.href = checkoutUrl
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
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
          {productName === "Free" ? "Get Started" : `Subscribe - ${price}`}
        </>
      )}
    </Button>
  )
}
