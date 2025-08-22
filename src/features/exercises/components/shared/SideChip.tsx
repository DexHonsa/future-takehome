/**
 * Small chip indicator for left/right side exercises
 * Shows L or R in a colored badge
 */

type SideChipProps = {
  side: string
  className?: string
}

export function SideChip({ side, className }: SideChipProps) {
  const isLeft = side.toLowerCase().includes("left")
  const isRight = side.toLowerCase().includes("right")
  
  if (!isLeft && !isRight) return null
  
  const label = isLeft ? "L" : "R"
  const bgColor = isLeft ? "bg-red-50 border border-red-200" : "bg-secondary-50 border border-secondary-200"
  const textColor = isLeft ? "text-primary-500" : "text-secondary-500"
  
  return (
    <span 
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${bgColor} ${textColor} ${className}`}
      title={side.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}
    >
      {label}
    </span>
  )
}