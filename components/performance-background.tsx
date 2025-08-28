"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

interface PerformanceBackgroundProps {
  weatherCondition: string
  isNight: boolean
}

export function PerformanceBackground({ weatherCondition, isNight }: PerformanceBackgroundProps) {
  // Memoize gradient configuration
  const gradientConfig = useMemo(() => {
    if (isNight) {
      if (weatherCondition.includes("clear") || weatherCondition.includes("sunny")) {
        return {
          base: "from-slate-900 via-purple-900 to-indigo-900",
          overlay: "from-indigo-900/50 via-purple-900/30 to-blue-900/50",
        }
      } else if (weatherCondition.includes("snow")) {
        return {
          base: "from-blue-900 via-indigo-900 to-purple-900",
          overlay: "from-blue-800/40 via-indigo-800/30 to-purple-800/40",
        }
      } else if (weatherCondition.includes("rain")) {
        return {
          base: "from-gray-900 via-slate-900 to-black",
          overlay: "from-gray-800/50 via-slate-800/30 to-gray-900/50",
        }
      }
      return {
        base: "from-indigo-900 via-purple-900 to-blue-900",
        overlay: "from-indigo-800/50 via-purple-800/30 to-blue-800/50",
      }
    } else {
      if (weatherCondition.includes("clear") || weatherCondition.includes("sunny")) {
        return {
          base: "from-sky-300 via-blue-400 to-indigo-500",
          overlay: "from-sky-400/30 via-blue-400/20 to-indigo-500/30",
        }
      } else if (weatherCondition.includes("snow")) {
        return {
          base: "from-blue-200 via-blue-300 to-blue-400",
          overlay: "from-blue-300/40 via-blue-200/30 to-blue-400/40",
        }
      } else if (weatherCondition.includes("rain")) {
        return {
          base: "from-gray-600 via-slate-700 to-gray-800",
          overlay: "from-gray-500/40 via-slate-600/30 to-gray-700/40",
        }
      } else if (weatherCondition.includes("cloud")) {
        return {
          base: "from-gray-400 via-slate-500 to-gray-600",
          overlay: "from-gray-300/40 via-slate-400/30 to-gray-500/40",
        }
      }
      return {
        base: "from-sky-400 via-blue-500 to-indigo-600",
        overlay: "from-sky-300/40 via-blue-400/30 to-indigo-500/40",
      }
    }
  }, [weatherCondition, isNight])

  return (
    <div className="fixed inset-0">
      {/* Base gradient - no animation for better performance */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientConfig.base}`} />

      {/* Subtle animated overlay - reduced animation */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradientConfig.overlay}`}
        animate={{
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Static atmospheric overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
    </div>
  )
}
