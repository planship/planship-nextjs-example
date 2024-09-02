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

  get buttonClicksPerMinute(): number {
    return this.entitlementsDict?.['button-clicks-per-minute']
  }

  get maxProjects(): number {
    return this.entitlementsDict?.['max-projects']
  }

  get premiumButton(): boolean {
    return this.entitlementsDict?.['premium-button']
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
