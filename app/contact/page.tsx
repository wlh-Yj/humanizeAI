"use client"

import { I18nProvider, useI18n } from "@/lib/i18n"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, MapPin, MessageSquare } from "lucide-react"

function ContactContent() {
  const { t } = useI18n()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <div className="border-b border-border bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h1 className="text-4xl font-bold md:text-5xl">Contact Us</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We're here to help! Reach out with any questions or concerns.
            </p>
          </div>
        </div>

        {/* Contact Info & Form */}
        <div className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Email */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Email Support</h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Get help via email. We typically respond within 24 hours.
                  </p>
                  <a
                    href="mailto:support@humanizeai.app"
                    className="text-primary hover:underline"
                  >
                    support@humanizeai.app
                  </a>
                  <div className="mt-4 rounded-lg bg-green-50 p-3 dark:bg-green-950">
                    <p className="text-xs font-medium text-green-900 dark:text-green-100">
                      ✓ Guaranteed response within 3 business days
                    </p>
                  </div>
                </div>

                {/* Live Chat */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Live Chat</h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Chat with our support team during business hours.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri: 9am-6pm PST
                  </p>
                </div>

                {/* Address */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Office Address</h3>
                  <p className="text-sm text-muted-foreground">
                    humanizeAI<br />
                    Suite 100<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 font-semibold">How quickly will I receive a response?</h3>
                      <p className="text-sm text-muted-foreground">
                        We aim to respond to all support emails within 24 hours during business days. Pro and Enterprise users receive priority support with faster response times.
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 font-semibold">What information should I include in my support request?</h3>
                      <p className="text-sm text-muted-foreground">
                        Please include your account email, a clear description of the issue, and any relevant screenshots or error messages. This helps us resolve your issue faster.
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 font-semibold">Do you offer phone support?</h3>
                      <p className="text-sm text-muted-foreground">
                        Phone support is available for Enterprise plan customers. Contact your dedicated account manager for assistance.
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 font-semibold">Can I request a feature or report a bug?</h3>
                      <p className="text-sm text-muted-foreground">
                        Absolutely! We welcome feature requests and bug reports. Email us at support@humanizeai.app with details, and we'll review your feedback.
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 font-semibold">Is my support conversation private?</h3>
                      <p className="text-muted-foreground text-sm">
                        Yes, all support communications are confidential and protected by our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 font-semibold">What if I need urgent assistance?</h3>
                      <p className="text-sm text-muted-foreground">
                        For urgent issues, email support@humanizeai.app with "URGENT" in the subject line. Pro and Enterprise customers can also use live chat during business hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="border-t border-border bg-secondary/30 py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-8 text-center text-3xl font-bold">Other Ways to Get Help</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-background p-6">
                <h3 className="mb-2 text-lg font-semibold">Documentation</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Browse our comprehensive guides and tutorials to get the most out of humanizeAI.
                </p>
                <a href="#" className="text-sm text-primary hover:underline">
                  View Documentation →
                </a>
              </div>

              <div className="rounded-lg border border-border bg-background p-6">
                <h3 className="mb-2 text-lg font-semibold">FAQ</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Find quick answers to common questions about features, pricing, and usage.
                </p>
                <a href="/#faq" className="text-sm text-primary hover:underline">
                  View FAQ →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function ContactPage() {
  return (
    <I18nProvider>
      <ContactContent />
    </I18nProvider>
  )
}
