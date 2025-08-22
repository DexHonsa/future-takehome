"use client"

import { Search, ChevronsUp } from "lucide-react"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import { setFilterText, collapseAllGroups } from "../../store/slice"
import { selectFilterText } from "../../store/selectors"
import { GroupToggle } from "./GroupToggle"

/**
 * Search bar and controls at the top of the exercise list
 * Includes search input, collapse all button, and group toggle
 */

export function FilterBar() {
  const dispatch = useAppDispatch()
  const filterText = useAppSelector(selectFilterText)

  return (
    <div className=" bg-white">
      <div className="p-4 pb-0">
        <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => dispatch(setFilterText(e.target.value))}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50 text-neutral-900 "
          />
        </div>
        {!filterText && (
          <button
            onClick={() => dispatch(collapseAllGroups())}
            className="px-3 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-1.5 text-sm text-neutral-700 cursor-pointer"
            title="Collapse all groups"
          >
            <ChevronsUp className="w-4 h-4" />
          </button>
        )}
        </div>
      </div>
      <GroupToggle />
      <div className="pb-3" />
    </div>
  )
}