"use client"

import { Menu, X, Dumbbell } from "lucide-react"
import { motion } from "framer-motion"

/**
 * Mobile-only header with menu toggle button
 * Shows/hides the exercise list sidebar on small screens
 */

type MobileHeaderProps = {
  isOpen: boolean
  onToggle: () => void
}

export function MobileHeader({ isOpen, onToggle }: MobileHeaderProps) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-neutral-200 z-50">
      <div className="flex items-center justify-between h-full px-4">
        <button
          onClick={onToggle}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-neutral-700" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-700" />
            )}
          </motion.div>
        </button>
        
        <h1 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
          <Dumbbell strokeWidth={1.5} className="w-6 h-6 text-neutral-900" />
          
        </h1>
        
        <div className="w-10" />
      </div>
    </div>
  )
}