"use client"

import { I18nProvider, useI18n } from "@/lib/i18n"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

function PrivacyContent() {
  const { t } = useI18n()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-6">
              Last Updated: February 11, 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us when using humanizeAI:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Account Information:</strong> Email address, name, and profile information when you sign in with Google OAuth</li>
                <li><strong>Usage Data:</strong> Text content you submit for humanization, processing preferences, and usage statistics</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve our AI text humanization services</li>
                <li>Process your text submissions and generate humanized output</li>
                <li>Send service-related communications and respond to your requests</li>
                <li>Monitor and analyze usage patterns to enhance user experience</li>
                <li>Detect, prevent, and address technical issues or fraudulent activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Security</h2>
              <p className="text-muted-foreground mb-4">
                Your data is securely stored using industry-standard encryption:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All data is encrypted in transit using SSL/TLS</li>
                <li>User data is stored in secure Supabase databases with encryption at rest</li>
                <li>We implement appropriate technical and organizational measures to protect your data</li>
                <li>Submitted text content is not used to train AI models without explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Third Parties</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal information. We may share data with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Service Providers:</strong> OpenAI for text processing, Supabase for data storage</li>
                <li><strong>Authentication:</strong> Google for OAuth authentication services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights and Choices</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access, update, or delete your personal information</li>
                <li>Export your data in a portable format</li>
                <li>Opt-out of marketing communications</li>
                <li>Request restriction of processing your data</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar technologies to improve your experience. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
              <p className="text-muted-foreground mb-4">
                We retain your data for as long as your account is active or as needed to provide services. You may request deletion at any time by contacting support@humanizeai.app
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Our services are not directed to individuals under 13. We do not knowingly collect information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Privacy Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this policy periodically. We will notify you of material changes via email or through our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                For privacy-related questions or requests, please contact us at:
              </p>
              <p className="text-muted-foreground">
                <strong>Email:</strong> <a href="mailto:support@humanizeai.app" className="text-primary hover:underline">support@humanizeai.app</a><br />
                <strong>Address:</strong> humanizeAI, Suite 100, San Francisco, CA 94105, USA
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <I18nProvider>
      <PrivacyContent />
    </I18nProvider>
  )
}
