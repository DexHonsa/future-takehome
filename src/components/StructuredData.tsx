import type { Exercise } from "@/features/exercises/types"

/**
 * SEO structured data component
 * Generates JSON-LD schema for search engines
 */

type StructuredDataProps = {
  exercise?: Exercise
}

export function StructuredData({ exercise }: StructuredDataProps) {
  if (!exercise) {
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Exercise Explorer",
      description: "Comprehensive fitness exercise database with detailed instructions and videos",
      url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/exercises?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    )
  }

  const exerciseSchema = {
    "@context": "https://schema.org",
    "@type": "ExerciseAction",
    name: exercise.name,
    description: exercise.description,
    exerciseType: exercise.muscleGroups.join(", "),
    exerciseRelatedDiet: "General fitness",
    ...(exercise.videoUrl && {
      video: {
        "@type": "VideoObject",
        name: `${exercise.name} Tutorial`,
        description: `How to perform ${exercise.name}`,
        contentUrl: exercise.videoUrl,
        embedUrl: exercise.videoUrl,
        uploadDate: new Date().toISOString(),
      }
    }),
    ...(exercise.equipment.length > 0 && {
      requiredEquipment: exercise.equipment.map(item => ({
        "@type": "SportsActivityLocation",
        name: item
      }))
    }),
    potentialAction: {
      "@type": "HealthAction",
      name: "Perform Exercise",
      description: `Learn and perform ${exercise.name}`
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Exercises",
        item: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/exercises`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: exercise.name,
        item: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/exercises?exercise=${exercise.slug}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(exerciseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}