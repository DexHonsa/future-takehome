"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import { toggleGroup } from "../../store/slice"
import { selectExpandedGroups } from "../../store/selectors"
import { ExerciseListItem } from "./ExerciseListItem"
import { useGroupExercises } from "../../hooks"
import { ExerciseListSkeleton } from "./skeletons/ExerciseListSkeleton"

/**
 * Collapsible section for a muscle group or equipment category
 * Click header to expand/collapse the list of exercises
 */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: -10 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    }
  }
}

type MuscleGroupSectionProps = {
  name: string
  count: number
  type: 'muscle' | 'equipment'
}

export function MuscleGroupSection({ name, count, type }: MuscleGroupSectionProps) {
  const dispatch = useAppDispatch()
  const expandedGroups = useAppSelector(selectExpandedGroups)
  const isExpanded = expandedGroups.includes(name)
  const groupExercises = useGroupExercises(name, type, isExpanded)

  const handleToggle = () => {
    dispatch(toggleGroup(name))
  }

  return (
    <div className="border-b border-neutral-100">
      <button
        onClick={handleToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <h3 className={`font-semibold text-sm ${isExpanded ? "text-primary-500" : "text-neutral-900"}`}>{name}</h3>
          <span className="text-xs text-neutral-500">({count})</span>
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {groupExercises.loading ? (
              <ExerciseListSkeleton />
            ) : (
              <motion.div 
                className="bg-neutral-0 border-t border-neutral-100"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {groupExercises.data.map((exercise, index) => (
                  <motion.div
                    key={exercise.id}
                    variants={itemVariants}
                    custom={index}
                  >
                    <ExerciseListItem 
                      id={exercise.id}
                      name={exercise.name}
                      side={exercise.side}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}