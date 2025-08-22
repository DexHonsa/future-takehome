import { NextResponse } from "next/server"
import axios from "axios"

const API_URL = "https://candidate.staging.future.co/sandbox/api/exercises"

export async function GET() {
  try {
    console.log("Fetching exercises from API")
    const response = await axios.get(API_URL)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Failed to fetch exercises:", error)
    return NextResponse.json([], { status: 500 })
  }
}