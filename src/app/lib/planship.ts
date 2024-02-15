import { Planship } from '@planship/fetch'

// Wrap nextjs fetch so there is no caching
function planshipFetch(url, options) {
  return fetch(url, {
    ...options,
    cache: 'no-store'
  })
}

const planshipClient: Planship = new Planship(
  'clicker-demo',
  process.env.PLANSHIP_API_SERVER_URL || 'https://api.planship.io',
  process.env.PLANSHIP_API_CLIENT_ID || '',
  process.env.PLANSHIP_API_CLIENT_SECRET || '',
  planshipFetch
)

export async function getAccessToken() {
  return await fetch('/api/planshipToken').then((response) => response.text())
}

export function getPlanshipOnServer() {
  return planshipClient
}
