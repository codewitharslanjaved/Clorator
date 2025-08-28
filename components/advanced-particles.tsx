"use client"

import { motion } from "framer-motion"

interface AdvancedParticlesProps {
  weatherCondition: string
  isNight: boolean
}

export function AdvancedParticles({ weatherCondition, isNight }: AdvancedParticlesProps) {
  // Magical floating orbs for clear weather
  if (weatherCondition.includes("clear") || weatherCondition.includes("sunny")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              background: `radial-gradient(circle, rgba(251, 191, 36, ${Math.random() * 0.6 + 0.2}) 0%, transparent 70%)`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Light beams */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`beam-${i}`}
            className="absolute w-1 bg-gradient-to-b from-yellow-200/20 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: "0%",
              height: "100%",
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleX: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    )
  }

  // Enhanced rain with splash effects
  if (weatherCondition.includes("rain") || weatherCondition.includes("drizzle")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Rain drops */}
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-b from-blue-200/80 to-transparent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              width: Math.random() * 2 + 1,
              height: Math.random() * 20 + 10,
            }}
            animate={{
              y: ["0vh", "110vh"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 1.5 + 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          />
        ))}

        {/* Splash effects */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`splash-${i}`}
            className="absolute w-2 h-2 bg-blue-300/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "0%",
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    )
  }

  // Magical snow with sparkles
  if (weatherCondition.includes("snow")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255,255,255,0.8)`,
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    )
  }

  // Constellation stars for night
  if (isNight) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
            }}
          >
            <motion.div
              className="w-1 h-1 bg-white rounded-full"
              style={{
                boxShadow: `0 0 ${Math.random() * 8 + 2}px rgba(255,255,255,0.8)`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 4,
              }}
            />
          </motion.div>
        ))}

        {/* Shooting stars */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute w-20 h-0.5 bg-gradient-to-r from-white to-transparent"
            style={{
              left: `${Math.random() * 50}%`,
              top: `${Math.random() * 30}%`,
              transform: "rotate(-45deg)",
            }}
            animate={{
              x: [0, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 10 + 5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    )
  }

  return null
}
