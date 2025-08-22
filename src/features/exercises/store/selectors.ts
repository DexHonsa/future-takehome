import type { RootState } from "@/store"

/**
 * Redux selectors for exercise state
 * Provides type-safe access to specific parts of the store
 */

export const selectFilterText = (state: RootState) => state.exercises.filterText
export const selectSelectedId = (state: RootState) => state.exercises.selectedId
export const selectExpandedGroups = (state: RootState) => state.exercises.expandedGroups
export const selectGroupBy = (state: RootState) => state.exercises.groupBy

