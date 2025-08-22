import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { setGroupsLoading, setGroups, setGroupsError } from '../store/slice'
import axios from 'axios'

/**
 * Fetches available exercise groups (muscle or equipment)
 * Returns groups with exercise counts
 */

export function useGroups(type: 'muscle' | 'equipment') {
  const dispatch = useAppDispatch()
  const groups = useAppSelector(state => state.exercises.groups[type])
  
  useEffect(() => {
    const fetchGroups = async () => {
      if (groups.data.length > 0 || groups.loading) return
      
      dispatch(setGroupsLoading({ type, loading: true }))
      
      try {
        const response = await axios.get(`/api/exercises/groups?type=${type}`)
        dispatch(setGroups({ type, data: response.data.groups }))
      } catch {
        dispatch(setGroupsError({ type, error: 'Failed to fetch groups' }))
      }
    }
    
    fetchGroups()
  }, [type, dispatch, groups.data.length, groups.loading])
  
  return groups
}