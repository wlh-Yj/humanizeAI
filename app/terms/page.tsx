"use client"

import { I18nProvider, useI18n } from "@/lib/i18n"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

function TermsContent() {
  const { t } = useI18n()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
          
          {/* Academic Integrity Highlight */}
          <div className="my-8 rounded-lg border-2 border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
            <h2 className="mb-3 text-xl font-bold text-red-900 dark:text-red-100">
              ⚠️ Academic Integrity - Prohibited Use
            </h2>
            <p className="mb-3 leading-relaxed text-red-900 dark:text-red-100">
              <strong>DO NOT use humanizeAI for:</strong>
            </p>
            <ul className="list-disc pl-6 mb-3 text-red-900 dark:text-red-100">
              <li>Academic dishonesty or plagiarism</li>
              <li>Circumventing plagiarism detection on academic submissions</li>
              <li>Violating your institution's honor code or academic integrity policies</li>
            </ul>
            <p className="text-sm leading-relaxed text-red-800 dark:text-red-200">
              Violation may result in immediate account termination and reporting to relevant institutions.
            </p>
          </div>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-6">
              Last Updated: February 11, 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using humanizeAI ("Service"), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                humanizeAI provides AI-powered text humanization services that convert AI-generated content into natural, human-like text. We offer various modes optimized for different use cases including academic writing, content creation, and professional communications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You must be at least 13 years old to use our Service</li>
                <li>You are responsible for maintaining account security and confidentiality</li>
                <li>You are responsible for all activities under your account</li>
                <li>You must provide accurate and complete information</li>
                <li>One person or entity may maintain only one free account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use Policy</h2>
              <p className="text-muted-foreground mb-4">You agree NOT to use the Service to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Violate any laws, regulations, or third-party rights</li>
                <li>Create content that is fraudulent, misleading, or deceptive</li>
                <li>Engage in academic dishonesty contrary to your institution's policies</li>
                <li>Generate spam, phishing content, or malicious materials</li>
                <li>Harass, abuse, or harm others</li>
                <li>Reverse engineer or attempt to extract the source code</li>
                <li>Use automated systems to access the Service excessively</li>
                <li>Resell or redistribute our Service without authorization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                <strong>Your Content:</strong> You retain ownership of text you submit. By using our Service, you grant us a license to process, store, and display your content solely to provide the Service.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>Our Service:</strong> The Service, including all software, algorithms, and output, is protected by copyright and other intellectual property laws. You may not copy, modify, or distribute our technology.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>Generated Output:</strong> You own the humanized text generated by our Service and may use it freely, subject to these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Payment and Billing</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Subscription fees are billed in advance on a recurring basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>We reserve the right to change pricing with 30 days notice</li>
                <li>You authorize us to charge your payment method automatically</li>
                <li>Failed payments may result in service suspension</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Service Availability</h2>
              <p className="text-muted-foreground mb-4">
                We strive for 99.9% uptime but do not guarantee uninterrupted access. We may temporarily suspend the Service for maintenance, updates, or technical issues.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Disclaimers</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND</li>
                <li>We do not guarantee that output will bypass all AI detection systems</li>
                <li>We are not responsible for how you use the generated content</li>
                <li>Users must comply with their own institutional or professional policies</li>
                <li>Results may vary based on input quality and detector algorithms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, HUMANIZEAI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA, REVENUE, OR PROFITS, ARISING FROM YOUR USE OF THE SERVICE.
              </p>
              <p className="text-muted-foreground mb-4">
                Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Academic Integrity Notice</h2>
              <p className="text-muted-foreground mb-4">
                While our Service can help refine AI-assisted writing, users are responsible for ensuring compliance with their institution's academic integrity policies. We encourage ethical use of AI writing tools.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We may suspend or terminate your access immediately for violations of these Terms. You may cancel your subscription at any time through your account settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We may modify these Terms at any time. Material changes will be notified via email or Service notification. Continued use after changes constitutes acceptance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These Terms are governed by the laws of the State of California, USA, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms, contact us at:
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

export default function TermsPage() {
  return (
    <I18nProvider>
      <TermsContent />
    </I18nProvider>
  )
}
