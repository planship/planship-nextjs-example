'use client'

import { withPlanshipCustomerProvider } from '@planship/react'
import { getAccessToken } from '@/lib/planship'
import { CustomerSubscriptionWithPlan, Entitlements } from '@planship/fetch'
import { useCurrentUser } from './CurrentUserProvider'

export default function PlanshipProvider({
  children,
  initialEntitlements,
  initialSubscrptions
}: {
  children: React.ReactNode
  initialEntitlements: Entitlements
  initialSubscrptions: CustomerSubscriptionWithPlan[]
}) {
  const currentUser = useCurrentUser()
  const PlanshipCustomerProvider = withPlanshipCustomerProvider(
    {
      baseUrl: process.env.NEXT_PUBLIC_PLANSHIP_API_CLIENT_URL,
      webSocketUrl: process.env.NEXT_PUBLIC_PLANSHIP_WEBSOCKET_URL,
      slug: 'clicker-demo',
      customerId: currentUser.email,
      getAccessToken
    },
    initialEntitlements,
    initialSubscrptions
  )

  return <PlanshipCustomerProvider>{children}</PlanshipCustomerProvider>
}
