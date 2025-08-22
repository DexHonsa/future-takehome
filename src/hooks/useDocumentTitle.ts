import { useEffect } from "react"

/**
 * Updates browser tab title
 * Automatically restores original title on unmount
 */

export function useDocumentTitle(title: string | null) {
  useEffect(() => {
    if (typeof window === "undefined") return
    
    const originalTitle = document.title
    
    if (title) {
      document.title = `${title} | Exercise Explorer`
    } else {
      document.title = "Browse Exercises | Exercise Explorer"
    }
    
    return () => {
      document.title = originalTitle
    }
  }, [title])
}