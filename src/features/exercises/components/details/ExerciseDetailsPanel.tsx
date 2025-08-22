"use client"

import { Dumbbell, BicepsFlexed } from "lucide-react"
import { motion } from "framer-motion"
import { Tags } from "./Tags"
import { SideChip } from "../shared/SideChip"
import { AudioButton } from "./AudioButton"
import type { Exercise } from "../../types"

/**
 * Detailed info panel showing exercise description, muscles, and equipment
 * Displays on the right side when an exercise is selected
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
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const
    }
  }
}

type ExerciseDetailsPanelProps = {
  exercise: Exercise
}

export function ExerciseDetailsPanel({ exercise }: ExerciseDetailsPanelProps) {
  return (
    <div className="md:w-[400px] w-full bg-white md:border-l border-t md:border-t-0 border-neutral-200 md:overflow-hidden z-20 flex-shrink-0 md:pb-0 pb-20">
      <motion.div 
        key={exercise.id}
        className="p-6 pb-24 md:pb-6 md:h-full md:overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-neutral-900 gap-2 items-center flex">
            {exercise.name} 
            
            </h1>
            {exercise.audioUrl && (
              <AudioButton audioUrl={exercise.audioUrl} exerciseId={exercise.id} />
            )}
          </div>
        </motion.div>
        
        <motion.p 
          variants={itemVariants}
          className="text-sm text-neutral-600 leading-relaxed mb-6"
        >
          {exercise.description}
        </motion.p>

        
        
        <motion.div className="space-y-5">
          {exercise.muscleGroups.length > 0 && (
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-2">
                <BicepsFlexed className="w-4 h-4 text-primary-500" />
                <h3 className="text-sm font-semibold text-neutral-900">Muscle Groups</h3>
              </div>
              <Tags items={exercise.muscleGroups} type="primary" />
            </motion.div>
          )}
          
          {exercise.equipment.length > 0 && (
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="w-4 h-4 text-primary-500" />
                <h3 className="text-sm font-semibold text-neutral-900">Equipment</h3>
              </div>
              <Tags items={exercise.equipment} type="secondary" />
            </motion.div>
          )}
          { exercise.side && (
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-2">
                
                <h3 className="text-sm font-semibold text-neutral-900">Side</h3>
              </div>
              {exercise.side && <SideChip side={exercise.side} />}
            </motion.div>
          )}
           { exercise.movementPatterns && exercise.movementPatterns.length > 0 && (
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-2">
                
                <h3 className="text-sm font-semibold text-neutral-900">Movement Patterns</h3>
              </div>
              <Tags items={exercise.movementPatterns} type="secondary" />
            </motion.div>
          )}
          
        </motion.div>
      </motion.div>
    </div>
  )
}