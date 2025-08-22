import { NextRequest, NextResponse } from "next/server"
import { getAllExercises } from "@/lib/exercises-cache"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const exercises = await getAllExercises()
    
    const exercise = exercises.find(e => e.id === id)
    
    if (!exercise) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 })
    }
    
    return NextResponse.json(exercise)
  } catch (error) {
    console.error("Failed to fetch exercise:", error)
    return NextResponse.json({ error: "Failed to fetch exercise" }, { status: 500 })
  }
}