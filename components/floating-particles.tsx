"use client"

import { motion } from "framer-motion"

interface FloatingParticlesProps {
  weatherCondition: string
  isNight: boolean
}

export function FloatingParticles({ weatherCondition, isNight }: FloatingParticlesProps) {
  // Sky particles for clear weather
  if (weatherCondition.includes("clear") || weatherCondition.includes("sunny")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    )
  }

  // Rain particles
  if (weatherCondition.includes("rain") || weatherCondition.includes("drizzle")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-200 to-transparent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
            }}
            animate={{
              y: ["0vh", "110vh"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 1 + 0.8,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>
    )
  }

  // Snow particles
  if (weatherCondition.includes("snow")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-80"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    )
  }

  // Night stars
  if (isNight) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
            }}
          >
            <svg width="4" height="4" viewBox="0 0 4 4">
              <motion.circle
                cx="2"
                cy="2"
                r="1"
                fill="white"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 3,
                }}
              />
            </svg>
          </motion.div>
        ))}
      </div>
    )
  }

  return null
}
