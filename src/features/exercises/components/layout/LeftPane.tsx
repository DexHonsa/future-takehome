"use client"

import { FilterBar } from "../list/FilterBar"
import { ExerciseList } from "../list/ExerciseList"

/**
 * Left sidebar containing the exercise list and search
 * Responsive - slides in/out on mobile, always visible on desktop
 */

type LeftPaneProps = {
  isOpen: boolean
}

export function LeftPane({ isOpen }: LeftPaneProps) {
  return (
    <div className={`
      md:w-[400px] w-[85vw] max-w-sm
      border-r border-neutral-200 
      flex flex-col bg-white 
      md:relative fixed
      md:translate-x-0 transition-transform duration-300 ease-in-out
      md:z-20 z-40
      md:top-0 top-14
      md:h-full h-[calc(100vh-3.5rem)]
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}>
      <FilterBar />
      <ExerciseList />
    </div>
  )
}