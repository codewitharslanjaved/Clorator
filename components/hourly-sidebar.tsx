"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, Droplets, Wind, Thermometer } from "lucide-react"
import { CustomWeatherIcon } from "./custom-weather-icons"
import { GlassCard } from "./glass-card"
import { Button } from "@/components/ui/button"

interface HourlySidebarProps {
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
  }>
  tempUnit: "C" | "F"
  isOpen: boolean
  onToggle: () => void
}

export function HourlySidebar({ hourlyData, tempUnit, isOpen, onToggle }: HourlySidebarProps) {
  const [selectedHour, setSelectedHour] = useState(0)

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
      minute: hour === 0 ? "2-digit" : undefined,
    })
  }

  const next24Hours = hourlyData.slice(0, 24)
  const selectedHourData = next24Hours[selectedHour]

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          onClick={onToggle}
          className="bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm transition-all duration-300 rounded-full p-3"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </Button>
      </motion.div>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
              onClick={onToggle}
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-96 z-40 overflow-hidden"
            >
              <GlassCard className="h-full rounded-none rounded-r-3xl" hover={false}>
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-light text-white flex items-center">
                        <Clock className="w-6 h-6 mr-3 text-blue-300" />
                        24-Hour Forecast
                      </h2>
                      <Button
                        onClick={onToggle}
                        variant="ghost"
                        size="sm"
                        className="text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-white/60 text-sm font-light">Detailed hourly weather information</p>
                  </div>

                  {/* Hourly List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
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
                      className="p-6 border-t border-white/10 bg-white/5"
                    >
                      <h3 className="text-white font-medium mb-4">{formatTime(selectedHourData.time)} Details</h3>
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
                          <div className="w-4 h-4 rounded-full bg-yellow-300" />
                          <div>
                            <div className="text-white/60 text-xs">UV Index</div>
                            <div className="text-white text-sm">{selectedHourData.uv}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
