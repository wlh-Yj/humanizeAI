"use client"

import { useI18n } from "@/lib/i18n"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqKeys = [
  { q: "faq.q1" as const, a: "faq.a1" as const },
  { q: "faq.q2" as const, a: "faq.a2" as const },
  { q: "faq.q3" as const, a: "faq.a3" as const },
  { q: "faq.q4" as const, a: "faq.a4" as const },
  { q: "faq.q5" as const, a: "faq.a5" as const },
  { q: "faq.q6" as const, a: "faq.a6" as const },
]

export function FaqSection() {
  const { t } = useI18n()

  return (
    <section id="faq" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6">
        {/* AI Provider Disclaimer */}
        <div className="mb-12 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
          <p className="text-sm leading-relaxed text-blue-900 dark:text-blue-100">
            <strong>About Our Service:</strong> humanizeAI is an independent product that provides a user-friendly interface for AI text processing. 
            We are not affiliated with, endorsed by, or sponsored by OpenAI, Anthropic, Google, or any other AI model providers. 
            Our platform enhances AI-generated content to make it more natural and human-like.
          </p>
        </div>

        <div className="mb-12 text-center">
          <h2 className="text-balance font-display text-3xl font-bold text-foreground md:text-4xl">
            {t("faq.title")}
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqKeys.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground hover:no-underline">
                {t(item.q)}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {t(item.a)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="gap-2">
            <a href="#humanizer">
              {t("faq.cta")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
