import { NextRequest, NextResponse } from "next/server"
import { getAllExercises } from "@/lib/exercises-cache"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || 'muscle'
    
    const exercises = await getAllExercises()
    
    if (type === 'muscle') {
      const groups = new Map<string, number>()
      
      exercises.forEach(exercise => {
        if (exercise.muscleGroups.length === 0) {
          groups.set("Other", (groups.get("Other") || 0) + 1)
        } else {
          exercise.muscleGroups.forEach(muscle => {
            groups.set(muscle, (groups.get(muscle) || 0) + 1)
          })
        }
      })
      
      const sortedGroups = Array.from(groups.entries())
        .sort(([a], [b]) => {
          if (a === "Other") return 1
          if (b === "Other") return -1
          return a.localeCompare(b)
        })
        .map(([name, count]) => ({ name, count }))
      
      return NextResponse.json({ groups: sortedGroups })
    } else {
      const groups = new Map<string, number>()
      
      exercises.forEach(exercise => {
        if (exercise.equipment.length === 0) {
          groups.set("No Equipment", (groups.get("No Equipment") || 0) + 1)
        } else {
          exercise.equipment.forEach(equip => {
            groups.set(equip, (groups.get(equip) || 0) + 1)
          })
        }
      })
      
      const sortedGroups = Array.from(groups.entries())
        .sort(([a], [b]) => {
          if (a === "No Equipment") return -1
          if (b === "No Equipment") return 1
          return a.localeCompare(b)
        })
        .map(([name, count]) => ({ name, count }))
      
      return NextResponse.json({ groups: sortedGroups })
    }
  } catch (error) {
    console.error("Failed to fetch groups:", error)
    return NextResponse.json({ error: "Failed to fetch groups" }, { status: 500 })
  }
}