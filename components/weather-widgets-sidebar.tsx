"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Radar, Lightbulb, Leaf, Wind, Sun, Calendar, Clock, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "./glass-card"
import { WeatherRadar } from "./weather-radar"
import { WeatherInsights } from "./weather-insights"
import { AirQuality } from "./air-quality"
import { WindCompass } from "./wind-compass"
import { SunDetails } from "./sun-details"
import { EnhancedForecast } from "./enhanced-forecast"
import { HourlyForecast } from "./hourly-forecast"

interface WeatherWidgetsSidebarProps {
  weatherData: any
  tempUnit: "C" | "F"
  isOpen: boolean
  onToggle: () => void
}

type WidgetType = "hourly" | "radar" | "insights" | "air" | "wind" | "sun" | "forecast" | "overview"

export function WeatherWidgetsSidebar({ weatherData, tempUnit, isOpen, onToggle }: WeatherWidgetsSidebarProps) {
  const [activeWidget, setActiveWidget] = useState<WidgetType>("overview")

  const widgets = [
    {
      id: "overview" as WidgetType,
      name: "Overview",
      icon: Grid3X3,
      color: "text-purple-300",
      description: "Quick access to all widgets",
    },
    {
      id: "hourly" as WidgetType,
      name: "24-Hour",
      icon: Clock,
      color: "text-blue-300",
      description: "Hourly weather forecast",
    },
    {
      id: "radar" as WidgetType,
      name: "Radar",
      icon: Radar,
      color: "text-green-300",
      description: "Weather radar & maps",
    },
    {
      id: "insights" as WidgetType,
      name: "Insights",
      icon: Lightbulb,
      color: "text-yellow-300",
      description: "Weather recommendations",
    },
    {
      id: "air" as WidgetType,
      name: "Air Quality",
      icon: Leaf,
      color: "text-emerald-300",
      description: "Air quality index",
    },
    {
      id: "wind" as WidgetType,
      name: "Wind",
      icon: Wind,
      color: "text-cyan-300",
      description: "Wind speed & direction",
    },
    {
      id: "sun" as WidgetType,
      name: "Sun & Moon",
      icon: Sun,
      color: "text-orange-300",
      description: "Sunrise, sunset & moon phases",
    },
    {
      id: "forecast" as WidgetType,
      name: "7-Day",
      icon: Calendar,
      color: "text-indigo-300",
      description: "Extended forecast",
    },
  ]

  const isNight = () => {
    if (!weatherData) return false
    const currentTime = new Date(weatherData.location.localtime)
    const currentHour = currentTime.getHours()
    return currentHour < 6 || currentHour > 18
  }

  const renderWidgetContent = () => {
    if (!weatherData) return null

    switch (activeWidget) {
      case "overview":
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-light text-white mb-2">Weather Widgets</h3>
              <p className="text-white/60 text-sm font-light">
                Choose a widget to explore detailed weather information
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {widgets.slice(1).map((widget) => (
                <motion.button
                  key={widget.id}
                  onClick={() => setActiveWidget(widget.id)}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all duration-300 text-left"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <widget.icon className={`w-6 h-6 ${widget.color} mb-2`} />
                  <div className="text-white font-medium text-sm mb-1">{widget.name}</div>
                  <div className="text-white/60 text-xs font-light">{widget.description}</div>
                </motion.button>
              ))}
            </div>
          </div>
        )

      case "hourly":
        return (
          <div className="space-y-4">
            <HourlyForecast hourlyData={weatherData.forecast.forecastday[0]?.hour || []} tempUnit={tempUnit} />
          </div>
        )

      case "radar":
        return (
          <div className="space-y-4">
            <WeatherRadar location={weatherData.location} />
          </div>
        )

      case "insights":
        return (
          <div className="space-y-4">
            <WeatherInsights
              temperature={weatherData.current.temp_c}
              humidity={weatherData.current.humidity}
              uvIndex={weatherData.current.uv}
              windSpeed={weatherData.current.wind_kph}
              chanceOfRain={weatherData.forecast.forecastday[0]?.day?.avghumidity || 0}
              condition={weatherData.current.condition.text}
            />
          </div>
        )

      case "air":
        return (
          <div className="space-y-4">
            <AirQuality />
          </div>
        )

      case "wind":
        return (
          <div className="space-y-4">
            <WindCompass windSpeed={weatherData.current.wind_kph} windDirection={180} windDegree={180} />
          </div>
        )

      case "sun":
        return (
          <div className="space-y-4">
            {weatherData.forecast.forecastday[0] && (
              <SunDetails
                sunrise={weatherData.forecast.forecastday[0].astro.sunrise}
                sunset={weatherData.forecast.forecastday[0].astro.sunset}
                isNight={isNight()}
              />
            )}
          </div>
        )

      case "forecast":
        return (
          <div className="space-y-4">
            <EnhancedForecast forecastData={weatherData.forecast.forecastday} tempUnit={tempUnit} />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          onClick={onToggle}
          className="bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm transition-all duration-300 rounded-full p-3"
        >
          {isOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
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
              initial={{ x: 500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 500, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full flex items-center justify-center z-40"
            >
              <div className="h-full max-w-[800px]" >
                <div className="h-full flex flex-col">
                  {/* Header with Widget Navigation */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {widgets.find((w) => w.id === activeWidget)?.icon && (
                          <div className="mr-3">
                            {(() => {
                              const IconComponent = widgets.find((w) => w.id === activeWidget)!.icon
                              const iconColor = widgets.find((w) => w.id === activeWidget)!.color
                              return <IconComponent className={`w-6 h-6 ${iconColor}`} />
                            })()}
                          </div>
                        )}
                        <div>
                          <h2 className="text-xl font-light text-white">
                            {widgets.find((w) => w.id === activeWidget)?.name}
                          </h2>
                          <p className="text-white/60 text-sm font-light">
                            {widgets.find((w) => w.id === activeWidget)?.description}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={onToggle}
                        variant="ghost"
                        size="sm"
                        className="text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Widget Navigation Tabs */}
                    <div className="flex flex-wrap gap-2">
                      {widgets.map((widget) => (
                        <motion.button
                          key={widget.id}
                          onClick={() => setActiveWidget(widget.id)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm transition-all duration-300 ${activeWidget === widget.id
                              ? "bg-white/20 text-white border border-white/30"
                              : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                            }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <widget.icon className={`w-4 h-4 ${widget.color}`} />
                          <span className="hidden sm:inline">{widget.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Widget Content */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <motion.div
                      key={activeWidget}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-6"
                    >
                      {renderWidgetContent()}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
