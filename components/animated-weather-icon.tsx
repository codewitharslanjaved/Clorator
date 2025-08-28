"use client"

import { motion } from "framer-motion"
import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle, Cloudy } from "lucide-react"

interface AnimatedWeatherIconProps {
  condition: string
  code?: number
  size?: number
  className?: string
}

export function AnimatedWeatherIcon({ condition, code, size = 24, className = "" }: AnimatedWeatherIconProps) {
  const iconProps = { size, className }

  const getIcon = () => {
    if (code) {
      switch (code) {
        case 1000: // Sunny/Clear
          return (
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
            >
              <Sun {...iconProps} />
            </motion.div>
          )
        case 1003:
        case 1006:
        case 1009:
          return (
            <motion.div
              animate={{
                y: [0, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Cloud {...iconProps} />
            </motion.div>
          )
        case 1063:
        case 1180:
        case 1183:
        case 1186:
        case 1189:
        case 1192:
        case 1195:
        case 1240:
        case 1243:
        case 1246:
          return (
            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <CloudRain {...iconProps} />
            </motion.div>
          )
        case 1150:
        case 1153:
        case 1168:
        case 1171:
          return (
            <motion.div
              animate={{
                y: [0, -2, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <CloudDrizzle {...iconProps} />
            </motion.div>
          )
        case 1066:
        case 1210:
        case 1213:
        case 1216:
        case 1219:
        case 1222:
        case 1225:
        case 1255:
        case 1258:
          return (
            <motion.div
              animate={{
                y: [0, -4, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <CloudSnow {...iconProps} />
            </motion.div>
          )
        case 1087:
        case 1273:
        case 1276:
        case 1279:
        case 1282:
          return (
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Zap {...iconProps} />
            </motion.div>
          )
        case 1030:
        case 1135:
        case 1147:
          return (
            <motion.div
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Cloudy {...iconProps} />
            </motion.div>
          )
        default:
          return (
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
            >
              <Sun {...iconProps} />
            </motion.div>
          )
      }
    }

    return <Sun {...iconProps} />
  }

  return getIcon()
}
