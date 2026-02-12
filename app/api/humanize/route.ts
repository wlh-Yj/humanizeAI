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

    const humanized = await humanizerService.humanize(text, { mode, fluency, readability, undetectable })

    return NextResponse.json({ humanizedText: humanized })
  } catch (error) {
    console.error('Error humanizing text:', error)
    return NextResponse.json(
      { error: 'Failed to process text. Ensure your API key is valid.' },
      { status: 500 }
    )
  }
}
