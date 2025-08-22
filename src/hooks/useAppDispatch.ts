import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store"

/**
 * Typed Redux dispatch hook
 * Ensures type safety when dispatching actions
 */

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()