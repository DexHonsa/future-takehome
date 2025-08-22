import { NextRequest, NextResponse } from "next/server"
import { getAllExercises } from "@/lib/exercises-cache"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const exercises = await getAllExercises()
    const exercise = exercises.find(e => e.slug === slug)
    
    if (!exercise) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 })
    }
    
    return NextResponse.json({
      id: exercise.id,
      name: exercise.name,
      slug: exercise.slug
    })
  } catch (error) {
    console.error("Failed to lookup exercise by slug:", error)
    return NextResponse.json({ error: "Failed to lookup exercise" }, { status: 500 })
  }
}