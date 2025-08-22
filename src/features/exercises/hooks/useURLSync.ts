import { useEffect } from 'react'
import { useAppSelector } from '@/hooks/useAppSelector'
import { selectSelectedId } from '../store/selectors'
import { useExerciseDetails } from './useExerciseDetails'

/**
 * Syncs selected exercise with browser URL
 * Updates URL when selection changes for bookmarking/sharing
 */

export function useURLSync() {
  const selectedId = useAppSelector(selectSelectedId)
  const exerciseDetails = useExerciseDetails(selectedId)
  
  useEffect(() => {
    if (selectedId && exerciseDetails.data) {
      const url = new URL(window.location.href)
      url.searchParams.set('exercise', exerciseDetails.data.slug)
      window.history.replaceState({}, '', url.toString())
      document.title = `${exerciseDetails.data.name} Exercise Guide`
    } else if (!selectedId) {
      const url = new URL(window.location.href)
      url.searchParams.delete('exercise')
      window.history.replaceState({}, '', url.toString())
      document.title = 'Browse Exercises'
    }
  }, [selectedId, exerciseDetails.data])
}