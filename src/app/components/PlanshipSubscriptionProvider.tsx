'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { CustomerSubscriptionWithPlan } from '@planship/react'
import { usePlanshipCustomer } from '@planship/react'

type changePlanFn = (newPlanSlug: string) => Promise<void>
interface IPlanshipSubscriptionContext {
  planSubscription?: CustomerSubscriptionWithPlan
  changePlan?: changePlanFn
}

const PlanshipSubscriptionContext = createContext<IPlanshipSubscriptionContext>({})

export const PlanshipSubscriptionProvider = ({
  children,
  initialSubscriptions
}: {
  children: React.ReactNode
  initialSubscriptions: []
}) => {
  const { planshipCustomerApiClient } = usePlanshipCustomer()

  const [subscriptions, setSubscriptions] = useState(() => initialSubscriptions)
  const [planSubscription, setDefaultSubscription] = useState(() => initialSubscriptions?.[0])

  const changePlan = async (newPlanSlug: string) => {
    return planshipCustomerApiClient
      ?.modifySubscription(subscriptions?.[0].subscriptionId, {
        planSlug: newPlanSlug,
        renewPlanSlug: newPlanSlug
      })
      .then((subscription: CustomerSubscriptionWithPlan) => {
        setDefaultSubscription(subscription)
      })
  }

  useEffect(() => {
    async function fetchSubscriptions() {
      planshipCustomerApiClient?.listSubscriptions().then((s) => setSubscriptions(s))
    }

    fetchSubscriptions()
  }, [planshipCustomerApiClient])

  useEffect(() => {
    setDefaultSubscription(subscriptions?.[0])
  }, [subscriptions])

  return (
    <PlanshipSubscriptionContext.Provider value={{ planSubscription, changePlan }}>
      {children}
    </PlanshipSubscriptionContext.Provider>
  )
}

export const usePlanshipSubscription = () => useContext(PlanshipSubscriptionContext)
