"use client"

import { useRef, useEffect, useState } from "react"
import { BicepsFlexed, Dumbbell } from "lucide-react"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import { setGroupBy } from "../../store/slice"

/**
 * Toggle switch to group exercises by muscle or equipment
 * Animated background slides between the two options
 */

export function GroupToggle() {
  const dispatch = useAppDispatch()
  const groupBy = useAppSelector(state => state.exercises.groupBy)
  const muscleRef = useRef<HTMLButtonElement>(null)
  const equipmentRef = useRef<HTMLButtonElement>(null)
  const [bgStyle, setBgStyle] = useState({ width: 0, transform: 'translateX(0)' })
  
  useEffect(() => {
    const updateBgStyle = () => {
      if (groupBy === 'muscle' && muscleRef.current) {
        setBgStyle({
          width: muscleRef.current.offsetWidth,
          transform: 'translateX(0)'
        })
      } else if (groupBy === 'equipment' && equipmentRef.current && muscleRef.current) {
        setBgStyle({
          width: equipmentRef.current.offsetWidth,
          transform: `translateX(${muscleRef.current.offsetWidth + 8}px)`
        })
      }
    }
    
    updateBgStyle()
    window.addEventListener('resize', updateBgStyle)
    return () => window.removeEventListener('resize', updateBgStyle)
  }, [groupBy])
  
  return (
    <div className="flex items-center justify-center mt-3">
      <div className="flex gap-2 p-1 bg-neutral-100 rounded-full relative">
        <div 
          className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm transition-all duration-200 ease-out"
          style={{
            width: `${bgStyle.width}px`,
            transform: bgStyle.transform
          }}
        />
        
        <button
          ref={muscleRef}
          onClick={() => dispatch(setGroupBy('muscle'))}
          className={`
            flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium
            transition-colors duration-200 relative z-10 cursor-pointer
            ${groupBy === 'muscle' 
              ? 'text-primary-500' 
              : 'text-neutral-500 hover:text-neutral-700'
            }
          `}
        >
          <BicepsFlexed className="w-4 h-4" />
          <span>Muscle</span>
        </button>
        
        <button
          ref={equipmentRef}
          onClick={() => dispatch(setGroupBy('equipment'))}
          className={`
            flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium
            transition-colors duration-200 relative z-10 cursor-pointer
            ${groupBy === 'equipment' 
              ? 'text-secondary-600' 
              : 'text-neutral-500 hover:text-neutral-700'
            }
          `}
        >
          <Dumbbell className="w-4 h-4" />
          <span>Equipment</span>
        </button>
      </div>
    </div>
  )
}