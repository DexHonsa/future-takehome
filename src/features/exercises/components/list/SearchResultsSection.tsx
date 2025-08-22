"use client"

import { SearchResult } from "../../types"
import { ExerciseListItem } from "./ExerciseListItem"

/**
 * Displays search results with highlighted matching terms
 * Shows where the match was found (name, description, muscles, etc)
 */

type SearchResultsSectionProps = {
  results: SearchResult[]
  query: string
}

export function SearchResultsSection({ results, query }: SearchResultsSectionProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 border-t border-b border-neutral-200 sticky top-0 z-30">
        <p className="text-sm font-medium text-neutral-600">
          {results.length} results for &quot;{query}&quot;
        </p>
      </div>
      <div className="bg-neutral-50">
        {results.map((result) => (
          <ExerciseListItem 
            key={result.id}
            id={result.id}
            name={result.name}
            side={result.side}
            searchTerm={query}
            matchContext={result.matchContext}
          />
        ))}
      </div>
    </div>
  )
}