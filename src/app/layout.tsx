import type { Metadata } from 'next'
import PlanshipProvider from './components/PlanshipProvider'
import { getPlanshipOnServer } from './lib/planship'
import { Planship } from '@planship/fetch'
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
  const apiClient: Planship = getPlanshipOnServer()
  const entitlements = await apiClient.getEntitlements(currentUser.email)
  const subscriptions = await apiClient.listSubscriptions(currentUser.email)
  return (
    <html lang="en">
      <body className="flex flex-col overflow-hidden h-[calc(100dvh)]">
        <CurrentUserProvider>
          <PlanshipProvider initialEntitlements={entitlements} initialSubscrptions={subscriptions}>
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
