import type { Planship } from '@planship/fetch'
import { getPlanshipOnServer } from '@/lib/planship'

// Server API route that records and reports a button click
export async function POST(request: Request) {
  const body = await request.json()
  console.log('Button click received!')
  console.dir(body)

  const planship: Planship = getPlanshipOnServer()
  planship.reportUsage(body.customerId, 'button-click', body.count)

  return new Response()
}
