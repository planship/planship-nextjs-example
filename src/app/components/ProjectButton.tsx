import { useState } from 'react'
import { usePlanshipCustomer } from '@planship/react'

function RenderProjectButton(projectType: string) {
  const { planshipCustomerApiClient, entitlements } = usePlanshipCustomer()
  let [batchClicks, setBatchClicks] = useState(() => 5)

  const generateClicks = (count: number) => {
    planshipCustomerApiClient?.reportUsage('button-click', count)
  }

  const renderNoMoreClicks = (canGenerateButtonClick: boolean) => {
    if (canGenerateButtonClick) return ''
    return <span className="ml-1">(No more clicks left)</span>
  }

  const canGenerateButtonClick = () =>
    entitlements['subscription-button-clicks'] > 0 && entitlements['button-clicks-per-minute'] > 0

  switch (projectType) {
    case 'Single':
      return (
        <div>
          <button className="clicker-btn" disabled={!canGenerateButtonClick()} onClick={() => generateClicks(1)}>
            Generate single click
            {renderNoMoreClicks(canGenerateButtonClick())}
          </button>
        </div>
      )
    case 'Random':
      return (
        <div>
          <button
            className="clicker-btn"
            disabled={!canGenerateButtonClick()}
            onClick={() => generateClicks(Math.floor(Math.random() * 4) + 1)}
          >
            Generate random clicks
            {renderNoMoreClicks(canGenerateButtonClick())}
          </button>
        </div>
      )
    case 'Batch':
      return (
        <div className="flex gap-x-1">
          <input
            value={batchClicks}
            onChange={(e) => setBatchClicks(e.target.value)}
            min="1"
            max="10"
            type="number"
            className="w-16 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={!canGenerateButtonClick()}
            name="clicks"
          />
          <button
            disabled={!canGenerateButtonClick()}
            className="clicker-btn"
            onClick={() => generateClicks(batchClicks)}
          >
            Generate {batchClicks} clicks
            {renderNoMoreClicks(canGenerateButtonClick())}
          </button>
        </div>
      )
  }
}

export default function ProjectButton({ project, className }: { project: Object; className: string }) {
  return <div className={className}>{RenderProjectButton(project.type)}</div>
}
