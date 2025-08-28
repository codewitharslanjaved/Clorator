"use client"

import { useState, useEffect } from "react"

interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    localtime: string
  }
  current: {
    temp_c: number
    temp_f: number
    feelslike_c: number
    feelslike_f: number
    condition: {
      text: string
      icon: string
      code: number
    }
    wind_kph: number
    wind_mph: number
    humidity: number
    vis_km: number
    vis_miles: number
    uv: number
    pressure_mb: number
    pressure_in: number
  }
  forecast: {
    forecastday: Array<{
      date: string
      day: {
        maxtemp_c: number
        maxtemp_f: number
        mintemp_c: number
        mintemp_f: number
        condition: {
          text: string
          icon: string
          code: number
        }
        avghumidity: number
        maxwind_kph: number
        uv: number
      }
      astro: {
        sunrise: string
        sunset: string
      }
      hour: Array<{
        time: string
        temp_c: number
        temp_f: number
        condition: {
          text: string
          icon: string
        }
        wind_kph: number
        humidity: number
        chance_of_rain: number
      }>
    }>
  }
}

interface LocationData {
  name: string
  region: string
  country: string
  lat: number
  lon: number
}

export function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = async (lat?: number, lon?: number, city?: string) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (lat && lon) {
        params.append("lat", lat.toString())
        params.append("lon", lon.toString())
      } else if (city) {
        params.append("city", city)
      }

      const response = await fetch(`/api/weather?${params}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch weather data")
      }

      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const searchLocations = async (query: string): Promise<LocationData[]> => {
    try {
      const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error("Failed to search locations")
      }
      return await response.json()
    } catch (err) {
      console.error("Location search error:", err)
      return []
    }
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude)
      },
      (error) => {
        console.error("Geolocation error:", error)
        // Fallback to default location (London)
        fetchWeather(undefined, undefined, "London")
      },
    )
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return {
    weatherData,
    loading,
    error,
    fetchWeather,
    searchLocations,
    getCurrentLocation,
  }
}
