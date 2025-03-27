'use client'

import { usePlanshipCustomer, EntitlementsBase, withPlanshipCustomerProvider } from '@planship/react'
import { getAccessToken } from '@/lib/planship'
import type { CustomerSubscriptionWithPlan, Entitlements } from '@planship/react'
import { useCurrentUser } from './CurrentUserProvider'
import type { ReactNode } from 'react'

export class ClickerEntitlements extends EntitlementsBase {
  get subscriptionButtonClicks(): number {
    return this.entitlementsDict?.['subscription-button-clicks'].valueOf()
  }

  get maxProjects(): number {
    return this.entitlementsDict?.['max-projects']
  }

  get analyticsPanel(): boolean {
    return this.entitlementsDict?.['analytics-panel']
  }

  get projectTypes(): [] {
    return this.entitlementsDict?.['project-types']
  }
}

export const CurrentPlanshipCustomerProvider = ({
  children,
  initialEntitlements
}: {
  children: ReactNode
  initialEntitlements: Entitlements
  initialSubscriptions: CustomerSubscriptionWithPlan[]
}) => {
  const currentUser = useCurrentUser()
  const PlanshipCustomerProvider = withPlanshipCustomerProvider(
    {
      slug: 'clicker-demo',
      baseUrl: process.env.NEXT_PUBLIC_PLANSHIP_API_CLIENT_URL,
      webSocketUrl: process.env.NEXT_PUBLIC_PLANSHIP_WEBSOCKET_URL,
      customerId: currentUser.email,
      getAccessToken
    },
    initialEntitlements,
  )

  return <PlanshipCustomerProvider>{children}</PlanshipCustomerProvider>
}

export const useCurrentPlanshipCustomer = () => {
  return usePlanshipCustomer<ClickerEntitlements>(ClickerEntitlements)
}
