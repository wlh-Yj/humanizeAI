"use client"

import { useI18n } from "@/lib/i18n"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const cases = [
  { name: "GPTZero", score: 98, color: "hsl(200 90% 48%)" },
  { name: "Originality.ai", score: 99, color: "hsl(152 69% 45%)" },
  { name: "ZeroGPT", score: 97, color: "hsl(220 70% 55%)" },
  { name: "Turnitin", score: 99, color: "hsl(340 65% 50%)" },
  { name: "Winston AI", score: 98, color: "hsl(270 55% 55%)" },
  { name: "Copyleaks", score: 96, color: "hsl(30 80% 50%)" },
]

function ScoreRing({ score, color, name }: { score: number; color: string; name: string }) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md">
      <div className="relative">
        <svg width="100" height="100" className="-rotate-90" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-foreground">{score}%</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <CheckCircle2 className="h-4 w-4" style={{ color }} />
        <span className="text-sm font-semibold text-foreground">{name}</span>
      </div>
    </div>
  )
}

export function CaseStudiesSection() {
  const { t } = useI18n()

  return (
    <section id="case-studies" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-balance font-display text-3xl font-bold text-foreground md:text-4xl">
            {t("caseStudies.title")}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {t("caseStudies.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cases.map((c) => (
            <ScoreRing key={c.name} score={c.score} color={c.color} name={c.name} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="gap-2">
            <a href="#humanizer">
              {t("caseStudies.cta")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
