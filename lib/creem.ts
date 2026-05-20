import { createCreem } from 'creem_io'

export function getCreemClient() {
  const apiKey = process.env.CREEM_API_KEY

  if (!apiKey) {
    throw new Error('Missing CREEM_API_KEY environment variable')
  }

  return createCreem({
    apiKey,
    webhookSecret: process.env.CREEM_WEBHOOK_SECRET,
    testMode: process.env.NODE_ENV !== 'production',
  })
}
