'use client'

import ProjectButton from './ProjectButton'
import { useState, useEffect } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'
import { usePlanshipCustomer } from '@planship/react'

export default function ProjectsView() {
  const { entitlements } = usePlanshipCustomer()
  const [newProjectName, setNewProjectName] = useState('New project')
  const [newProjectType, setNewProjectType] = useState('Single')
  const [isOpen, setIsOpen] = useState(false)
  const [projectsLoaded, setProjectsLoaded] = useState(true)

  const [projects, setProjects] = useState([
    { name: 'First project', type: 'Single' },
    {
      name: 'Second project',
      type: 'Single'
    }
  ])

  const canCreateProject = () => entitlements?.['max-projects'] > projects.length

  useEffect(() => {
    if (!projectsLoaded) {
      window.localStorage.setItem('projects', JSON.stringify(projects))
    }
    setProjectsLoaded(false)
  }, [projects, projectsLoaded])

  useEffect(() => {
    const projects = window.localStorage.getItem('projects')
    if (projects) {
      setProjects(JSON.parse(projects))
    }
  }, [])

  const createProject = () => {
    setProjects([
      ...projects,
      {
        name: newProjectName,
        type: newProjectType
      }
    ])
    setIsOpen(false)
  }

  const deleteProject = (index: number) => {
    const tmpProjects = Array.from(projects)
    tmpProjects.splice(index, 1)
    setProjects(tmpProjects)
  }

  return (
    <div className="px-4">
      <div role="list">
        {projects.map((project, index) => (
          <div key={project.name} className="flex flex-col sm:flex-row gap-1 p-2 my-3 border">
            <div className="flex grow w-full">
              <div className="w-32">
                <p className="project-name">{project.name}</p>
                <p className="project-type">Type: {project.type}</p>
              </div>
              <ProjectButton className="sm:w-64 w-full ml-2" project={project} />
            </div>
            <div className="grow" />
            <div className="flex grow items-center w-full sm:w-auto justify-center">
              <div className="sm:hidden grow" />
              <div className="w-16 flex justify-end">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                  onClick={() => deleteProject(index)}
                >
                  <span className="sr-only">Delete</span>
                  <TrashIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex py-2 justify-stretch">
        <button className="create-project-btn" disabled={!canCreateProject()} onClick={() => setIsOpen(true)}>
          Create new project
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Create a new project
              </Dialog.Title>
              <div className="mt-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Name
                  </label>
                  <input
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Project name"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-state"
                  >
                    Type
                  </label>
                  <div className="relative">
                    <select
                      value={newProjectType}
                      onChange={(e) => setNewProjectType(e.target.value)}
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option disabled={!entitlements['project-types']?.includes('Single')}>Single</option>
                      <option disabled={!entitlements['project-types']?.includes('Random')}>Random</option>
                      <option disabled={!entitlements['project-types']?.includes('Batch')}>Batch</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-x-2">
                <button type="button" className="create-project-dlg-btn bg-gray-400" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button type="button" className="create-project-dlg-btn bg-green-500" onClick={() => createProject()}>
                  OK
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
