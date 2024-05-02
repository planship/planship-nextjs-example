'use client'

import { createContext, useContext } from 'react'
import { getCurrentUser } from '@/lib/currentUser'

interface ICurrentUserContext {
  name?: string
  email?: string
  imageUrl?: string
}
const CurrentUserContext = createContext<ICurrentUserContext>({})

export const CurrentUserProvider = ({ children }: { children: React.ReactNode }) => {
  const currentUser = getCurrentUser()
  return <CurrentUserContext.Provider value={currentUser}>{children}</CurrentUserContext.Provider>
}

export const useCurrentUser = () => useContext(CurrentUserContext)
