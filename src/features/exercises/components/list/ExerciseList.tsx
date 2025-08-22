"use client"

import { useAppSelector } from "@/hooks/useAppSelector"
import { selectFilterText, selectGroupBy } from "../../store/selectors"
import { MuscleGroupSection } from "./MuscleGroupSection"
import { useGroups, useSearch } from "../../hooks"
import { GroupListSkeleton } from "./skeletons/GroupListSkeleton"
import { SearchResultsSection } from "./SearchResultsSection"

/**
 * Main exercise list that switches between grouped view and search results
 * Shows exercises grouped by muscle/equipment or filtered search results
 */

export function ExerciseList() {
  const filterText = useAppSelector(selectFilterText)
  const groupBy = useAppSelector(selectGroupBy)
  const groups = useGroups(groupBy)
  const searchResults = useSearch(filterText)
  const isSearching = Boolean(filterText)

  if (isSearching) {
    if (searchResults.loading) {
      return <GroupListSkeleton />
    }
    
    if (searchResults.data.length === 0) {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-neutral-500">No exercises found</p>
        </div>
      )
    }

    return (
      <div className="flex-1 overflow-y-auto">
        <div className="pb-20">
          <SearchResultsSection results={searchResults.data} query={filterText} />
        </div>
      </div>
    )
  }

  if (groups.loading) {
    return <GroupListSkeleton />
  }

  if (groups.data.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-neutral-500">No groups found</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="pb-20">
        {groups.data.map((group) => (
          <MuscleGroupSection 
            key={`${groupBy}:${group.name}`} 
            name={group.name}
            count={group.count}
            type={groupBy}
          />
        ))}
      </div>
    </div>
  )
}