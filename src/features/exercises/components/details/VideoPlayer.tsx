"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { VideoOff } from "lucide-react"

/**
 * Video player for exercise demonstrations
 * Handles video loading, error states, and playback
 */

type VideoPlayerProps = {
  url: string
  isFlipped?: boolean
}

export function VideoPlayer({ url, isFlipped = false }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const prevUrl = useRef<string>("")
  const isFirstLoad = useRef(true)

  useEffect(() => {
    if (prevUrl.current !== url) {
      setIsLoading(true)
      setHasError(false)
      prevUrl.current = url
    }
  }, [url])

  return (
    <div className="w-full scale-x-101 z-10 h-[60vh] md:h-[100vh] bg-neutral-50 overflow-hidden relative">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
         <svg className="h-12 w-12 text-neutral-200 animate-spin" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
           <defs>
             <linearGradient id="RadialGradient8932">
               <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
               <stop offset="100%" stopColor="currentColor" stopOpacity="0.25"/>
             </linearGradient>
           </defs>
           <circle cx="10" cy="10" r="8" strokeWidth="2" stroke="url(#RadialGradient8932)" fill="none"/>
         </svg>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 p-8">
          <VideoOff className="w-16 h-16 mb-4 text-neutral-400" />
          <h3 className="text-lg font-semibold mb-2">Video unavailable</h3>
          <p className="text-sm text-center text-neutral-400">This video could not be loaded. Please try again later.</p>
        </div>
      )}
      <motion.video
        key={url}
        src={url}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => {
          setIsLoading(false)
          setHasError(false)
          if (isFirstLoad.current) {
            isFirstLoad.current = false
          }
        }}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
        className="w-full h-full object-cover"
        style={{ 
          transform: isFlipped ? "scaleX(-1)" : "none",
          display: hasError ? "none" : "block"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading || hasError ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        Your browser does not support the video tag.
      </motion.video>
    </div>
  )
}