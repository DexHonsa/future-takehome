"use client"

/**
 * Displays a list of tags (muscles or equipment)
 * Colored pills based on type (primary for muscles, secondary for equipment)
 */

type TagsProps = {
  items: string[]
  type?: "primary" | "secondary"
}

export function Tags({ items, type = "primary" }: TagsProps) {
  if (!items.length) return null

  const tagStyles = {
    primary: "bg-primary-100 text-primary-700 border-primary-200",
    secondary: "bg-secondary-100 text-secondary-700 border-secondary-200",
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border ${tagStyles[type]}`}
        >
          {item}
        </span>
      ))}
    </div>
  )
}