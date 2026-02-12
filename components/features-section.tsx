"use client"

import { useI18n } from "@/lib/i18n"
import { Brain, Sparkles, Lock, Gauge } from "lucide-react"

const features = [
  {
    icon: Brain,
    titleKey: "Advanced AI Algorithms",
    titleKeyZh: "Advanced AI Algorithms",
    descKey: "Powered by state-of-the-art natural language processing to produce genuinely human-sounding text.",
    descKeyZh: "Powered by state-of-the-art natural language processing to produce genuinely human-sounding text.",
  },
  {
    icon: Lock,
    titleKey: "Undetectable Output",
    titleKeyZh: "Undetectable Output",
    descKey: "Achieves 99%+ human scores across all major AI detection platforms consistently.",
    descKeyZh: "Achieves 99%+ human scores across all major AI detection platforms consistently.",
  },
  {
    icon: Gauge,
    titleKey: "Lightning Fast",
    titleKeyZh: "Lightning Fast",
    descKey: "Transform your content in seconds, not hours. Save valuable time with one-click humanization.",
    descKeyZh: "Transform your content in seconds, not hours. Save valuable time with one-click humanization.",
  },
  {
    icon: Sparkles,
    titleKey: "Original & Plagiarism-Free",
    titleKeyZh: "Original & Plagiarism-Free",
    descKey: "Every output is uniquely rewritten to pass plagiarism checkers alongside AI detection systems.",
    descKeyZh: "Every output is uniquely rewritten to pass plagiarism checkers alongside AI detection systems.",
  },
]

export function FeaturesSection() {
  const { t } = useI18n()

  return (
    <section id="features" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-balance font-display text-3xl font-bold text-foreground md:text-4xl">
            {t("features.title")}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.titleKey}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-card-foreground">
                {feature.titleKey}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.descKey}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
