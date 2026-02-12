"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Bot, FileText, Layout, Settings, LogIn, LogOut, User, Menu, X, Globe, DollarSign } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { User as SupabaseUser } from "@supabase/supabase-js"
import { HumanizeIcon } from "@/components/humanize-icon"

interface NavItem {
  key: string
  href: string
  icon: LucideIcon
}

export function Header() {
  const pathname = usePathname()
  const { t, locale, setLocale } = useI18n()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
      if (_event === 'SIGNED_OUT') {
        router.refresh()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const navItems: NavItem[] = [
    { key: "nav.humanize", href: "/", icon: Bot },
    { key: "nav.pricing", href: "/pricing", icon: DollarSign },
    { key: "nav.settings", href: "/settings", icon: Settings },
  ]

  const toggleLocale = () => {
    setLocale(locale === "en" ? "zh" : "en")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-500/30">
            <HumanizeIcon className="h-7 w-7 text-white" />
          </div>
          <span className="text-lg font-bold font-display text-foreground">humanizeAI</span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all",
                pathname === item.href 
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" strokeWidth={2.5} />
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 gap-2 rounded-lg border-border/40 hover:border-border"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium uppercase">{locale}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px]">
              <DropdownMenuItem 
                onClick={() => setLocale("en")}
                className={locale === "en" ? "bg-accent" : ""}
              >
                <span className="mr-2">🇺🇸</span>
                English
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLocale("zh")}
                className={locale === "zh" ? "bg-accent" : ""}
              >
                <span className="mr-2">🇨🇳</span>
                中文
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-secondary" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 gap-2 rounded-lg hover:bg-accent"
                >
                  {user.user_metadata.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt={user.email || 'User'}
                      className="h-6 w-6 rounded-full ring-2 ring-border"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <span className="max-w-[100px] truncate text-sm font-medium">
                    {user.user_metadata.full_name || user.email?.split('@')[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[200px]">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.user_metadata.full_name || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("nav.logout") || "Log out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={handleLogin} 
              size="sm" 
              className="h-9 gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 shadow-md hover:shadow-lg transition-all"
            >
              <LogIn className="h-4 w-4" />
              {t("nav.login") || "Log in"}
            </Button>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
                  pathname === item.href 
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md" 
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" strokeWidth={2.5} />
                {t(item.key)}
              </Link>
            ))}
            <div className="flex flex-col gap-3 border-t border-border pt-4">
              {/* Language Toggle */}
              <button
                onClick={toggleLocale}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{locale === "en" ? "English 🇺🇸" : "中文 🇨🇳"}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {locale === "en" ? "Switch to 中文" : "Switch to EN"}
                </span>
              </button>
              
              {/* User Actions */}
              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 rounded-lg bg-accent/50 px-4 py-3">
                    {user.user_metadata.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Avatar"
                        className="h-10 w-10 rounded-full ring-2 ring-border"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user.user_metadata.full_name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleLogout} 
                    size="sm" 
                    variant="outline" 
                    className="w-full gap-2 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("nav.logout") || "Log out"}
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleLogin} 
                  size="sm" 
                  className="w-full gap-2 bg-gradient-to-r from-sky-500 to-blue-600 shadow-md"
                >
                  <LogIn className="h-4 w-4" />
                  {t("nav.login") || "Log in"}
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
