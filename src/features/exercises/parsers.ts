import { generateSlug, cleanText } from "./utils"

/**
 * Data parsing functions for exercises
 * Converts raw API data into clean app format
 */

export function parseCSV(value: string | null | undefined): string[] {
  if (!value) return []
  return value.split(",").map(item => item.trim()).filter(Boolean)
}

export function normalizeExercise(raw: Record<string, unknown>) {
  const video = raw.video as Record<string, unknown> | null
  const audio = raw.audio as Record<string, unknown> | null
  const name = cleanText(String(raw.name || ""))
  const side = raw.side ? cleanText(String(raw.side)) : undefined
  
  const baseSlug = generateSlug(name)
  const slug = side ? `${baseSlug}-${generateSlug(side)}` : baseSlug
  
  return {
    id: String(raw.id || ""),
    slug,
    name,
    description: cleanText(String(raw.description || "")),
    muscleGroups: parseCSV(raw.muscle_groups as string),
    movementPatterns: parseCSV(raw.movement_patterns as string),
    equipment: parseCSV(raw.equipment_required as string),
    side,
    videoUrl: video?.url ? String(video.url) : undefined,
    videoIsFlipped: video?.is_flipped === true,
    audioUrl: audio?.url ? String(audio.url) : undefined,
  }
}