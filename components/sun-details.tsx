"use client"

import { motion } from "framer-motion"
import { Sunrise, Sunset, Sun, Moon } from "lucide-react"
import { GlassCard } from "./glass-card"

interface SunDetailsProps {
  sunrise: string
  sunset: string
  isNight: boolean
}

export function SunDetails({ sunrise, sunset, isNight }: SunDetailsProps) {
  const calculateDaylight = () => {
    const sunriseTime = new Date(`2000-01-01 ${sunrise}`)
    const sunsetTime = new Date(`2000-01-01 ${sunset}`)
    const diff = sunsetTime.getTime() - sunriseTime.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const getCurrentSunPosition = () => {
    const now = new Date()
    const sunriseTime = new Date(`${now.toDateString()} ${sunrise}`)
    const sunsetTime = new Date(`${now.toDateString()} ${sunset}`)

    if (now < sunriseTime || now > sunsetTime) {
      return 0 // Night
    }

    const totalDaylight = sunsetTime.getTime() - sunriseTime.getTime()
    const elapsed = now.getTime() - sunriseTime.getTime()
    return Math.min((elapsed / totalDaylight) * 100, 100)
  }

  const sunPosition = getCurrentSunPosition()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mb-8"
    >
      <h3 className="text-xl font-light text-white mb-4 flex items-center">
        {isNight ? <Moon className="w-5 h-5 mr-2 text-blue-300" /> : <Sun className="w-5 h-5 mr-2 text-yellow-300" />}
        Sun & Moon
      </h3>
      <GlassCard className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Sunrise className="w-6 h-6 text-yellow-300" />
              <div>
                <div className="text-white font-medium">Sunrise</div>
                <div className="text-white/70 text-sm font-light">{sunrise}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Sunset className="w-6 h-6 text-orange-300" />
              <div className="text-right">
                <div className="text-white font-medium">Sunset</div>
                <div className="text-white/70 text-sm font-light">{sunset}</div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-white/70 mb-2">
              <span>Daylight Duration</span>
              <span>{calculateDaylight()}</span>
            </div>
            <div className="relative w-full bg-white/10 rounded-full h-2">
              <motion.div
                className="absolute top-0 left-0 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${sunPosition}%` }}
                transition={{ duration: 1, delay: 1 }}
              />
              <motion.div
                className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-yellow-300 rounded-full shadow-lg"
                initial={{ left: "0%" }}
                animate={{ left: `${sunPosition}%` }}
                transition={{ duration: 1, delay: 1 }}
                style={{ marginLeft: "-6px" }}
              />
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
