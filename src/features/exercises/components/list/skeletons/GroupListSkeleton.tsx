/**
 * Loading skeleton for grouped exercise list
 * Shows placeholder group headers while loading
 */

export function GroupListSkeleton() {
  return (
    <div className="animate-pulse">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="border-b border-neutral-100">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-neutral-200 rounded" />
              <div className="h-4 bg-neutral-200 rounded" style={{ width: `${80 + Math.random() * 60}px` }} />
            </div>
            <div className="w-6 h-6 bg-neutral-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}