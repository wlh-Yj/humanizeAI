"use client"

import { useI18n } from "@/lib/i18n"
import { ShieldAlert, Fingerprint, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    num: 1,
    icon: ShieldAlert,
    titleKey: "howItWorks.step1.title" as const,
    descKey: "howItWorks.step1.desc" as const,
  },
  {
    num: 2,
    icon: Fingerprint,
    titleKey: "howItWorks.step2.title" as const,
    descKey: "howItWorks.step2.desc" as const,
  },
  {
    num: 3,
    icon: Clock,
    titleKey: "howItWorks.step3.title" as const,
    descKey: "howItWorks.step3.desc" as const,
  },
]

export function HowItWorksSection() {
  const { t } = useI18n()

  return (
    <section id="how-it-works" className="border-t border-border bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-balance font-display text-3xl font-bold text-foreground md:text-4xl">
            {t("howItWorks.title")}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative flex flex-col rounded-2xl border border-border bg-background p-8 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {step.num}
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                {t(step.titleKey)}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(step.descKey)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="gap-2">
            <a href="#humanizer">
              {t("howItWorks.cta")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
