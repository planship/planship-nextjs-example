import { useState } from 'react'
import { useCurrentUser } from './CurrentUserProvider'
import { useCurrentPlanshipCustomer } from './PlanshipCustomerProvider'

interface IProject {
  name: string
  type: string
}

function RenderProjectButton(projectType: string, projectName: string) {
  const { entitlements } = useCurrentPlanshipCustomer()
  const currentUser = useCurrentUser()
  const [batchClicks, setBatchClicks] = useState(() => 5)

  const generateClicks = (count: number) => {
    fetch('/api/click', {
      method: 'post',
      body: JSON.stringify({
        customerId: currentUser.email,
        count,
        projectName
      })
    })
  }

  const renderNoMoreClicks = (canGenerateButtonClick: boolean) => {
    if (canGenerateButtonClick) return ''
    return <span className="ml-1">(No more clicks left)</span>
  }

  const canGenerateButtonClick = () => entitlements.subscriptionButtonClicks > 0

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

export default function ProjectButton({ project, className }: { project: IProject; className: string }) {
  return <div className={className}>{RenderProjectButton(project.type, project.name)}</div>
}
