import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { setExerciseDetailsLoading, setExerciseDetails } from '../store/slice'
import axios from 'axios'

/**
 * Fetches detailed info for a single exercise
 * Returns loading state and exercise data
 */

export function useExerciseDetails(id: string | null) {
  const dispatch = useAppDispatch()
  const exerciseDetails = useAppSelector(state => 
    id ? state.exercises.exerciseDetails[id] : null
  )
  
  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return
      if (exerciseDetails?.data || exerciseDetails?.loading) return
      
      dispatch(setExerciseDetailsLoading({ id, loading: true }))
      
      try {
        const response = await axios.get(`/api/exercises/${id}`)
        dispatch(setExerciseDetails({ id, data: response.data }))
      } catch {
        dispatch(setExerciseDetailsLoading({ id, loading: false }))
      }
    }
    
    fetchDetails()
  }, [id, dispatch, exerciseDetails])
  
  return exerciseDetails || { data: null, loading: false, error: null }
}