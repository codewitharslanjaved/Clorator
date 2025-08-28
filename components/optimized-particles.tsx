"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

interface OptimizedParticlesProps {
  weatherCondition: string
  isNight: boolean
}

export function OptimizedParticles({ weatherCondition, isNight }: OptimizedParticlesProps) {
  // Memoize particle configurations to prevent re-creation
  const particleConfig = useMemo(() => {
    if (weatherCondition.includes("clear") || weatherCondition.includes("sunny")) {
      return {
        count: 15, // Reduced from 30
        type: "sunny",
      }
    }
    if (weatherCondition.includes("rain") || weatherCondition.includes("drizzle")) {
      return {
        count: 80, // Reduced from 200
        type: "rain",
      }
    }
    if (weatherCondition.includes("snow")) {
      return {
        count: 60, // Reduced from 100
        type: "snow",
      }
    }
    if (isNight) {
      return {
        count: 50, // Reduced from 150
        type: "stars",
      }
    }
    return { count: 0, type: "none" }
  }, [weatherCondition, isNight])

  // Sunny particles - optimized
  if (particleConfig.type === "sunny") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(particleConfig.count)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-yellow-200/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    )
  }

  // Rain particles - optimized
  if (particleConfig.type === "rain") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(particleConfig.count)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-6 bg-blue-200/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
            }}
            animate={{
              y: ["0vh", "110vh"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1 + Math.random() * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>
    )
  }

  // Snow particles - enhanced and optimized
  if (particleConfig.type === "snow") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(particleConfig.count)].map((_, i) => {
          const size = Math.random() * 4 + 2
          const isLargeFlake = size > 4
          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${isLargeFlake ? "bg-white shadow-lg" : "bg-white/80"}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                width: size,
                height: size,
                boxShadow: isLargeFlake ? "0 0 8px rgba(255,255,255,0.6)" : "none",
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [0, Math.random() * 60 - 30],
                rotate: [0, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          )
        })}
      </div>
    )
  }

  // Stars - optimized
  if (particleConfig.type === "stars") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(particleConfig.count)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              boxShadow: "0 0 4px rgba(255,255,255,0.8)",
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    )
  }

  return null
}
