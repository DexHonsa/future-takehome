import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { selectExercise } from '../store/slice'
import axios from 'axios'

/**
 * Loads initial exercise from URL slug
 * Sets the selected exercise when page loads
 */

export function useInitialExercise(initialSlug?: string) {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const loadInitialExercise = async () => {
      if (!initialSlug) return
      
      try {
        const response = await axios.get(`/api/exercises/slug/${encodeURIComponent(initialSlug)}`)
        if (response.data.id) {
          dispatch(selectExercise(response.data.id))
        }
      } catch {
      }
    }
    
    loadInitialExercise()
  }, [initialSlug, dispatch])
}