import type { Metadata } from 'next'
import PlanshipProvider from './components/PlanshipProvider'
import { fetchSubscriptions, fetchEntitlements } from './lib/planship'
import './globals.css'
import { CurrentUserProvider } from './components/CurrentUserProvider'
import NavBar from './components/NavBar'
import { getCurrentUser } from './lib/currentUser'
import { PlanshipSubscriptionProvider } from './components/PlanshipSubscriptionProvider'

export const metadata: Metadata = {
  title: 'Planship Clicker',
  description: 'Planship Clicker demo for Next.js'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = getCurrentUser()
  const subscriptions = await fetchSubscriptions(currentUser.email)
  const entitlements = await fetchEntitlements(currentUser.email)
  return (
    <html lang="en">
      <body className="flex flex-col overflow-hidden h-[calc(100dvh)]">
        <CurrentUserProvider>
          <PlanshipProvider initialEntitlements={entitlements} initialSubscriptions={subscriptions}>
            <PlanshipSubscriptionProvider>
              <NavBar />
              <div className="flex-grow overflow-y-scroll">{children}</div>
              <div className="bg-gray-800 text-white text-center py-2">PlanshipClicker</div>
            </PlanshipSubscriptionProvider>
          </PlanshipProvider>
        </CurrentUserProvider>
      </body>
    </html>
  )
}
