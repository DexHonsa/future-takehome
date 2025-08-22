/**
 * Utility functions for exercise features
 * Helper functions for data manipulation and UI logic
 */

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function cleanText(text: string): string {
  if (!text) return ""
  
  return text
    .replace(/\.{2,}/g, ".")
    .replace(/,{2,}/g, ",")
    .replace(/\.\s*,/g, ".")
    .replace(/,\s*\./g, ".")
    .replace(/,\./g, ".")
    .replace(/\s+/g, " ")
    .trim()
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}