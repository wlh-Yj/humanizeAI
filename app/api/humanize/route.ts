import { NextResponse } from 'next/server'
import { humanizerService } from '@/lib/llm-service'

export async function POST(request: Request) {
  try {
    const { text, mode, fluency, readability, undetectable } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // Check user authentication and limits
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('word_count, word_limit')
      .eq('id', user.id)
      .single()

    if (!profile) {
      // Should not happen if trigger works, but handle gracefully
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    const wordCount = text.trim().split(/\s+/).length

    if (profile.word_count + wordCount > profile.word_limit) {
      return NextResponse.json(
        { error: 'Word limit exceeded. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    const humanized = await humanizerService.humanize(text, { mode, fluency, readability, undetectable })

    // Increment usage
    await supabase.rpc('increment_word_count', {
      user_id: user.id,
      count: wordCount
    })

    return NextResponse.json({ humanizedText: humanized })
  } catch (error) {
    console.error('Error humanizing text:', error)
    return NextResponse.json(
      { error: 'Failed to process text. Ensure your API key is valid.' },
      { status: 500 }
    )
  }
}
