import { Planship } from '@planship/fetch'

export async function getAccessToken() {
  return await fetch('/api/planshipToken').then((response) => response.text())
}

export function getPlanshipOnServer() {
  return new Planship(
    'clicker-demo',
    process.env.PLANSHIP_API_SERVER_URL || 'https://api.planship.io',
    process.env.PLANSHIP_API_CLIENT_ID || '',
    process.env.PLANSHIP_API_CLIENT_SECRET || ''
  )
}
