"use client"

import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import { CustomWeatherIcon } from "./custom-weather-icons"
import { Droplets, Wind, Thermometer, Eye } from "lucide-react"

interface HourlyForecastProps {
  hourlyData: Array<{
    time: string
    temp_c: number
    temp_f: number
    condition: {
      text: string
      icon: string
      code: number
    }
    wind_kph: number
    humidity: number
    chance_of_rain: number
    feelslike_c: number
    feelslike_f: number
    pressure_mb: number
    uv: number
    vis_km: number
  }>
  tempUnit: "C" | "F"
}

export function HourlyForecast({ hourlyData, tempUnit }: HourlyForecastProps) {
  const [selectedHour, setSelectedHour] = useState(0)

  const next24Hours = useMemo(() => {
    const now = new Date()
    const currentHour = now.getHours()
    return hourlyData.slice(currentHour, currentHour + 24)
  }, [hourlyData])

  const getTemp = (tempC: number, tempF: number) => {
    return tempUnit === "C" ? Math.round(tempC) : Math.round(tempF)
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()
    const hour = date.getHours()

    if (isToday && Math.abs(hour - now.getHours()) < 1) {
      return "Now"
    }

    return date.toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    })
  }

  const selectedHourData = next24Hours[selectedHour]

  if (!next24Hours.length) {
    return (
      <div className="text-center py-8">
        <p className="text-white/60 font-light">No hourly data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Hourly List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {next24Hours.map((hour, index) => (
          <motion.div
            key={hour.time}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
              selectedHour === index
                ? "bg-white/20 border border-white/30"
                : "bg-white/5 hover:bg-white/10 border border-white/10"
            }`}
            onClick={() => setSelectedHour(index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CustomWeatherIcon
                  condition={hour.condition.text}
                  code={hour.condition.code}
                  size={32}
                  className="text-white/80"
                  animated={selectedHour === index}
                />
                <div>
                  <div className="text-white font-medium">{formatTime(hour.time)}</div>
                  <div className="text-white/60 text-sm font-light">{hour.condition.text}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white text-lg font-light">{getTemp(hour.temp_c, hour.temp_f)}°</div>
                <div className="text-blue-300 text-sm">{hour.chance_of_rain}%</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Hour Details */}
      {selectedHourData && (
        <motion.div
          key={selectedHour}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 border-t border-white/10 bg-white/5 rounded-2xl"
        >
          <h3 className="text-white font-medium mb-4 flex items-center">
            <CustomWeatherIcon
              condition={selectedHourData.condition.text}
              code={selectedHourData.condition.code}
              size={24}
              className="text-white/80 mr-2"
              animated={true}
            />
            {formatTime(selectedHourData.time)} Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-orange-300" />
              <div>
                <div className="text-white/60 text-xs">Feels like</div>
                <div className="text-white text-sm">
                  {getTemp(selectedHourData.feelslike_c, selectedHourData.feelslike_f)}°
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-blue-300" />
              <div>
                <div className="text-white/60 text-xs">Humidity</div>
                <div className="text-white text-sm">{selectedHourData.humidity}%</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 text-green-300" />
              <div>
                <div className="text-white/60 text-xs">Wind</div>
                <div className="text-white text-sm">{Math.round(selectedHourData.wind_kph)} km/h</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-purple-300" />
              <div>
                <div className="text-white/60 text-xs">Visibility</div>
                <div className="text-white text-sm">{Math.round(selectedHourData.vis_km)} km</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
