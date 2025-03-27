import type { CustomerSubscriptionWithPlan, Entitlements } from '@planship/react'

import { Planship } from '@planship/fetch'

// Wrap nextjs fetch so there is no caching
function planshipFetch(url, options) {
  return fetch(url, {
    ...options,
    cache: 'no-store'
  })
}

const planshipClient: Planship = new Planship(
  'clicker-demo',
  {
    clientId: process.env.PLANSHIP_API_CLIENT_ID,
    clientSecret: process.env.PLANSHIP_API_CLIENT_SECRET
  },
  {
    baseUrl: process.env.PLANSHIP_API_SERVER_URL,
    extras: {
      fetchApi: planshipFetch
    }
  }
)

export async function getAccessToken(): Promise<string> {
  return await fetch('/api/planshipToken').then((response) => response.text())
}

export function getPlanshipOnServer(): Planship {
  return planshipClient
}

export async function fetchSubscriptions(userId: string): Promise<CustomerSubscriptionWithPlan[]> {
  let customer
  try {
    customer = await planshipClient.getCustomer(userId)
  } catch (error) {
    if (error?.response?.status === 404) {
      // Create a Planship customer for the default user if one doesn't exist. This would typically be called during
      // a new customer sign-up, but this example app doesn't implement the sign-up/sign-in flow.
      customer = await planshipClient.createCustomer({ alternativeId: userId })
    } else {
      throw error
    }
  }
  if (customer) {
    const subscriptions: CustomerSubscriptionWithPlan[] = await planshipClient.listSubscriptions(customer.id)
    if (subscriptions.length > 0) {
      return subscriptions
    } else {
      // Create an initial Planship subscription to the Personal plan for the default user if one doesn't exist.
      // This would typically be called when a customer chooses their initial plan upon sign-up, but this example app
      // doesn't implement the sign-up/sign-in flow.
      return [await planshipClient.createSubscription(customer.id, 'personal')]
    }
  }
  return []
}

export async function fetchEntitlements(userId: string): Promise<Entitlements> {
  return await planshipClient.getEntitlements(userId)
}
