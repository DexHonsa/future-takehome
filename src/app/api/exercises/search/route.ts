import { NextRequest, NextResponse } from "next/server"
import { getAllExercises } from "@/lib/exercises-cache"
import type { SearchResult } from "@/features/exercises/types"

const CONTEXT_WINDOW_SIZE = 30

type MatchInfo = {
  field: string
  matchedText: string
  context?: string
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    
    if (!query) {
      return NextResponse.json({ results: [] })
    }
    
    const exercises = await getAllExercises()
    const lowerQuery = query.toLowerCase()
    const results: SearchResult[] = []
    
    exercises.forEach(exercise => {
      let matchInfo: MatchInfo | undefined
      
      if (exercise.name.toLowerCase().includes(lowerQuery)) {
        results.push({
          id: exercise.id,
          name: exercise.name,
          side: exercise.side,
          slug: exercise.slug
        })
        return
      }
      
      if (exercise.description.toLowerCase().includes(lowerQuery)) {
        const index = exercise.description.toLowerCase().indexOf(lowerQuery)
        const start = Math.max(0, index - CONTEXT_WINDOW_SIZE)
        const end = Math.min(exercise.description.length, index + query.length + CONTEXT_WINDOW_SIZE)
        const context = exercise.description.slice(start, end)
        matchInfo = {
          field: 'description',
          matchedText: query,
          context: (start > 0 ? '...' : '') + context + (end < exercise.description.length ? '...' : '')
        }
        results.push({
          id: exercise.id,
          name: exercise.name,
          side: exercise.side,
          slug: exercise.slug,
          matchContext: matchInfo?.context
        })
        return
      }
      
      const matchedEquipment = exercise.equipment.find(eq => 
        eq.toLowerCase().includes(lowerQuery)
      )
      if (matchedEquipment) {
        matchInfo = {
          field: 'equipment',
          matchedText: query,
          context: exercise.equipment.join(', ')
        }
        results.push({
          id: exercise.id,
          name: exercise.name,
          side: exercise.side,
          slug: exercise.slug,
          matchContext: matchInfo?.context
        })
        return
      }
      
      const matchedPattern = exercise.movementPatterns.find(pattern => 
        pattern.toLowerCase().includes(lowerQuery)
      )
      if (matchedPattern) {
        matchInfo = {
          field: 'movementPatterns',
          matchedText: query,
          context: exercise.movementPatterns.join(', ')
        }
        results.push({
          id: exercise.id,
          name: exercise.name,
          side: exercise.side,
          slug: exercise.slug,
          matchContext: matchInfo?.context
        })
      }
    })
    
    return NextResponse.json({ results })
  } catch (error) {
    console.error("Failed to search exercises:", error)
    return NextResponse.json({ error: "Failed to search" }, { status: 500 })
  }
}