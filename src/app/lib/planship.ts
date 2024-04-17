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
  {
    clientId: process.env.PLANSHIP_API_CLIENT_ID,
    clientSecret: process.env.PLANSHIP_API_CLIENT_SECRET
  },
  {
    extras: {
      fetchApi: planshipFetch
    }
  }
)

export async function getAccessToken() {
  return await fetch('/api/planshipToken').then((response) => response.text())
}

export function getPlanshipOnServer() {
  return planshipClient
}
