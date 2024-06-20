'use client'

import { createContext, useContext, useState } from 'react'
import type { CustomerSubscriptionWithPlan } from '@planship/fetch'
import { usePlanshipCustomer } from '@planship/react'

type changePlanFn = (newPlanSlug: string) => Promise<void>
interface IPlanshipSubscriptionContext {
  planSubscription?: CustomerSubscriptionWithPlan
  changePlan?: changePlanFn
}

const PlanshipSubscriptionContext = createContext<IPlanshipSubscriptionContext>({})

export const PlanshipSubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const { planshipCustomerApiClient, subscriptions } = usePlanshipCustomer()

  const [planSubscription, setDefaultSubscription] = useState(() => subscriptions?.[0])

  const changePlan = async (newPlanSlug: string) => {
    return planshipCustomerApiClient
      .modifySubscription(subscriptions?.[0].subscriptionId, {
        planSlug: newPlanSlug,
        renewPlanSlug: newPlanSlug
      })
      .then((subscription: CustomerSubscriptionWithPlan) => {
        setDefaultSubscription(subscription)
      })
  }
  return (
    <PlanshipSubscriptionContext.Provider value={{ planSubscription, changePlan }}>
      {children}
    </PlanshipSubscriptionContext.Provider>
  )
}

export const usePlanshipSubscription = () => useContext(PlanshipSubscriptionContext)
