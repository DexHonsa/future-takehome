"use client"

import { BicepsFlexed, VideoOff, BookOpenText } from "lucide-react"
import { motion } from "framer-motion"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useDocumentTitle } from "@/hooks/useDocumentTitle"
import { selectSelectedId } from "../../store/selectors"
import { VideoPlayer } from "../details/VideoPlayer"
import { StructuredData } from "@/components/StructuredData"
import { RightPaneSkeleton } from "../details/RightPaneSkeleton"
import { ExerciseDetailsPanel } from "../details/ExerciseDetailsPanel"
import { useExerciseDetails } from "../../hooks"

/**
 * Main content area showing exercise details
 * Displays video, description, and exercise info when an exercise is selected
 */

export function RightPane() {
  const selectedId = useAppSelector(selectSelectedId)
  const exerciseDetails = useExerciseDetails(selectedId)
  const exercise = exerciseDetails.data
  
  useDocumentTitle(exercise ? `${exercise.name} Exercise Guide` : null)

  if (!selectedId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        <StructuredData />
        <motion.div 
          className="text-center p-8 max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            <BicepsFlexed className="w-20 h-20 mx-auto mb-6 text-neutral-300" strokeWidth={1.0} />
          </motion.div>
          <h2 className="text-2xl font-semibold text-neutral-700 mb-3">Ready to Lift? </h2>
          <p className="text-neutral-500 mb-2">
            <span className="md:inline hidden">Select an exercise from the sidebar to view detailed instructions, videos, and more.</span>
            <span className="md:hidden inline">Tap the menu icon to browse exercises and view detailed instructions.</span>
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <BookOpenText className="w-4 h-4" />
              <span>Let&apos;s Learn</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              <span>Equipment</span>
            </div> */}
          </div>
        </motion.div>
      </div>
    )
  }

  if (exerciseDetails.loading) {
    return <RightPaneSkeleton />
  }
  
  if (!exercise) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        <p className="text-neutral-500">Failed to load exercise details</p>
      </div>
    )
  }
  
  return (
    <div className="flex-1 flex md:flex-row flex-col  md:overflow-hidden overflow-x-hidden overflow-y-auto ">
      <StructuredData exercise={exercise} />
      {/* Video Section */}
      <div className="flex-1 relative md:h-full basis-[60vh] md:basis-auto md:min-h-[100vh] min-h-[60vh] flex-shrink-0">
        {exercise.videoUrl ? (
          <VideoPlayer url={exercise.videoUrl} isFlipped={exercise.videoIsFlipped} />
        ) : (
          <div className="w-full md:h-full h-[60vh]  bg-neutral-50 flex flex-col items-center justify-center text-neutral-500 p-8">
            <VideoOff className="w-16 h-16 mb-4 text-neutral-400" />
            <h3 className="text-lg font-semibold mb-2">Video unavailable</h3>
            <p className="text-sm text-center text-neutral-400">No video available for this exercise.</p>
          </div>
        )}
      </div>
      
      {/* Static Details Panel */}
      <ExerciseDetailsPanel exercise={exercise} />
    </div>
  )
}