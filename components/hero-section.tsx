"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import { useI18n } from "@/lib/i18n"
import { Bot, User, Upload, ClipboardPaste, Zap, Copy, Trash2, FileText, ArrowRight, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SAMPLE_TEXT = `Artificial intelligence has revolutionized the way we approach problem-solving in the modern era. The integration of machine learning algorithms into various industries has led to unprecedented advancements in efficiency and productivity. Furthermore, the development of natural language processing capabilities has enabled more intuitive human-computer interactions, facilitating seamless communication between users and AI systems.`

export function HeroSection() {
  const { t } = useI18n()
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [mode, setMode] = useState("GPTZero")
  const [fluency, setFluency] = useState("High")
  const [readability, setReadability] = useState("University")
  const [undetectable, setUndetectable] = useState("Standard")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const modes = ["GPTZero", "ZeroGPT", "Turnitin", "Academic"]

  const handleHumanize = useCallback(async () => {
    if (!inputText.trim()) return
    setIsProcessing(true)
    setOutputText("")

    try {
      const response = await fetch('/api/humanize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          mode: mode,
          fluency: fluency,
          readability: readability,
          undetectable: undetectable,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to humanize text')
      }

      const data = await response.json()

      // Simulate typing effect
      let i = 0
      const humanized = data.humanizedText
      const interval = setInterval(() => {
        setOutputText(humanized.slice(0, i))
        i += 3
        if (i > humanized.length) {
          setOutputText(humanized)
          clearInterval(interval)
          setIsProcessing(false)
        }
      }, 10)

    } catch (error) {
      console.error('Error humanizing text:', error)
      setIsProcessing(false)
      // Ideally show a toast or error message here
    }
  }, [inputText, mode, fluency, readability, undetectable])

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInputText(text)
    } catch {
      // fallback
    }
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = ev.target?.result
      if (typeof result === "string") {
        setInputText(result)
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }, [])

  const handleCopy = useCallback(() => {
    if (outputText) {
      navigator.clipboard.writeText(outputText)
    }
  }, [outputText])

  return (
    <section id="humanizer" className="relative overflow-hidden bg-background py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(200_90%_48%/0.06),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <h1 className="text-balance font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("hero.title")}{" "}
            <span className="bg-gradient-to-r from-primary to-[hsl(180_70%_40%)] bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            {t("hero.subtitle")}
          </p>
          
          {/* Academic Integrity Notice */}
          <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-amber-200 bg-amber-50 p-4 text-left dark:border-amber-900 dark:bg-amber-950">
            <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-100">
              <strong>⚠️ Important:</strong> This tool is designed for content improvement and writing assistance. 
              Do not use it for academic dishonesty, plagiarism, or any unethical purposes. 
              Always follow your institution's academic integrity policies.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          {/* Input Panel */}
          <div className="flex flex-col rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
              <Bot className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-card-foreground">{t("hero.aiContent")}</span>
            </div>

            <div className="flex flex-col gap-3 border-b border-border px-5 py-4">
              {/* Mode Selection */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{t("hero.mode")}:</span>
                <div className="flex gap-1.5">
                  {modes.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${mode === m
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Parameters */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Fluency</span>
                  <Select value={fluency} onValueChange={setFluency}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Low" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Readability</span>
                  <Select value={readability} onValueChange={setReadability}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="University" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="University">University</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Undetectable</span>
                  <Select value={undetectable} onValueChange={setUndetectable}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Standard" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Enhanced">Enhanced</SelectItem>
                      <SelectItem value="Ultimate">Ultimate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-2 border-b border-border px-5 py-2.5">
              <button
                onClick={handlePaste}
                className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <ClipboardPaste className="h-3.5 w-3.5" />
                {t("hero.pasteBtn")}
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <Upload className="h-3.5 w-3.5" />
                {t("hero.uploadPdf")}
              </button>
              <button
                onClick={() => setInputText(SAMPLE_TEXT)}
                className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <FileText className="h-3.5 w-3.5" />
                {t("hero.trySample")}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                aria-label="Upload file"
              />
            </div>

            <div className="relative flex-1 p-5">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t("hero.pasteText")}
                className="h-full min-h-[220px] w-full resize-none bg-transparent text-sm leading-relaxed text-card-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between border-t border-border px-5 py-3">
              <span className="text-xs text-muted-foreground">
                {inputText.length} {t("hero.charCount")}
              </span>
              <div className="flex items-center gap-2">
                {inputText && (
                  <button
                    onClick={() => { setInputText(""); setOutputText("") }}
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {t("hero.clear")}
                  </button>
                )}
                <Button
                  onClick={handleHumanize}
                  disabled={!inputText.trim() || isProcessing}
                  size="sm"
                  className="gap-1.5"
                >
                  <Zap className="h-4 w-4" />
                  {t("hero.humanize")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-success" />
                <span className="text-sm font-semibold text-card-foreground">{t("hero.humanizedContent")}</span>
              </div>
              {outputText && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {t("hero.copy")}
                </button>
              )}
            </div>

            <div className="flex-1 p-5">
              {outputText ? (
                <p className="text-sm leading-relaxed text-card-foreground">{outputText}</p>
              ) : (
                <div className="flex h-full min-h-[310px] flex-col items-center justify-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    {t("hero.humanizedPlaceholder")}
                  </p>
                </div>
              )}
              {isProcessing && (
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:200ms]" />
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:400ms]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
