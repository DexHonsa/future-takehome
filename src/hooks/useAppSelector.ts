import { useSelector } from "react-redux"
import type { RootState } from "@/store"

/**
 * Typed Redux selector hook
 * Provides type-safe access to store state
 */

export const useAppSelector = useSelector.withTypes<RootState>()