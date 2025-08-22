"use client"

import { useState, useEffect } from "react"
import { LeftPane } from "@/features/exercises/components/layout/LeftPane"
import { MobileHeader } from "@/features/exercises/components/layout/MobileHeader"
import { useAppSelector } from "@/hooks/useAppSelector"
import { selectSelectedId } from "@/features/exercises/store/selectors"

export default function ExercisesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const selectedId = useAppSelector(selectSelectedId)
  
  useEffect(() => {
    if (selectedId) {
      setIsSidebarOpen(false)
    }
  }, [selectedId])
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  
  return (
    <>
      <MobileHeader isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      
      <div className="flex h-screen bg-neutral-50 md:pt-0 pt-14 overflow-hidden">
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-30 top-14"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <LeftPane isOpen={isSidebarOpen} />
        {children}
      </div>
    </>
  )
}