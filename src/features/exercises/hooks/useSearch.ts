import { useEffect, useRef } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { setSearchLoading, setSearchResults, clearSearch } from '../store/slice'
import axios from 'axios'

/**
 * Searches exercises with debouncing
 * Returns matching exercises with highlighted terms
 */

export function useSearch(query: string, delay = 300) {
  const dispatch = useAppDispatch()
  const searchResults = useAppSelector(state => state.exercises.searchResults)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  
  useEffect(() => {
    if (!query) {
      dispatch(clearSearch())
      return
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    dispatch(setSearchLoading(true))
    
    timeoutRef.current = setTimeout(async () => {
      try {
        const response = await axios.get(`/api/exercises/search?q=${encodeURIComponent(query)}`)
        dispatch(setSearchResults({ query, data: response.data.results }))
      } catch {
        dispatch(setSearchLoading(false))
      }
    }, delay)
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [query, delay, dispatch])
  
  return searchResults
}