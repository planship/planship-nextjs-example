'use client'

import { useState, useEffect } from 'react'
import { useCurrentPlanshipCustomer } from './PlanshipCustomerProvider'
import type { LeverUsage } from '@planship/react'

export default function AnalyticsView({ initialUsage }: { initialUsage: { [key: string]: LeverUsage } }) {
  const [usage, setUsage] = useState(() => initialUsage)
  const { planshipCustomerApiClient } = useCurrentPlanshipCustomer()

  useEffect(() => {
    async function fetchUsage() {
      planshipCustomerApiClient?.getMeteringIdUsage('button-click').then((usage) => setUsage(usage))
    }

    fetchUsage()
  }, [planshipCustomerApiClient])

  return <pre>{JSON.stringify(usage, null, 2)}</pre>
}
