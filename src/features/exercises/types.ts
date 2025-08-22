/**
 * TypeScript type definitions for exercises
 * Defines the shape of exercise data throughout the app
 */

export type Exercise = {
  id: string
  slug: string
  name: string
  description: string
  muscleGroups: string[],
  movementPatterns: string[],
  equipment: string[]
  side?: string
  videoUrl?: string
  videoIsFlipped?: boolean
  audioUrl?: string
}

export type MinimalExercise = {
  id: string
  name: string
  slug: string
  side?: string
}

export type SearchResult = {
  id: string
  name: string
  slug: string
  side?: string
  matchContext?: string
}

export type GroupInfo = {
  name: string
  count: number
}