'use client'

import { withPlanshipCustomerProvider } from '@planship/react'
import { getAccessToken } from '@/lib/planship'
import type { CustomerSubscriptionWithPlan, Entitlements } from '@planship/fetch'
import { useCurrentUser } from './CurrentUserProvider'

export default function PlanshipProvider({
  children,
  initialEntitlements,
  initialSubscriptions
}: {
  children: React.ReactNode
  initialEntitlements: Entitlements
  initialSubscriptions: CustomerSubscriptionWithPlan[]
}) {
  const currentUser = useCurrentUser()
  const PlanshipCustomerProvider = withPlanshipCustomerProvider(
    {
      slug: 'clicker-demo',
      customerId: currentUser.email,
      getAccessToken
    },
    initialEntitlements,
    initialSubscriptions
  )

  return <PlanshipCustomerProvider>{children}</PlanshipCustomerProvider>
}
