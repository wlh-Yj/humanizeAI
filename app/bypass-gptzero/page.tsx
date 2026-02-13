"use client"

import { I18nProvider } from "@/lib/i18n"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustBar } from "@/components/trust-bar"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"

export default function BypassGPTZeroPage() {
    return (
        <I18nProvider>
            <div className="flex min-h-screen flex-col">
                <Header />
                <main>
                    <HeroSection
                        title="Bypass GPTZero Detection"
                        initialMode="GPTZero"
                    />
                    <TrustBar />
                    <FeaturesSection />
                </main>
                <Footer />
            </div>
        </I18nProvider>
    )
}
