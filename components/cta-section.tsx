"use client"

import { useI18n } from "@/lib/i18n"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  const { t } = useI18n()

  return (
    <section className="border-t border-border bg-primary py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-balance font-display text-3xl font-bold text-primary-foreground md:text-4xl">
          {t("cta.title")}
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-primary-foreground/80">
          {t("cta.subtitle")}
        </p>
        <div className="mt-8">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="gap-2 bg-background text-foreground hover:bg-background/90"
          >
            <a href="#humanizer">
              {t("cta.button")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
