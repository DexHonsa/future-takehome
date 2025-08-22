import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { setGroupExercisesLoading, setGroupExercises } from '../store/slice'
import axios from 'axios'

/**
 * Fetches exercises for a specific muscle group or equipment
 * Only loads when the group is expanded
 */

export function useGroupExercises(groupName: string, type: 'muscle' | 'equipment', isExpanded: boolean) {
  const dispatch = useAppDispatch()
  const key = `${type}:${groupName}`
  const groupExercises = useAppSelector(state => state.exercises.groupExercises[key])
  
  useEffect(() => {
    const fetchExercises = async () => {
      if (!isExpanded) return
      if (groupExercises?.data?.length > 0 || groupExercises?.loading) return
      
      dispatch(setGroupExercisesLoading({ key, loading: true }))
      
      try {
        const encodedName = encodeURIComponent(groupName)
        const response = await axios.get(`/api/exercises/group/${encodedName}?type=${type}`)
        dispatch(setGroupExercises({ key, data: response.data.exercises }))
      } catch {
        dispatch(setGroupExercisesLoading({ key, loading: false }))
      }
    }
    
    fetchExercises()
  }, [groupName, type, isExpanded, dispatch, key, groupExercises])
  
  return groupExercises || { data: [], loading: false, error: null }
}