"use client"

import { I18nProvider } from "@/lib/i18n"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText, Book, Code } from "lucide-react"

function DocsContent() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-background">
                <div className="border-b border-border bg-secondary/30 py-16">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <h1 className="text-4xl font-bold md:text-5xl">Documentation</h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Guides, API references, and resources for humanizeAI.
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 py-16">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                <Book className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="mb-3 text-xl font-bold">Getting Started</h2>
                            <p className="mb-6 text-sm text-muted-foreground">
                                Learn the basics of humanizeAI, from account setup to your first humanization.
                            </p>
                            <span className="text-sm font-medium text-primary">Coming Soon</span>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="mb-3 text-xl font-bold">Guides & Tutorials</h2>
                            <p className="mb-6 text-sm text-muted-foreground">
                                Deep dive into advanced features, tips for best results, and use cases.
                            </p>
                            <span className="text-sm font-medium text-primary">Coming Soon</span>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                <Code className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="mb-3 text-xl font-bold">API Reference</h2>
                            <p className="mb-6 text-sm text-muted-foreground">
                                Integrate humanizeAI into your own applications with our REST API.
                            </p>
                            <span className="text-sm font-medium text-primary">Coming Soon</span>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default function DocsPage() {
    return (
        <I18nProvider>
            <DocsContent />
        </I18nProvider>
    )
}
