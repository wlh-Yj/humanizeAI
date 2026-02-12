import OpenAI from 'openai'



const DEFAULT_MODEL = "google/gemini-2.0-flash-001"
const PROMPTS = {
    "GPTZero": `You are an expert ghostwriter specializing in bypassing AI detectors like GPTZero.
Your goal is to rewrite the text to maximize "perplexity" and "burstiness".

Guidelines:
1. **Extreme Variation**: radically vary sentence length and structure. mix very short fragments with long, complex sentences.
2. **Unpredictable Vocabulary**: Use synonyms that are less common for AI models but natural for humans.
3. **Structure Breaking**: Avoid standard 5-paragraph essay structures. Use more organic, conversational flows.
4. **Tone**: Casual, human, slightly imperfect but grammatically correct.`,

    "ZeroGPT": `You are an expert ghostwriter specializing in bypassing ZeroGPT.
Your goal is to creating completely undetectable content.

Guidelines:
1. **Natural Flow**: Focus on a conversational, storytelling style.
2. **Idiomatic Expressions**: Use idioms and colloquialisms where appropriate.
3. **No Repetition**: Strictly avoid repeating sentence starters or transitional phrases.`,

    "Turnitin": `You are an academic rewriting expert.
Your goal is to paraphrase the text to avoid plagiarism detection while maintaining academic integrity.

Guidelines:
1. **Structural Rephrasing**: Do not just swap synonyms. Change the active/passive voice, combine or split sentences.
2. **Academic Tone**: Maintain a formal, scholarly tone.
3. **Clarity**: Ensure the core arguments remain clear and precise.`,

    "Academic": `You are a professor editing a student's paper.
Your goal is to elevate the writing style to a high academic standard.

Guidelines:
1. **Sophisticated Vocabulary**: Use precise, domain-specific terminology.
2. **Formal Structure**: Ensure logical flow and strong transitions between arguments.
3. **Objectivity**: Maintain a neutral, objective voice.`,

    "Standard": `You are an expert ghostwriter specializing in "humanizing" AI-generated text.
Your goal is to rewrite the provided text to make it indistinguishable from human writing.

Guidelines:
1. **Burstiness**: Vary sentence structures and lengths significantly.
2. **Perplexity**: Use natural, sometimes unpredictable vocabulary choices.
3. **Tone**: Adopt a natural, conversational, yet professional tone.
4. **No AI preamble**: Output only the rewritten text.`
}

export interface HumanizeOptions {
    model?: string
    temperature?: number
    mode?: string
    fluency?: "Low" | "Medium" | "High"
    readability?: "High School" | "University" | "PhD"
    undetectable?: "Standard" | "Enhanced" | "Ultimate"
}

export class HumanizerService {
    private openai: OpenAI

    constructor() {
        const apiKey = process.env.AI_API_KEY
        const baseURL = process.env.AI_BASE_URL || 'https://api.openai.com/v1'

        if (!apiKey) {
            throw new Error('Missing AI_API_KEY environment variable')
        }

        this.openai = new OpenAI({
            apiKey,
            baseURL,
            defaultHeaders: {
                'HTTP-Referer': 'https://github.com/wanglonghua/humanize',
                'X-Title': 'Humanize',
            },
        })
    }

    async humanize(text: string, options: HumanizeOptions = {}): Promise<string> {
        try {
            let systemPrompt = PROMPTS[options.mode as keyof typeof PROMPTS] || PROMPTS["Standard"]

            // Append instructions based on advanced parameters
            if (options.fluency) {
                if (options.fluency === "Low") systemPrompt += "\n- **Fluency**: Allow minor grammatical imperfections for a more natural, raw, human feel."
                if (options.fluency === "Medium") systemPrompt += "\n- **Fluency**: Maintain a standard, clear flow with correct grammar."
                if (options.fluency === "High") systemPrompt += "\n- **Fluency**: Ensure polished, seamless transitions and perfect, sophisticated grammar."
            }

            if (options.readability) {
                if (options.readability === "High School") systemPrompt += "\n- **Readability**: Use simple, accessible vocabulary (8th-10th grade level). Avoid jargon."
                if (options.readability === "University") systemPrompt += "\n- **Readability**: Use sophisticated, academic vocabulary suitable for college level."
                if (options.readability === "PhD") systemPrompt += "\n- **Readability**: Use highly technical, dense, and complex terminology, assuming expert knowledge."
            }

            if (options.undetectable) {
                if (options.undetectable === "Standard") systemPrompt += "\n- **Undetectable**: Balance readability with burstiness to bypass standard detection."
                if (options.undetectable === "Enhanced") systemPrompt += "\n- **Undetectable**: SIGNIFICANTLY increase sentence variety and perplexity."
                if (options.undetectable === "Ultimate") systemPrompt += "\n- **Undetectable**: MAXIMIZE entropy and structural variance. Prioritize bypassing detection above all else, even if flow is slightly compromised."
            }

            const completion = await this.openai.chat.completions.create({
                model: options.model || DEFAULT_MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: text },
                ],
                temperature: options.temperature || 0.7,
            })

            return completion.choices[0].message.content || ""
        } catch (error) {
            console.error("LLM Service Error:", error)
            throw new Error("Failed to humanize text")
        }
    }
}

export const humanizerService = new HumanizerService()
