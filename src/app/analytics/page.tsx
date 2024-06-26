import { getCurrentUser } from '@/lib/currentUser'
import { getPlanshipOnServer } from '@/lib/planship'
import type { Planship } from '@planship/fetch'

export default async function Analytics() {
  const planshipClient: Planship = getPlanshipOnServer()
  const usage = await planshipClient.getMeteringIdUsage(getCurrentUser().email, 'button-click')
  return (
    <main>
      <pre>{JSON.stringify(usage, null, 2)}</pre>
    </main>
  )
}
