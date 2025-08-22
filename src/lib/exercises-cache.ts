import axios from "axios"
import { normalizeExercise } from "@/features/exercises/parsers"
import type { Exercise } from "@/features/exercises/types"

/**
 * Exercise data caching layer
 * Caches API responses to reduce load times
 */

const API_URL = "https://candidate.staging.future.co/sandbox/api/exercises"

let cachedExercises: Exercise[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000

export async function getAllExercises(): Promise<Exercise[]> {
  const now = Date.now()
  
  if (cachedExercises && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedExercises
  }
  
  try {
    const response = await axios.get(API_URL)
    const normalized: Exercise[] = response.data.map(normalizeExercise)
    
    const uniqueExercises = new Map<string, Exercise>()
    normalized.forEach(exercise => {
      uniqueExercises.set(exercise.id, exercise)
    })
    
    cachedExercises = Array.from(uniqueExercises.values())
    cacheTimestamp = now
    
    return cachedExercises
  } catch (error) {
    console.error("Failed to fetch exercises:", error)
    return cachedExercises || []
  }
}

export function clearCache() {
  cachedExercises = null
  cacheTimestamp = 0
}