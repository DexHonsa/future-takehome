/**
 * Loading skeleton for exercise list items
 * Shows placeholder rows while exercises are loading
 */

export function ExerciseListSkeleton() {
  return (
    <div className="animate-pulse bg-neutral-50 border-t border-neutral-100">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="pl-10 pr-4 py-3 border-b border-neutral-100">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-neutral-200 rounded" style={{ width: `${100 + Math.random() * 80}px` }} />
            <div className="w-4 h-4 bg-neutral-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}