"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2 } from "lucide-react"
import { motion } from "framer-motion"

/**
 * Button to play audio instructions for an exercise
 * Shows animated sound waves when playing
 */

type AudioButtonProps = {
  audioUrl: string
  exerciseId: string
}

export function AudioButton({ audioUrl, exerciseId }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentExerciseId = useRef(exerciseId)

  useEffect(() => {
    if (currentExerciseId.current !== exerciseId) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      setIsPlaying(false)
      currentExerciseId.current = exerciseId
    }
  }, [exerciseId])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl)
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false)
      })
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <motion.button
      onClick={toggleAudio}
      className={`p-2 rounded-lg transition-colors ${
        isPlaying 
          ? "bg-primary-100 text-primary-600 hover:bg-primary-200" 
          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isPlaying ? "Pause audio" : "Play audio"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </motion.button>
  )
}