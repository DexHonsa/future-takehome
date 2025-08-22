"use client"

import { ReactNode, useRef } from "react"
import { Provider } from "react-redux"
import { makeStore } from "@/store"
import type { AppStore } from "@/store"

/**
 * Main app providers wrapper
 * Initializes Redux store and wraps the app
 */

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const storeRef = useRef<AppStore | undefined>(undefined)
  
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  
  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  )
}