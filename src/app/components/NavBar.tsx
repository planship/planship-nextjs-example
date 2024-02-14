'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Image from 'next/image'

import { usePlanshipCustomer } from '@planship/react'
import { useCurrentUser } from './CurrentUserProvider'
import { usePlanshipSubscription } from './PlanshipSubscriptionProvider'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const pathname = usePathname()
  const currentUser = useCurrentUser()

  const { entitlements } = usePlanshipCustomer()
  const { planSubscription } = usePlanshipSubscription()

  return (
    <Disclosure as="nav" className="bg-gray-800 text-gray-300">
      <div className="mx-auto max-w-full px-4">
        <div className="flex items-start md:items-center justify-between py-3">
          <div className="grow flex flex-col md:flex-row">
            <div className="flex items-center flex-row">
              <Link href="/" className={classNames(pathname === '/' ? 'bg-gray-700' : '', 'block nav-link')}>
                Projects
              </Link>
              {entitlements['analytics-panel'] ? (
                <Link
                  href="/analytics"
                  className={classNames(pathname === '/analytics' ? 'bg-gray-700' : '', 'block nav-link')}
                >
                  Analytics
                </Link>
              ) : (
                ''
              )}
              <Link
                href="/subscription"
                className={classNames(pathname === '/subscription' ? 'bg-gray-700' : '', 'block nav-link')}
              >
                Plans
              </Link>
            </div>
            <div className="grow" />
            <div className="flex flex-col md:flex-row mt-3 md:mt-0 md:items-center">
              <div className="nav-caption">Subscription clicks left: {entitlements['subscription-button-clicks']}</div>
              <div className="nav-caption">Clicks left this minute: {entitlements['button-clicks-per-minute']}</div>
            </div>
          </div>
          <div className="shrink-0">
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="user-btn">
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={currentUser?.imageUrl}
                    height={32}
                    width={32}
                    alt={`${currentUser?.name || 'placeholder'} avatar`}
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    <span className="block px-4 py-2 text-sm text-gray-700">
                      Signed in as <strong>{currentUser.name}</strong>
                    </span>
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={classNames('block px-4 py-2 text-sm text-gray-700', active ? 'bg-gray-100' : '')}
                        href="/subscription"
                      >
                        My plan: {planSubscription?.plan.name}
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
