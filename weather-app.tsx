"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Loader2,
  AlertCircle,
  Navigation,
  Sparkles,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWeather } from "./hooks/use-weather"
import { CustomWeatherIcon } from "./components/custom-weather-icons"
import { SearchDropdown } from "./components/search-dropdown"
import { PerformanceBackground } from "./components/performance-background"
import { OptimizedParticles } from "./components/optimized-particles"
import { OptimizedClouds } from "./components/optimized-clouds"
import { GlassCard } from "./components/glass-card"
import { SnowControls } from "./components/snow-controls"
import { EnhancedSnow } from "./components/enhanced-snow"
import { WeatherWidgetsSidebar } from "./components/weather-widgets-sidebar"

export default function Component() {
  const [tempUnit, setTempUnit] = useState<"C" | "F">("C")
  const [snowIntensity, setSnowIntensity] = useState<"light" | "moderate" | "heavy">("moderate")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { weatherData, loading, error, fetchWeather, searchLocations, getCurrentLocation } = useWeather()

  // Memoize temperature calculation
  const getTemp = useCallback(
    (tempC: number, tempF: number) => {
      return tempUnit === "C" ? Math.round(tempC) : Math.round(tempF)
    },
    [tempUnit],
  )

  // Memoize weather condition
  const weatherCondition = useMemo(() => {
    if (!weatherData?.current.condition) return "clear"
    return weatherData.current.condition.text.toLowerCase()
  }, [weatherData])

  // Memoize night time calculation
  const isNight = useMemo(() => {
    if (!weatherData) return false
    const currentTime = new Date(weatherData.location.localtime)
    const currentHour = currentTime.getHours()
    return currentHour < 6 || currentHour > 18
  }, [weatherData])

  const handleLocationSelect = useCallback(
    (lat: number, lon: number, name: string) => {
      fetchWeather(lat, lon)
    },
    [fetchWeather],
  )

  const handleSnowIntensityChange = useCallback((intensity: "light" | "moderate" | "heavy") => {
    setSnowIntensity(intensity)
  }, [])

  const isSnowing = weatherCondition.includes("snow")

  return (
    <div className="relative overflow-hidden">
      {/* Background Layer - z-0 */}
      <div className="fixed inset-0 z-0">
        <PerformanceBackground weatherCondition={weatherCondition} isNight={isNight} />
      </div>

      {/* Atmospheric Effects Layer - z-10 */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <OptimizedClouds />
        <OptimizedParticles weatherCondition={weatherCondition} isNight={isNight} />
        <EnhancedSnow intensity={snowIntensity} isActive={isSnowing} />
      </div>

      {/* Weather Widgets Sidebar - z-30-40 */}
      {weatherData && (
        <WeatherWidgetsSidebar
          weatherData={weatherData}
          tempUnit={tempUnit}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      )}

      {/* UI Controls Layer - z-50 */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          {isSnowing && <SnowControls onIntensityChange={handleSnowIntensityChange} currentIntensity={snowIntensity} />}
        </div>
      </div>

      {/* Main Content Layer - z-20 */}
      <div className="relative z-20 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-yellow-300 mr-2" />
            <motion.h1
              className="text-4xl md:text-6xl font-light bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
              style={{
                textShadow: "0 0 20px rgba(255,255,255,0.3)",
              }}
            >
              Clorator
            </motion.h1>
            <Sparkles className="w-6 h-6 text-yellow-300 ml-2" />
          </div>
          <p className="text-lg text-white/80 font-light">Your Premium Weather Experience</p>
          <motion.div
            className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mt-3"
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-lg mx-auto mb-10"
        >
          <GlassCard className="p-1" hover={false}>
            <div className="flex items-center p-3">
              <Search className="w-5 h-5 text-white/70 ml-3 flex-shrink-0" />
              <SearchDropdown onLocationSelect={handleLocationSelect} searchLocations={searchLocations} />
              <Button
                onClick={getCurrentLocation}
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm transition-all duration-300 flex-shrink-0 mr-2"
              >
                <Navigation className="w-4 h-4" />
              </Button>
              {weatherData && (
                <Button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  size="sm"
                  className="bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm transition-all duration-300 flex-shrink-0"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-20"
            >
              <GlassCard className="p-8" hover={false}>
                <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
                <p className="text-white text-center font-light">Loading weather data...</p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto mb-8"
            >
              <GlassCard className="p-6" hover={false}>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-300" />
                  <div>
                    <h3 className="text-white font-medium">Connection Error</h3>
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weather Content */}
        <AnimatePresence>
          {weatherData && !loading && (
            <div className="max-w-4xl mx-auto">
              {/* Main Weather Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <GlassCard className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3 text-white/90">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg font-light">
                        {weatherData.location.name}, {weatherData.location.country}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTempUnit(tempUnit === "C" ? "F" : "C")}
                      className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      °{tempUnit}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Main Weather Display */}
                    <div className="text-center xl:text-left">
                      <div className="flex items-center justify-center xl:justify-start space-x-6 mb-6">
                        <CustomWeatherIcon
                          condition={weatherData.current.condition.text}
                          code={weatherData.current.condition.code}
                          size={96}
                          className="text-white/90"
                          animated={true}
                        />
                        <div>
                          <div className="text-6xl md:text-7xl font-light text-white">
                            {getTemp(weatherData.current.temp_c, weatherData.current.temp_f)}°
                          </div>
                          <div className="text-white/60 font-light">
                            Feels like {getTemp(weatherData.current.feelslike_c, weatherData.current.feelslike_f)}°
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl text-white/90 font-light mb-2">{weatherData.current.condition.text}</div>
                      <div className="text-white/60 text-sm font-light">
                        {new Date(weatherData.location.localtime).toLocaleDateString([], {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    {/* Weather Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          icon: Droplets,
                          label: "Humidity",
                          value: `${weatherData.current.humidity}%`,
                          color: "text-blue-300",
                          bgColor: "from-blue-500/10 to-cyan-500/10",
                        },
                        {
                          icon: Wind,
                          label: "Wind Speed",
                          value: `${Math.round(weatherData.current.wind_kph)} km/h`,
                          color: "text-green-300",
                          bgColor: "from-green-500/10 to-emerald-500/10",
                        },
                        {
                          icon: Eye,
                          label: "Visibility",
                          value: `${Math.round(weatherData.current.vis_km)} km`,
                          color: "text-purple-300",
                          bgColor: "from-purple-500/10 to-violet-500/10",
                        },
                        {
                          icon: Thermometer,
                          label: "UV Index",
                          value: weatherData.current.uv.toString(),
                          color: "text-orange-300",
                          bgColor: "from-orange-500/10 to-red-500/10",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`bg-gradient-to-br ${item.bgColor} backdrop-blur-sm rounded-2xl p-4 border border-white/10`}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                            <span className="text-white/60 text-sm font-light">{item.label}</span>
                          </div>
                          <div className="text-2xl font-light text-white">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Quick Access Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 text-center"
              >
                <GlassCard className="p-6" hover={false}>
                  <p className="text-white/80 font-light mb-2">
                    Explore detailed weather information in the widgets panel
                  </p>
                  <Button
                    onClick={() => setSidebarOpen(true)}
                    className="bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm transition-all duration-300"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Open Weather Widgets
                  </Button>
                </GlassCard>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
