"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

interface EnhancedSnowProps {
  intensity: "light" | "moderate" | "heavy"
  isActive: boolean
}

export function EnhancedSnow({ intensity, isActive }: EnhancedSnowProps) {
  const snowConfig = useMemo(() => {
    switch (intensity) {
      case "light":
        return { count: 30, speed: 4, size: [2, 4], opacity: 0.7 }
      case "moderate":
        return { count: 60, speed: 3, size: [2, 6], opacity: 0.8 }
      case "heavy":
        return { count: 100, speed: 2, size: [3, 8], opacity: 0.9 }
      default:
        return { count: 30, speed: 4, size: [2, 4], opacity: 0.7 }
    }
  }, [intensity])

  if (!isActive) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Snow particles */}
      {[...Array(snowConfig.count)].map((_, i) => {
        const size = Math.random() * (snowConfig.size[1] - snowConfig.size[0]) + snowConfig.size[0]
        const isLargeFlake = size > 5
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${isLargeFlake ? "bg-white shadow-lg" : "bg-white/90"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              width: size,
              height: size,
              boxShadow: isLargeFlake ? "0 0 10px rgba(255,255,255,0.8)" : "0 0 4px rgba(255,255,255,0.4)",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, Math.random() * 80 - 40],
              rotate: [0, 360],
              opacity: [0, snowConfig.opacity, 0],
            }}
            transition={{
              duration: snowConfig.speed + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        )
      })}

      {/* Snow accumulation effect */}
      {intensity === "heavy" && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-white/20 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Blizzard effect for heavy snow */}
      {intensity === "heavy" && (
        <motion.div
          className="absolute inset-0 bg-white/5"
          animate={{
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  )
}
