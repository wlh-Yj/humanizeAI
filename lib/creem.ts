import { createCreem } from 'creem_io'

if (!process.env.CREEM_API_KEY) {
  throw new Error('Missing CREEM_API_KEY environment variable')
}

export const creem = createCreem({
  apiKey: process.env.CREEM_API_KEY,
  testMode: process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_CREEM_TEST_MODE === 'true',
})
