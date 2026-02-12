"use client"

import { useI18n } from "@/lib/i18n"
import { ShieldCheck } from "lucide-react"

const detectors = [
  "GPTZero",
  "Turnitin",
  "Originality.ai",
  "ZeroGPT",
  "Winston AI",
  "Copyleaks",
  "Content at Scale",
  "Sapling",
]

export function TrustBar() {
  const { t } = useI18n()

  return (
    <section className="border-y border-border bg-secondary/50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
            {t("trust.title")}
          </h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          {detectors.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-sm"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10">
                <ShieldCheck className="h-3 w-3 text-success" />
              </div>
              <span className="text-sm font-medium text-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
