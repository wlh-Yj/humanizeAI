"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Locale = "en" | "zh"

const translations = {
  en: {
    // Nav
    "nav.humanize": "Humanizer",
    "nav.documents": "Documents",
    "nav.templates": "Templates",
    "nav.settings": "Settings",
    "nav.features": "Features",
    "nav.howItWorks": "How It Works",
    "nav.caseStudies": "Case Studies",
    "nav.testimonials": "Testimonials",
    "nav.faq": "FAQ",
    "nav.pricing": "Pricing",
    "nav.getStarted": "Get Started",
    "nav.login": "Log in",
    "nav.logout": "Log out",

    // Hero
    "hero.title": "Humanize AI Text &",
    "hero.titleHighlight": "Bypass AI Detectors",
    "hero.subtitle":
      "The fastest, most affordable, and least detectable AI humanizer, guaranteed to outperform any competitor.",
    "hero.aiContent": "AI Content",
    "hero.humanizedContent": "Humanized Content",
    "hero.pasteText": "Paste your AI-generated text here...",
    "hero.humanizedPlaceholder": "Your humanized content will appear here.",
    "hero.humanize": "Humanize",
    "hero.pasteBtn": "Paste Text",
    "hero.uploadPdf": "Upload File",
    "hero.trySample": "Try Sample",
    "hero.mode": "Mode",
    "hero.charCount": "characters",
    "hero.copy": "Copy",
    "hero.clear": "Clear",

    // Trust
    "trust.title": "We beat every AI detector",
    "trust.joinPrefix": "Join",
    "trust.joinCount": "10,000+",
    "trust.joinSuffix": "users already using our AI humanizer tool!",

    // Features
    "features.title": "The Most Trusted Undetectable AI Bypasser",
    "features.subtitle":
      "A cutting-edge undetectable AI tool designed to humanize AI-generated content and bypass detection systems. Powered by advanced algorithms, our AI Bypasser converts AI-generated text into natural, plagiarism-free, human-like content.",

    // How it works
    "howItWorks.title": "How AI Humanizers Help You",
    "howItWorks.step1.title": "Protect Against False Positives",
    "howItWorks.step1.desc":
      "AI detectors like GPTZero often misidentify human-written content as AI-generated. Our tool ensures your content bypasses AI detection, letting you submit your work with confidence.",
    "howItWorks.step2.title": "Remove ChatGPT Watermarks",
    "howItWorks.step2.desc":
      "ChatGPT embeds watermarks in its text, but our anti-AI detector quickly replaces these patterns with natural, human-like wording. No more anxiety about being detected!",
    "howItWorks.step3.title": "Save Time Rewriting AI Text",
    "howItWorks.step3.desc":
      "On average, users spend 2-3 hours humanizing AI-generated text by hand. Why waste time when you can do it with the click of a button, correctly, every time?",
    "howItWorks.cta": "Humanize Now",

    // Case studies
    "caseStudies.title": "Humanize AI Content & Beat Detectors Every Time",
    "caseStudies.subtitle":
      "Our bypass AI tool helps you achieve 99%+ human scores on even the most advanced AI detectors, including:",
    "caseStudies.cta": "Humanize Now",
    "caseStudies.humanScore": "Human Score",

    // Testimonials
    "testimonials.title": "User Feedback",
    "testimonials.subtitle":
      "Feedback is reviewed before publication to ensure authenticity.",

    // Plagiarism
    "plagiarism.title": "Pass Plagiarism Checkers Every Time",
    "plagiarism.subtitle":
      "Your safety is our top priority! Our advanced technology ensures humanized text passes all plagiarism checks alongside AI detection.",
    "plagiarism.cta": "Generate Original Text",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "What is an AI detection remover?",
    "faq.a1":
      "An AI detection remover or AI bypasser is an undetectable AI writing tool designed to help users bypass AI detectors by producing AI content with 100% human scores.",
    "faq.q2": "Why is it important to bypass AI detection?",
    "faq.a2":
      "If you're a student, you may want to make sure your work passes stringent, oftentimes inaccurate AI checkers. If you're a content creator, bypassing AI detectors means your content is less likely to get penalized by search engines. If you're an advertiser, it helps your content read more naturally and avoid being flagged as spam.",
    "faq.q3": "How does this AI humanizer work?",
    "faq.a3":
      "Our tool uses advanced algorithms to analyze and rewrite AI-generated content. It replaces patterns typically flagged by AI detectors with natural, human-like phrasing while maintaining the original meaning and quality.",
    "faq.q4": "What languages are supported?",
    "faq.a4":
      "Currently, our tool supports humanizing AI text in English and Chinese. We are continuously working to add more language support.",
    "faq.q5": "Is it free to use?",
    "faq.a5":
      "We offer every new user free words to humanize AI text. You can subscribe to our paid plans to unlock more words and features. Check out our pricing page for more details.",
    "faq.q6": "How to make AI text undetectable?",
    "faq.a6":
      "You can try techniques like adding data or updated facts to your content, making the tone more casual, or using AI detection bypass tools like ours to humanize AI text instantly.",
    "faq.cta": "Humanize Now",

    // Footer
    "footer.tagline": "Make your AI text 100% undetectable with a trusted AI bypasser.",
    "footer.services": "Services",
    "footer.policies": "Policies",
    "footer.company": "Company",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions",
    "footer.contact": "Contact Us",
    "footer.about": "About Us",
    "footer.blog": "Blog",
    "footer.copyright": "2026 humanizeAI. All rights reserved.",

    // CTA
    "cta.title": "Ready to Humanize Your AI Text?",
    "cta.subtitle": "Start humanizing your content now. Fast, affordable, and undetectable.",
    "cta.button": "Get Started Free",
  },
  zh: {
    // Nav
    "nav.humanize": "人性化",
    "nav.documents": "文档",
    "nav.templates": "模板",
    "nav.settings": "设置",
    "nav.features": "功能特性",
    "nav.howItWorks": "使用方法",
    "nav.caseStudies": "案例展示",
    "nav.testimonials": "用户评价",
    "nav.faq": "常见问题",
    "nav.pricing": "定价",
    "nav.getStarted": "立即开始",
    "nav.login": "登录",
    "nav.logout": "登出",

    // Hero
    "hero.title": "人性化AI文本 &",
    "hero.titleHighlight": "绕过AI检测器",
    "hero.subtitle":
      "最快、最实惠、最不易察觉的人工智能人性化器，保证会超越任何竞争对手。",
    "hero.aiContent": "AI 内容",
    "hero.humanizedContent": "人性化内容",
    "hero.pasteText": "在此粘贴您的AI生成文本...",
    "hero.humanizedPlaceholder": "您的人性化内容将在此显示。",
    "hero.humanize": "人性化",
    "hero.pasteBtn": "粘贴文本",
    "hero.uploadPdf": "上传文件",
    "hero.trySample": "试用示例",
    "hero.mode": "模式",
    "hero.charCount": "字符",
    "hero.copy": "复制",
    "hero.clear": "清除",

    // Trust
    "trust.title": "我们击败了所有AI检测器",
    "trust.joinPrefix": "已有",
    "trust.joinCount": "10,000+",
    "trust.joinSuffix": "用户正在使用我们的AI人性化工具！",

    // Features
    "features.title": "最值得信赖的不可检测AI绕过器",
    "features.subtitle":
      "一款尖端的不可检测AI工具，旨在人性化AI生成的内容并绕过检测系统。由先进算法驱动，我们的AI绕过器将AI生成的文本转换为自然的、无抄袭的、类人的内容。",

    // How it works
    "howItWorks.title": "AI人性化器如何帮助您",
    "howItWorks.step1.title": "防止误判",
    "howItWorks.step1.desc":
      "GPTZero等AI检测器经常将人类撰写的内容误判为AI生成。我们的工具确保您的内容可以绕过AI检测，让您自信地提交作品。",
    "howItWorks.step2.title": "移除ChatGPT水印",
    "howItWorks.step2.desc":
      "ChatGPT在其文本中嵌入水印，但我们的反AI检测器可以快速将这些模式替换为自然的、类人的措辞。不再为被检测到而焦虑！",
    "howItWorks.step3.title": "节省重写AI文本的时间",
    "howItWorks.step3.desc":
      "用户平均花费2-3小时手动人性化AI生成的文本。为什么浪费时间呢？只需点击一下按钮，即可正确完成！",
    "howItWorks.cta": "立即人性化",

    // Case studies
    "caseStudies.title": "人性化AI内容，每次都击败检测器",
    "caseStudies.subtitle":
      "我们的AI绕过工具帮助您在最先进的AI检测器上获得99%+的人类评分，包括：",
    "caseStudies.cta": "立即人性化",
    "caseStudies.humanScore": "人类评分",

    // Testimonials
    "testimonials.title": "用户反馈",
    "testimonials.subtitle": "我们会先审核反馈真实性，再公开展示。",

    // Plagiarism
    "plagiarism.title": "每次都通过抄袭检查",
    "plagiarism.subtitle":
      "您的安全是我们的首要任务！我们的先进技术确保人性化文本通过所有抄袭检查和AI检测。",
    "plagiarism.cta": "生成原创文本",

    // FAQ
    "faq.title": "常见问题",
    "faq.q1": "什么是AI检测移除器？",
    "faq.a1":
      "AI检测移除器或AI绕过器是一种不可检测的AI写作工具，旨在帮助用户通过产生具有100%人类评分的AI内容来绕过AI检测器。",
    "faq.q2": "为什么绕过AI检测很重要？",
    "faq.a2":
      "如果您是学生，您可能想确保您的作品能通过严格但经常不准确的AI检查器。如果您是内容创作者，绕过AI检测器意味着您的内容不太可能被搜索引擎惩罚。如果您是广告商，它可以帮助您的内容读起来更自然，避免被标记为垃圾邮件。",
    "faq.q3": "这个AI人性化器是如何工作的？",
    "faq.a3":
      "我们的工具使用先进的算法来分析和重写AI生成的内容。它将通常被AI检测器标记的模式替换为自然的、类人的措辞，同时保持原始含义和质量。",
    "faq.q4": "支持哪些语言？",
    "faq.a4":
      "目前，我们的工具支持英语和中文的AI文本人性化。我们正在持续努力添加更多语言支持。",
    "faq.q5": "使用是否免费？",
    "faq.a5":
      "我们为每位新用户提供免费额度来人性化AI文本。您可以订阅付费计划以解锁更多额度和功能。请查看我们的定价页面了解更多详情。",
    "faq.q6": "如何使AI文本不可检测？",
    "faq.a6":
      "您可以尝试一些技巧，如向内容添加数据或更新事实，使语气更加随意，或使用AI检测绕过工具来即时人性化AI文本。",
    "faq.cta": "立即人性化",

    // Footer
    "footer.tagline": "使用值得信赖的AI绕过器使您的AI文本100%不可检测。",
    "footer.services": "服务",
    "footer.policies": "政策",
    "footer.company": "公司",
    "footer.privacy": "隐私政策",
    "footer.terms": "条款与条件",
    "footer.contact": "联系我们",
    "footer.about": "关于我们",
    "footer.blog": "博客",
    "footer.copyright": "2026 humanizeAI。保留所有权利。",

    // CTA
    "cta.title": "准备好人性化您的AI文本了吗？",
    "cta.subtitle": "立即开始人性化您的内容。快速、实惠、不可检测。",
    "cta.button": "免费开始",
  },
} as const

type TranslationKey = keyof (typeof translations)["en"]

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[locale][key] || key
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
