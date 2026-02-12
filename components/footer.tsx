"use client"

import { useI18n } from "@/lib/i18n"
import { HumanizeIcon } from "@/components/humanize-icon"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600">
                <HumanizeIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold font-display text-foreground">humanizeAI</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">{t("footer.services")}</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  AI Humanizer
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Bypass GPTZero
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Bypass Turnitin
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Bypass Originality.ai
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">{t("footer.policies")}</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t("footer.terms")}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">{t("footer.company")}</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t("footer.contact")}
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/wlh-Yj/humanizeAI.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {t("footer.copyright")}
          </p>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            humanizeAI is an independent product and is not affiliated with, endorsed by, or sponsored by OpenAI, Anthropic, Google, or any AI model providers.
          </p>
        </div>
      </div>
    </footer>
  )
}
