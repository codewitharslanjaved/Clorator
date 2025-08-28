"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, Sunrise, Droplets, Wind, Thermometer } from "lucide-react"
import { CustomWeatherIcon } from "./custom-weather-icons"
import { GlassCard } from "./glass-card"

interface EnhancedForecastProps {
  forecastData: Array<{
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
      daily_chance_of_rain: number
      daily_chance_of_snow: number
    }
    astro: {
      sunrise: string
      sunset: string
      moonrise: string
      moonset: string
      moon_phase: string
    }
    hour: Array<{
      time: string
      temp_c: number
      temp_f: number
      condition: {
        text: string
        code: number
      }
    }>
  }>
  tempUnit: "C" | "F"
}

export function EnhancedForecast({ forecastData, tempUnit }: EnhancedForecastProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null)

  const getTemp = (tempC: number, tempF: number) => {
    return tempUnit === "C" ? Math.round(tempC) : Math.round(tempF)
  }

  const getDayName = (dateString: string, index: number) => {
    if (index === 0) return "Today"
    if (index === 1) return "Tomorrow"
    return new Date(dateString).toLocaleDateString([], { weekday: "long" })
  }

  const getDateString = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], {
      month: "short",
      day: "numeric",
    })
  }

  const getMoonPhaseIcon = (phase: string) => {
    const phaseMap: { [key: string]: string } = {
      "New Moon": "🌑",
      "Waxing Crescent": "🌒",
      "First Quarter": "🌓",
      "Waxing Gibbous": "🌔",
      "Full Moon": "🌕",
      "Waning Gibbous": "🌖",
      "Last Quarter": "🌗",
      "Waning Crescent": "🌘",
    }
    return phaseMap[phase] || "🌙"
  }

  const getHourlyTempChart = (hourlyData: any[]) => {
    const temps = hourlyData.map((hour) => (tempUnit === "C" ? hour.temp_c : hour.temp_f))
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)
    const range = maxTemp - minTemp || 1

    return temps.map((temp, index) => ({
      temp,
      height: ((temp - minTemp) / range) * 40 + 10,
      time: new Date(hourlyData[index].time).getHours(),
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-light text-white mb-6 text-center">7-Day Detailed Forecast</h2>

      {forecastData.map((day, index) => (
        <motion.div
          key={day.date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1 + index * 0.05 }}
        >
          <GlassCard className="overflow-hidden">
            <div className="p-6 cursor-pointer" onClick={() => setExpandedDay(expandedDay === index ? null : index)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <CustomWeatherIcon
                    condition={day.day.condition.text}
                    code={day.day.condition.code}
                    size={48}
                    className="text-white/80"
                    animated={expandedDay === index}
                  />
                  <div>
                    <div className="text-white font-medium text-lg">{getDayName(day.date, index)}</div>
                    <div className="text-white/60 text-sm font-light">{getDateString(day.date)}</div>
                    <div className="text-white/70 text-sm">{day.day.condition.text}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-white text-xl font-light">
                        {getTemp(day.day.maxtemp_c, day.day.maxtemp_f)}°
                      </span>
                      <span className="text-white/60 text-lg">{getTemp(day.day.mintemp_c, day.day.mintemp_f)}°</span>
                    </div>
                    <div className="text-blue-300 text-sm">{day.day.daily_chance_of_rain}% rain</div>
                  </div>

                  <motion.div animate={{ rotate: expandedDay === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-white/60" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            <motion.div
              initial={false}
              animate={{
                height: expandedDay === index ? "auto" : 0,
                opacity: expandedDay === index ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-white/10">
                {/* Hourly Temperature Chart */}
                <div className="mb-6 mt-4">
                  <h4 className="text-white/80 text-sm font-light mb-3">Temperature Trend</h4>
                  <div className="relative h-16 bg-white/5 rounded-xl p-2">
                    <svg width="100%" height="100%" className="overflow-visible">
                      {getHourlyTempChart(day.hour.slice(0, 12)).map((point, i, arr) => (
                        <g key={i}>
                          {i < arr.length - 1 && (
                            <line
                              x1={`${(i / (arr.length - 1)) * 100}%`}
                              y1={`${100 - (point.height / 60) * 100}%`}
                              x2={`${((i + 1) / (arr.length - 1)) * 100}%`}
                              y2={`${100 - (arr[i + 1].height / 60) * 100}%`}
                              stroke="#60A5FA"
                              strokeWidth="2"
                            />
                          )}
                          <circle
                            cx={`${(i / (arr.length - 1)) * 100}%`}
                            cy={`${100 - (point.height / 60) * 100}%`}
                            r="3"
                            fill="#60A5FA"
                          />
                          <text
                            x={`${(i / (arr.length - 1)) * 100}%`}
                            y="95%"
                            textAnchor="middle"
                            className="text-xs fill-white/60"
                          >
                            {point.time}h
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Weather Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Droplets className="w-4 h-4 text-blue-300" />
                      <span className="text-white/60 text-sm">Humidity</span>
                    </div>
                    <div className="text-white font-medium">{day.day.avghumidity}%</div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Wind className="w-4 h-4 text-green-300" />
                      <span className="text-white/60 text-sm">Max Wind</span>
                    </div>
                    <div className="text-white font-medium">{Math.round(day.day.maxwind_kph)} km/h</div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Thermometer className="w-4 h-4 text-orange-300" />
                      <span className="text-white/60 text-sm">UV Index</span>
                    </div>
                    <div className="text-white font-medium">{day.day.uv}</div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-4 h-4 text-purple-300">❄️</div>
                      <span className="text-white/60 text-sm">Snow</span>
                    </div>
                    <div className="text-white font-medium">{day.day.daily_chance_of_snow}%</div>
                  </div>
                </div>

                {/* Sun & Moon Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4">
                    <h5 className="text-white/80 font-medium mb-3 flex items-center">
                      <Sunrise className="w-4 h-4 mr-2 text-yellow-300" />
                      Sun Times
                    </h5>
                    <div className="flex justify-between">
                      <div>
                        <div className="text-white/60 text-sm">Sunrise</div>
                        <div className="text-white font-medium">{day.astro.sunrise}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/60 text-sm">Sunset</div>
                        <div className="text-white font-medium">{day.astro.sunset}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4">
                    <h5 className="text-white/80 font-medium mb-3 flex items-center">
                      <span className="mr-2">{getMoonPhaseIcon(day.astro.moon_phase)}</span>
                      Moon Phase
                    </h5>
                    <div className="flex justify-between">
                      <div>
                        <div className="text-white/60 text-sm">Phase</div>
                        <div className="text-white font-medium text-sm">{day.astro.moon_phase}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/60 text-sm">Moonrise</div>
                        <div className="text-white font-medium">{day.astro.moonrise}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </GlassCard>
        </motion.div>
      ))}
    </motion.div>
  )
}
