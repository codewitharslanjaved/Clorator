"use client"

import { motion } from "framer-motion"
import { Leaf, AlertTriangle, CheckCircle } from "lucide-react"
import { GlassCard } from "./glass-card"

interface AirQualityProps {
  aqi?: number
}

export function AirQuality({ aqi = 42 }: AirQualityProps) {
  const getAQIInfo = (value: number) => {
    if (value <= 50) {
      return {
        level: "Good",
        color: "text-green-300",
        bgColor: "from-green-500/10 to-emerald-500/10",
        icon: CheckCircle,
        description: "Air quality is satisfactory",
      }
    } else if (value <= 100) {
      return {
        level: "Moderate",
        color: "text-yellow-300",
        bgColor: "from-yellow-500/10 to-orange-500/10",
        icon: Leaf,
        description: "Air quality is acceptable",
      }
    } else {
      return {
        level: "Unhealthy",
        color: "text-red-300",
        bgColor: "from-red-500/10 to-pink-500/10",
        icon: AlertTriangle,
        description: "Sensitive groups may be affected",
      }
    }
  }

  const aqiInfo = getAQIInfo(aqi)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mb-8"
    >
      <h3 className="text-xl font-light text-white mb-4 flex items-center">
        <Leaf className="w-5 h-5 mr-2 text-green-300" />
        Air Quality
      </h3>
      <GlassCard className={`p-6 bg-gradient-to-br ${aqiInfo.bgColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <aqiInfo.icon className={`w-8 h-8 ${aqiInfo.color}`} />
            <div>
              <div className="text-2xl font-light text-white">{aqi}</div>
              <div className={`text-sm font-medium ${aqiInfo.color}`}>{aqiInfo.level}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/70 text-sm font-light">{aqiInfo.description}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full bg-gradient-to-r ${aqiInfo.bgColor.replace("/10", "/50")}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((aqi / 150) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
