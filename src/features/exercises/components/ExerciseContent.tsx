"use client"

import { RightPane } from "./layout/RightPane"
import { useInitialExercise } from "../hooks/useInitialExercise"
import { useURLSync } from "../hooks/useURLSync"

/**
 * ExerciseContent - Client-side wrapper for exercise page functionality
 * 
 * This component serves as the bridge between Next.js server components and client-side
 * interactivity. It's rendered by the server component page.tsx but runs on the client.
 * 
 * Architecture Purpose:
 * - Enables server-side metadata generation in page.tsx (for SEO)
 * - While maintaining client-side state management and interactivity
 * - This pattern is necessary because hooks can only be used in client components
 * 
 * Responsibilities:
 * 1. Initializes the selected exercise from URL parameters on mount
 * 2. Keeps the URL in sync with the selected exercise (browser history)
 * 3. Renders the main exercise details panel (RightPane)
 * 
 * Data Flow:
 * - Receives initialSlug from server component (via URL params)
 * - Fetches exercise by slug and updates Redux store
 * - Syncs Redux selection state back to URL for sharing/bookmarking
 * 
 * @param initialSlug - Optional exercise slug from URL query params
 */

type ExerciseContentProps = {
  initialSlug?: string
}

export function ExerciseContent({ initialSlug }: ExerciseContentProps) {
  useInitialExercise(initialSlug)
  useURLSync()
  
  return <RightPane />
}