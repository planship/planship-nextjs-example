import { Planship, TokenResponse } from '@planship/fetch'
import { getPlanshipOnServer } from '@/lib/planship'

// Server API route that returns a Planship token fetched via a Planship API
export async function GET() {
  const client: Planship = getPlanshipOnServer()
  const token: string = await client.getAccessToken().then((tokenData: TokenResponse) => tokenData.accessToken)
  return new Response(token)
}
