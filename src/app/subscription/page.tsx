import PlanSubscriptionView from '@/components/PlanSubscriptionView'
import { getPlanshipOnServer } from '@/lib/planship'
import { Planship, Plan, PlanDetails } from '@planship/fetch'

export default async function Plans() {
  const planshipClient: Planship = getPlanshipOnServer()
  const planList: Plan[] = await planshipClient.listPlans()
  const plans: PlanDetails[] = await Promise.all(
    planList.map(async ({ slug }) => {
      const plan: PlanDetails = await planshipClient.getPlan(slug)
      plan.entitlements.sort((planA, planB) => planA.order - planB.order)
      return plan
    })
  )

  return (
    <main>
      <PlanSubscriptionView plans={plans} />
    </main>
  )
}
