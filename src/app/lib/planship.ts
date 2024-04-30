import { Planship, CustomerSubscriptionWithPlan, ResponseError } from '@planship/fetch'

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
    extras: {
      fetchApi: planshipFetch
    }
  }
)

export async function getAccessToken() {
  return await fetch('/api/planshipToken').then((response) => response.text())
}

export function getPlanshipOnServer() {
  return planshipClient
}

export async function fetchSubscriptions(userId: string) {
  let customer
  try {
    customer = await planshipClient.getCustomer(userId)
  } catch (error) {
    if (error?.response?.status === 404) {
      customer = await planshipClient.createCustomer({ alternativeId: userId })
    } else {
      throw error
    }
  }
  if (customer) {
    const subscriptions = await planshipClient.listSubscriptions(customer.id)
    if (subscriptions.length > 0) {
      return subscriptions
    } else {
      return [await planshipClient.createSubscription(customer.id, 'personal')]
    }
  }
  return []
}

export async function fetchEntitlements(userId: string) {
  return await planshipClient.getEntitlements(userId)
}
