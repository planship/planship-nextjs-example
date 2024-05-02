import PlanSubscriptionView from '@/components/PlanSubscriptionView'
import { getPlanshipOnServer } from '@/lib/planship'
import type { Planship, Plan, PlanDetails } from '@planship/fetch'

export default async function Plans() {
  const planshipClient: Planship = getPlanshipOnServer()
  const planList: Plan[] = await planshipClient.listPlans()
  const plans: PlanDetails[] = await Promise.all(planList.map(async ({ slug }) => await planshipClient.getPlan(slug)))

  return (
    <main>
      <PlanSubscriptionView plans={plans} />
    </main>
  )
}
