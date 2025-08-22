"use client"

import { ChevronRight } from "lucide-react"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { selectSelectedId } from "../../store/selectors"
import { selectExercise } from "../../store/slice"
import { HighlightedText } from "../shared/HighlightedText"
import { SideChip } from "../shared/SideChip"

/**
 * Individual exercise row in the list
 * Clickable item that shows exercise name and highlights when selected
 */

type ExerciseListItemProps = {
  id: string
  name: string,
  side?: string,
  searchTerm?: string
  matchContext?: string
}

export function ExerciseListItem({ id, name, side, searchTerm, matchContext }: ExerciseListItemProps) {
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector(selectSelectedId)
  const isSelected = selectedId === id

  const handleClick = () => {
    dispatch(selectExercise(id))
  }

  return (
    <div
      onClick={handleClick}
      className={`pl-10 pr-4 py-3 cursor-pointer border-b border-neutral-100 transition-colors ${
        isSelected ? "bg-primary-100 hover:bg-primary-50" : "hover:bg-neutral-50"
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <h3 className={`font-medium transition-transform duration-150 ease-in-out ${
            isSelected ? "text-primary-500 translate-x-3" : "text-neutral-900"
          }`}>
            {searchTerm ? (
              <HighlightedText text={name} searchTerm={searchTerm} />
            ) : (
              name
            )} {side && <SideChip className="ml-2" side={side} />}
          </h3>
          <ChevronRight className={`w-4 h-4 ${
            isSelected ? "text-primary-500" : "text-neutral-400"
          }`} />
        </div>
        {matchContext && searchTerm && (
          <div className={`mt-1 mr-5 text-xs text-neutral-500 transition-transform duration-150 ease-in-out break-words ${
            isSelected ? "translate-x-3" : ""
          }`}>
            <HighlightedText text={matchContext} searchTerm={searchTerm} />
          </div>
        )}
      </div>
    </div>
  )
}