import { NextResponse } from 'next/server'
import { z } from 'zod'
import { humanizerService } from '@/lib/llm-service'
import { createClient } from '@/lib/supabase/server'

const MAX_TEXT_LENGTH = 20_000
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 10

const requestSchema = z.object({
  text: z.string().trim().min(1).max(MAX_TEXT_LENGTH),
  mode: z.enum(['GPTZero', 'ZeroGPT', 'Turnitin', 'Academic', 'Standard']).optional(),
  fluency: z.enum(['Low', 'Medium', 'High']).optional(),
  readability: z.enum(['High School', 'University', 'PhD']).optional(),
  undetectable: z.enum(['Standard', 'Enhanced', 'Ultimate']).optional(),
})

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>()

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'anonymous'
}

function isRateLimited(request: Request) {
  const now = Date.now()
  const key = getClientKey(request)
  const bucket = rateLimitBuckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  bucket.count += 1
  return bucket.count > RATE_LIMIT_MAX_REQUESTS
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(request)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      )
    }

    let payload: unknown
    try {
      payload = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      )
    }

    const parsed = requestSchema.safeParse(payload)

    if (!parsed.success) {
      return NextResponse.json(
        { error: `Text is required and must be ${MAX_TEXT_LENGTH} characters or fewer.` },
        { status: 422 }
      )
    }

    const { text, mode, fluency, readability, undetectable } = parsed.data

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('word_count, word_limit')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    const wordCount = text.trim().split(/\s+/).filter(Boolean).length

    if (profile.word_count + wordCount > profile.word_limit) {
      return NextResponse.json(
        { error: 'Word limit exceeded. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    const humanized = await humanizerService.humanize(text, { mode, fluency, readability, undetectable })

    await supabase.rpc('increment_word_count', {
      user_id: user.id,
      count: wordCount,
    })

    return NextResponse.json({ humanizedText: humanized })
  } catch (error) {
    console.error('Error humanizing text:', error)
    if (error instanceof Error && error.message === 'Missing AI_API_KEY environment variable') {
      return NextResponse.json(
        { error: 'Humanizer is not configured' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process text. Ensure your API key is valid.' },
      { status: 500 }
    )
  }
}
