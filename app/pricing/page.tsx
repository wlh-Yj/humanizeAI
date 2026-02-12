"use client"

import { I18nProvider, useI18n } from "@/lib/i18n"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckoutButton } from "@/components/checkout-button"
import { Check, Zap, TrendingUp, Crown } from "lucide-react"

const plans = [
  {
    id: "free",
    productId: "", // Free plan - no Creem product
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for trying out humanizeAI",
    icon: Zap,
    features: [
      "500 words per month",
      "Basic humanization modes",
      "Standard processing speed",
      "Email support",
      "Basic AI detection bypass",
    ],
    highlighted: false,
  },
  {
    id: "pro",
    productId: process.env.NEXT_PUBLIC_CREEM_PRO_PRODUCT_ID || "prod_pro_plan",
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Best for regular users and professionals",
    icon: TrendingUp,
    features: [
      "50,000 words per month",
      "All humanization modes (GPTZero, Turnitin, etc.)",
      "Priority processing speed",
      "Priority email support",
      "Advanced AI detection bypass",
      "Multiple language support",
      "Export functionality",
      "Usage analytics dashboard",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    productId: process.env.NEXT_PUBLIC_CREEM_ENTERPRISE_PRODUCT_ID || "prod_enterprise_plan",
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For teams and high-volume users",
    icon: Crown,
    features: [
      "500,000 words per month",
      "All humanization modes",
      "Fastest processing (10x speed)",
      "24/7 priority support",
      "Ultimate AI detection bypass",
      "API access (10,000 requests/month)",
      "Custom integrations & webhooks",
      "Dedicated account manager",
      "Team collaboration tools (5 seats)",
      "Advanced analytics & reporting",
      "White-label options",
      "Custom model training",
    ],
    highlighted: false,
  },
]

function PricingContent() {
  const { t, locale } = useI18n()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <div className="border-b border-border bg-gradient-to-b from-secondary/50 to-background py-20">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h1 className="mb-4 text-5xl font-bold md:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Choose the plan that best fits your needs. Upgrade, downgrade, or cancel anytime.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-600">
              <Check className="h-4 w-4" />
              7-day money-back guarantee • No hidden fees
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              {plans.map((plan) => {
                const Icon = plan.icon
                return (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col rounded-2xl border p-8 transition-all hover:shadow-xl ${
                      plan.highlighted
                        ? "border-primary bg-gradient-to-b from-primary/5 to-transparent shadow-2xl scale-105"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
                        ⭐ Most Popular
                      </div>
                    )}

                    <div className="mb-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/10 to-blue-600/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                      {plan.id === "pro" && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          ~$0.0004 per word
                        </p>
                      )}
                    </div>

                    <ul className="mb-8 flex-1 space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.id === "free" ? (
                      <Button
                        asChild
                        className="w-full"
                        variant="outline"
                      >
                        <a href="/">Get Started Free</a>
                      </Button>
                    ) : (
                      <CheckoutButton
                        productId={plan.productId}
                        productName={plan.name}
                        price={plan.price}
                        highlighted={plan.highlighted}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="border-t border-border bg-secondary/30 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center text-3xl font-bold">Compare All Features</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-4 text-left font-semibold">Feature</th>
                    <th className="pb-4 text-center font-semibold">Free</th>
                    <th className="pb-4 text-center font-semibold">Pro</th>
                    <th className="pb-4 text-center font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-4">Monthly word limit</td>
                    <td className="py-4 text-center text-muted-foreground">500</td>
                    <td className="py-4 text-center font-semibold">50,000</td>
                    <td className="py-4 text-center font-semibold">500,000</td>
                  </tr>
                  <tr>
                    <td className="py-4">Humanization modes</td>
                    <td className="py-4 text-center text-muted-foreground">Basic</td>
                    <td className="py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-primary" />
                    </td>
                    <td className="py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-primary" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4">Processing speed</td>
                    <td className="py-4 text-center text-muted-foreground">Standard</td>
                    <td className="py-4 text-center">Priority</td>
                    <td className="py-4 text-center font-semibold">10x Faster</td>
                  </tr>
                  <tr>
                    <td className="py-4">API Access</td>
                    <td className="py-4 text-center text-muted-foreground">-</td>
                    <td className="py-4 text-center text-muted-foreground">-</td>
                    <td className="py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-primary" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4">Team collaboration</td>
                    <td className="py-4 text-center text-muted-foreground">-</td>
                    <td className="py-4 text-center text-muted-foreground">-</td>
                    <td className="py-4 text-center">5 seats</td>
                  </tr>
                  <tr>
                    <td className="py-4">Support</td>
                    <td className="py-4 text-center text-muted-foreground">Email</td>
                    <td className="py-4 text-center">Priority</td>
                    <td className="py-4 text-center">24/7 Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-12 text-center text-3xl font-bold">Pricing FAQ</h2>
            <div className="space-y-8">
              <div>
                <h3 className="mb-2 text-lg font-semibold">What counts as a "word"?</h3>
                <p className="text-muted-foreground">
                  A word is counted based on standard English word boundaries (separated by spaces). For example, "AI humanizer tool" counts as 3 words. Only input text is counted - the humanized output doesn't consume your word limit.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">Can I upgrade or downgrade anytime?</h3>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and we'll prorate any differences.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">Do unused words roll over?</h3>
                <p className="text-muted-foreground">
                  No, unused words do not carry over to the next month. Each billing cycle starts fresh with your plan's word allowance. We recommend choosing a plan that matches your typical monthly usage.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and various local payment methods through our secure payment processor Creem.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">Is there a refund policy?</h3>
                <p className="text-muted-foreground">
                  Yes! We offer a 7-day money-back guarantee for first-time subscribers. If you're not satisfied with humanizeAI, contact <a href="mailto:support@humanizeai.app" className="text-primary hover:underline">support@humanizeai.app</a> within 7 days for a full refund.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">Do you offer educational discounts?</h3>
                <p className="text-muted-foreground">
                  Yes! Students and educators receive 20% off any paid plan. Contact us at <a href="mailto:support@humanizeai.app" className="text-primary hover:underline">support@humanizeai.app</a> with your institution email (.edu) for verification and discount code.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">How secure is the payment process?</h3>
                <p className="text-muted-foreground">
                  We use Creem as our Merchant of Record, which handles all payment processing with bank-level encryption. Your payment information is never stored on our servers. Creem is PCI DSS Level 1 compliant.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">Can I cancel my subscription?</h3>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time from your account settings. You'll retain access until the end of your current billing period. No cancellation fees.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="mb-4 text-3xl font-bold">Still have questions?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Our team is here to help you choose the right plan and answer any questions.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">Contact Sales</a>
              </Button>
              <Button size="lg" asChild className="bg-gradient-to-r from-sky-500 to-blue-600">
                <a href="/">Try Free</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function PricingPage() {
  return (
    <I18nProvider>
      <PricingContent />
    </I18nProvider>
  )
}
