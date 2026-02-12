"use client"

import { I18nProvider, useI18n } from "@/lib/i18n"
import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { HumanizeIcon } from "@/components/humanize-icon"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { User as SupabaseUser } from "@supabase/supabase-js"

function SettingsContent() {
    const { t } = useI18n()
    const router = useRouter()
    const supabase = createClient()
    const [user, setUser] = useState<SupabaseUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        getUser()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
        router.push('/')
    }

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-background">
                <div className="container mx-auto max-w-4xl px-4 py-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">{t("nav.settings")}</h1>
                        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
                    </div>

                    {loading ? (
                        <Card>
                            <CardContent className="py-12">
                                <div className="flex items-center justify-center">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                                </div>
                            </CardContent>
                        </Card>
                    ) : !user ? (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Account
                                </CardTitle>
                                <CardDescription>
                                    Please log in to view your profile and settings.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="py-8">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-500/10 to-blue-600/10">
                                        <HumanizeIcon className="h-10 w-10 text-sky-600" />
                                    </div>
                                    <p className="text-center text-sm text-muted-foreground">
                                        Sign in with Google to save your preferences and access your humanized content.
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button onClick={handleLogin} className="w-full">
                                    {t("nav.login")}
                                </Button>
                            </CardFooter>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Profile Information
                                </CardTitle>
                                <CardDescription>
                                    Your personal account details.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    {user.user_metadata.avatar_url && (
                                        <img
                                            src={user.user_metadata.avatar_url}
                                            alt="Avatar"
                                            className="h-16 w-16 rounded-full border-2 border-border"
                                        />
                                    )}
                                    <div>
                                        <p className="font-medium text-lg">{user.user_metadata.full_name || "User"}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Account ID: {user.id.slice(0, 8)}...
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            You are currently on the <span className="font-semibold text-foreground">Free Plan</span>
                                        </p>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => window.open('https://creem.io/portal', '_blank')}
                                            >
                                                Manage Subscription
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.push('/pricing')}
                                            >
                                                Upgrade Plan
                                            </Button>
                                        </div>
                                    </div>
                                    <Button variant="destructive" onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        {t("nav.logout")}
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    )
}

export default function SettingsPage() {
    return (
        <I18nProvider>
            <SettingsContent />
        </I18nProvider>
    )
}
