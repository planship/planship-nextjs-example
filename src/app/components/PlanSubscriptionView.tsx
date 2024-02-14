'use client'

import { RadioGroup } from '@headlessui/react'
import { PlanDetails } from '@planship/fetch'
import { useState, Fragment } from 'react'
import { usePlanshipSubscription } from './PlanshipSubscriptionProvider'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function PlanSubscriptionVew({ plans }: { plans: PlanDetails[] }) {
  const { planSubscription, changePlan } = usePlanshipSubscription()
  const [planSelection, setPlanSelection] = useState(() => planSubscription?.plan.slug)

  return (
    <div className="p-4 md:px-16">
      <RadioGroup value={planSelection} onChange={setPlanSelection}>
        <RadioGroup.Label className="sr-only">Plan</RadioGroup.Label>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {plans?.map((plan) => (
            <RadioGroup.Option key={plan.slug} value={plan.slug} as={Fragment}>
              {({ active, checked }) => (
                <div
                  className={classNames(
                    active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300' : '',
                    checked ? 'bg-blue-600 bg-opacity-75 text-white ' : 'bg-white ',
                    'md:flex-1 md:flex-grow w-full cursor-pointer p-4 rounded-lg mx-auto text-center shadow-md focus:outline-none'
                  )}
                >
                  <RadioGroup.Label
                    as="p"
                    className={classNames(checked ? 'text-white' : 'text-gray-900', 'text-2xl font-semibold')}
                  >
                    {plan.name}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="div"
                    className={classNames(checked ? 'text-sky-100' : 'text-gray-500', 'inline')}
                  >
                    <p className="font-light my-2">{plan.description}</p>
                    <ul role="list" className={classNames('text-left', checked ? 'text-white' : 'text-gray-900')}>
                      {plan?.entitlements?.map((entitlement) => (
                        <li
                          key={entitlement.name}
                          value={entitlement.name}
                          className="flex mb-1 items-center space-x-2"
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: entitlement.name
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </RadioGroup.Description>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <div className="flex mt-10 justify-end ">
        <button
          type="button"
          className={classNames(
            planSubscription.plan.slug !== planSelection ? 'bg-green-500 hover:bg-opacity-90' : 'bg-gray-400',
            'block md:w-64 w-full rounded-md px-10 py-3 text-base text-white font-medium'
          )}
          disabled={planSubscription.plan.slug === planSelection}
          onClick={async () => {
            await changePlan(planSelection)
          }}
        >
          Change subscription
        </button>
      </div>
    </div>
  )
}
