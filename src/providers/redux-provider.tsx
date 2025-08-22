"use client"

import { Provider } from "react-redux"
import { ReactNode } from "react"
import type { AppStore } from "@/store"

/**
 * Redux provider wrapper component
 * Simple wrapper to provide Redux store to children
 */

type ReduxProviderProps = {
  children: ReactNode
  store: AppStore
}

export function ReduxProvider({ children, store }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>
}