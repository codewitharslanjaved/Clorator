"use client"

import { motion } from "framer-motion"

interface SkyGradientProps {
  weatherCondition: string
  isNight: boolean
}

export function SkyGradient({ weatherCondition, isNight }: SkyGradientProps) {
  const getGradientColors = () => {
    if (isNight) {
      if (weatherCondition.includes("clear") || weatherCondition.includes("sunny")) {
        return "from-indigo-900 via-purple-900 to-blue-900"
      } else if (weatherCondition.includes("cloud")) {
        return "from-gray-800 via-gray-900 to-black"
      } else if (weatherCondition.includes("rain")) {
        return "from-gray-900 via-slate-900 to-black"
      } else if (weatherCondition.includes("snow")) {
        return "from-blue-900 via-indigo-900 to-purple-900"
      }
      return "from-indigo-900 via-purple-900 to-blue-900"
    } else {
      if (weatherCondition.includes("clear") || weatherCondition.includes("sunny")) {
        return "from-sky-300 via-sky-400 to-blue-500"
      } else if (weatherCondition.includes("cloud")) {
        return "from-gray-300 via-gray-400 to-gray-500"
      } else if (weatherCondition.includes("rain")) {
        return "from-gray-500 via-gray-600 to-gray-700"
      } else if (weatherCondition.includes("snow")) {
        return "from-blue-200 via-blue-300 to-blue-400"
      }
      return "from-sky-400 via-sky-500 to-blue-600"
    }
  }

  return (
    <motion.div
      className={`fixed inset-0 bg-gradient-to-br ${getGradientColors()}`}
      animate={{
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {/* Animated overlay gradients */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Atmospheric layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-transparent"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}
