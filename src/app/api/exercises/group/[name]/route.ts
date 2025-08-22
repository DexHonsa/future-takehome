import { NextRequest, NextResponse } from "next/server"
import { getAllExercises } from "@/lib/exercises-cache"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name: groupName } = await params
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || 'muscle'
    
    const decodedGroupName = decodeURIComponent(groupName)
    const exercises = await getAllExercises()
    
    let filteredExercises = []
    
    if (type === 'muscle') {
      if (decodedGroupName === 'Other') {
        filteredExercises = exercises.filter(e => e.muscleGroups.length === 0)
      } else {
        filteredExercises = exercises.filter(e => 
          e.muscleGroups.includes(decodedGroupName)
        )
      }
    } else {
      if (decodedGroupName === 'No Equipment') {
        filteredExercises = exercises.filter(e => e.equipment.length === 0)
      } else {
        filteredExercises = exercises.filter(e => 
          e.equipment.includes(decodedGroupName)
        )
      }
    }
    
    const minimalExercises = filteredExercises
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(exercise => ({
        id: exercise.id,
        name: exercise.name,
        side: exercise.side,
        slug: exercise.slug
      }))
    
    return NextResponse.json({ exercises: minimalExercises })
  } catch (error) {
    console.error("Failed to fetch group exercises:", error)
    return NextResponse.json({ error: "Failed to fetch exercises" }, { status: 500 })
  }
}