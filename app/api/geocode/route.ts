import { type NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.WEATHER_API_KEY
const BASE_URL = "https://api.weatherapi.com/v1"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Search query required" }, { status: 400 })
  }

  try {
    if (!API_KEY) {
      return NextResponse.json({ error: "Server misconfigured: WEATHER_API_KEY is missing" }, { status: 500 })
    }

    const response = await fetch(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`,
      { cache: "no-store" },
    )

    if (!response.ok) {
      // Attempt to forward error details from WeatherAPI when available
      const text = await response.text()
      let message = "Location search failed"
      try {
        const parsed = JSON.parse(text)
        message = parsed.error?.message || message
      } catch {
        // non-JSON body
      }
      return NextResponse.json({ error: message }, { status: response.status || 502 })
    }

    const raw = await response.text()

    let data
    try {
      data = JSON.parse(raw)
    } catch {
      console.error("WeatherAPI non-JSON response:", raw)
      return NextResponse.json({ error: "Invalid response from WeatherAPI" }, { status: 502 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Geocoding API error:", error)
    return NextResponse.json({ error: "Failed to search locations" }, { status: 500 })
  }
}
