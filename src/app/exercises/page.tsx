import { ExerciseContent } from "@/features/exercises/components/ExerciseContent"
import type { Metadata } from "next"
import axios from "axios"

type PageProps = {
  searchParams: Promise<{ exercise?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const defaultMetadata: Metadata = {
    title: "Browse Exercises",
    description: "Browse our comprehensive database of fitness exercises. Filter by muscle groups, equipment, and more to find the perfect exercises for your workout routine.",
    openGraph: {
      title: "Browse Exercises - Exercise Explorer",
      description: "Browse hundreds of exercises with detailed instructions and videos",
      type: "website",
      url: "/exercises",
    },
  }
  
  if (params.exercise) {
    try {
      const baseUrl = process.env.BASE_URL || "http://localhost:3000"
      const slugResponse = await axios.get(`${baseUrl}/api/exercises/slug/${params.exercise}`)
      const exerciseResponse = await axios.get(`${baseUrl}/api/exercises/${slugResponse.data.id}`)
      const exercise = exerciseResponse.data
      
      const muscleGroups = exercise.muscleGroups.join(", ")
      const equipment = exercise.equipment.length > 0 ? exercise.equipment.join(", ") : "No equipment needed"
      
      return {
        title: `${exercise.name} Exercise Guide`,
        description: `Learn how to perform ${exercise.name}. ${exercise.description} Targets: ${muscleGroups}. Equipment: ${equipment}.`,
        openGraph: {
          title: `${exercise.name} - Exercise Explorer`,
          description: exercise.description,
          type: "article",
          url: `/exercises?exercise=${exercise.slug}`,
        },
        twitter: {
          card: "summary_large_image",
          title: `${exercise.name} - Exercise Explorer`,
          description: exercise.description,
        },
      }
    } catch {
      return defaultMetadata
    }
  }
  
  return defaultMetadata
}

export default async function ExercisesPage({ searchParams }: PageProps) {
  const params = await searchParams
  return <ExerciseContent initialSlug={params.exercise} />
}