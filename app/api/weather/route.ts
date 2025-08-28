import { type NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.WEATHER_API_KEY
const BASE_URL = "https://api.weatherapi.com/v1"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const city = searchParams.get("city")

  try {
    let location = ""

    if (lat && lon) {
      location = `${lat},${lon}`
    } else if (city) {
      location = city
    } else {
      return NextResponse.json({ error: "Location parameters required" }, { status: 400 })
    }

    if (!API_KEY) {
      return NextResponse.json({ error: "Server misconfigured: WEATHER_API_KEY is missing" }, { status: 500 })
    }

    // WeatherAPI.com provides current weather and forecast in one call
    const weatherUrl = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=7&aqi=yes&alerts=yes`

    const response = await fetch(weatherUrl, { cache: "no-store" })

    if (!response.ok) {
      const text = await response.text()
      let message = "Weather data not found"
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
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
