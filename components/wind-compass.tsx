"use client"

import { motion } from "framer-motion"
import { Navigation } from "lucide-react"
import { GlassCard } from "./glass-card"

interface WindCompassProps {
  windSpeed: number
  windDirection: number
  windDegree?: number
}

export function WindCompass({ windSpeed, windDirection = 180, windDegree = 180 }: WindCompassProps) {
  const getWindDirection = (degree: number) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ]
    const index = Math.round(degree / 22.5) % 16
    return directions[index]
  }

  const getWindStrength = (speed: number) => {
    if (speed < 5) return { level: "Calm", color: "text-blue-300" }
    if (speed < 15) return { level: "Light", color: "text-green-300" }
    if (speed < 25) return { level: "Moderate", color: "text-yellow-300" }
    if (speed < 35) return { level: "Strong", color: "text-orange-300" }
    return { level: "Very Strong", color: "text-red-300" }
  }

  const windInfo = getWindStrength(windSpeed)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="mb-8"
    >
      <h3 className="text-xl font-light text-white mb-4 flex items-center">
        <Navigation className="w-5 h-5 mr-2 text-blue-300" />
        Wind Details
      </h3>
      <GlassCard className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-white/20" />
              <div className="absolute inset-2 rounded-full border border-white/10" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: windDegree }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Navigation className="w-6 h-6 text-blue-300" />
              </motion.div>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs text-white/60">N</div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-white/60">S</div>
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-xs text-white/60">W</div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 text-xs text-white/60">E</div>
            </div>
            <div>
              <div className="text-2xl font-light text-white">{Math.round(windSpeed)} km/h</div>
              <div className={`text-sm font-medium ${windInfo.color}`}>{windInfo.level}</div>
              <div className="text-white/60 text-sm font-light">{getWindDirection(windDegree)}</div>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
