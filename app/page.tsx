"use client"

import { I18nProvider } from "@/lib/i18n"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustBar } from "@/components/trust-bar"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <I18nProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main>
          <HeroSection />
          <TrustBar />
          <FeaturesSection />
          <HowItWorksSection />
          <CaseStudiesSection />
          <FaqSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  )
}
