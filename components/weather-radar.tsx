"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Radar, CloudRain, Thermometer, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WeatherRadarProps {
  location: {
    lat: number
    lon: number
    name: string
  }
}

export function WeatherRadar({ location }: WeatherRadarProps) {
  const [radarType, setRadarType] = useState<"precipitation" | "temperature" | "wind">("precipitation")

  const radarTypes = [
    { id: "precipitation", label: "Rain", icon: CloudRain, color: "text-blue-300" },
    { id: "temperature", label: "Temp", icon: Thermometer, color: "text-orange-300" },
    { id: "wind", label: "Wind", icon: Wind, color: "text-green-300" },
  ] as const

  // Simulated radar data
  const generateRadarData = () => {
    const data = []
    for (let i = 0; i < 40; i++) {
      data.push({
        x: Math.random() * 300,
        y: Math.random() * 200,
        intensity: Math.random(),
        size: Math.random() * 8 + 2,
      })
    }
    return data
  }

  const radarData = generateRadarData()

  const getRadarColor = (intensity: number) => {
    switch (radarType) {
      case "precipitation":
        if (intensity > 0.8) return "#1E40AF"
        if (intensity > 0.6) return "#3B82F6"
        if (intensity > 0.4) return "#60A5FA"
        return "#93C5FD"
      case "temperature":
        if (intensity > 0.8) return "#DC2626"
        if (intensity > 0.6) return "#F59E0B"
        if (intensity > 0.4) return "#FCD34D"
        return "#34D399"
      case "wind":
        if (intensity > 0.8) return "#7C3AED"
        if (intensity > 0.6) return "#A855F7"
        if (intensity > 0.4) return "#C084FC"
        return "#DDD6FE"
      default:
        return "#60A5FA"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-light text-white flex items-center">
          <Radar className="w-5 h-5 mr-2 text-purple-300" />
          Weather Radar
        </h3>
      </div>

      {/* Radar Type Selector */}
      <div className="flex space-x-2">
        {radarTypes.map((type) => (
          <Button
            key={type.id}
            onClick={() => setRadarType(type.id)}
            className={`flex items-center space-x-2 transition-all duration-300 ${
              radarType === type.id
                ? "bg-white/20 text-white border-white/30"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border-white/10"
            }`}
            size="sm"
          >
            <type.icon className={`w-4 h-4 ${type.color}`} />
            <span>{type.label}</span>
          </Button>
        ))}
      </div>

      {/* Radar Display */}
      <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl overflow-hidden">
        <div className="aspect-video relative">
          {/* Radar Grid */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="radarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#radarGrid)" />

            {/* Concentric circles */}
            <g transform="translate(50%, 50%)">
              {[...Array(3)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx="0"
                  cy="0"
                  r={`${(i + 1) * 20}%`}
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
                />
              ))}
            </g>
          </svg>

          {/* Weather Data Points */}
          <div className="absolute inset-0">
            {radarData.map((point, index) => (
              <motion.div
                key={index}
                className="absolute rounded-full"
                style={{
                  left: `${(point.x / 300) * 100}%`,
                  top: `${(point.y / 200) * 100}%`,
                  width: point.size,
                  height: point.size,
                  backgroundColor: getRadarColor(point.intensity),
                  opacity: point.intensity * 0.8 + 0.2,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [point.intensity * 0.8 + 0.2, point.intensity, point.intensity * 0.8 + 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Location Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-3 h-3 bg-red-500 rounded-full border border-white shadow-lg"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>

          {/* Radar Sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(34, 197, 94, 0.3) 30deg, transparent 60deg)",
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
          <div className="text-white/80 text-xs font-medium mb-1">Intensity</div>
          <div className="flex space-x-1">
            {[0.2, 0.4, 0.6, 0.8].map((intensity, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: getRadarColor(intensity) }} />
                <div className="text-white/60 text-xs">
                  {radarType === "precipitation" && ["L", "M", "H", "S"][i]}
                  {radarType === "temperature" && ["C", "M", "W", "H"][i]}
                  {radarType === "wind" && ["C", "L", "M", "S"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-white/60 text-sm font-light">
          Live {radarType} radar for {location.name}
        </p>
        <p className="text-white/40 text-xs mt-1">Updates every 5 minutes • 100km radius</p>
      </div>
    </div>
  )
}
