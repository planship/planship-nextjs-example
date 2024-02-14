'use client'

import { withPlanshipCustomerProvider } from '@planship/react'
import { getAccessToken } from '@/lib/planship'
import { CustomerSubscriptionWithPlan, JSONValue } from '@planship/fetch'
import { useCurrentUser } from './CurrentUserProvider'

export default function PlanshipProvider({
  children,
  initialEntitlements,
  initialSubscrptions
}: {
  children: React.ReactNode
  initialEntitlements: JSONValue
  initialSubscrptions: CustomerSubscriptionWithPlan[]
}) {
  const currentUser = useCurrentUser()
  const PlanshipCustomerProvider = withPlanshipCustomerProvider(
    {
      url: process.env.NEXT_PUBLIC_PLANSHIP_API_CLIENT_URL,
      websocketUrl: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
      slug: 'clicker-demo',
      customerId: currentUser.email,
      getAccessToken: getAccessToken
    },
    initialEntitlements,
    initialSubscrptions
  )

  return <PlanshipCustomerProvider>{children}</PlanshipCustomerProvider>
}
