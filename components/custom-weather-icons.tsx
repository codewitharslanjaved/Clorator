"use client"

import { motion } from "framer-motion"

interface CustomWeatherIconProps {
  condition: string
  code?: number
  size?: number
  className?: string
  animated?: boolean
}

export function CustomWeatherIcon({
  condition,
  code,
  size = 48,
  className = "",
  animated = true,
}: CustomWeatherIconProps) {
  const iconSize = size
  const strokeWidth = Math.max(1, size / 24)

  const getWeatherSVG = () => {
    if (code) {
      switch (code) {
        case 1000: // Sunny/Clear
          return (
            <motion.svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 48 48"
              className={className}
              animate={animated ? { rotate: [0, 360] } : {}}
              transition={animated ? { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : {}}
            >
              <defs>
                <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </radialGradient>
              </defs>
              <circle cx="24" cy="24" r="8" fill="url(#sunGradient)" />
              {[...Array(8)].map((_, i) => (
                <motion.line
                  key={i}
                  x1="24"
                  y1="4"
                  x2="24"
                  y2="8"
                  stroke="#FCD34D"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  transform={`rotate(${i * 45} 24 24)`}
                  animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
                  transition={animated ? { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 } : {}}
                />
              ))}
            </motion.svg>
          )

        case 1003: // Partly cloudy
        case 1006: // Cloudy
        case 1009: // Overcast
          return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 48 48" className={className}>
              <defs>
                <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5E7EB" />
                  <stop offset="100%" stopColor="#9CA3AF" />
                </linearGradient>
              </defs>
              <motion.path
                d="M36 20c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 1.334.218 2.618.618 3.815C10.7 24.8 9 27.2 9 30c0 3.314 2.686 6 6 6h21c2.761 0 5-2.239 5-5 0-2.761-2.239-5-5-5z"
                fill="url(#cloudGradient)"
                animate={animated ? { y: [0, -2, 0] } : {}}
                transition={animated ? { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } : {}}
              />
            </svg>
          )

        case 1063: // Patchy rain possible
        case 1180: // Light rain
        case 1183: // Light rain
        case 1186: // Moderate rain
        case 1189: // Moderate rain
        case 1192: // Heavy rain
        case 1195: // Heavy rain
        case 1240: // Light rain shower
        case 1243: // Moderate rain shower
        case 1246: // Heavy rain shower
          return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 48 48" className={className}>
              <defs>
                <linearGradient id="rainCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6B7280" />
                  <stop offset="100%" stopColor="#374151" />
                </linearGradient>
              </defs>
              <motion.path
                d="M36 18c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 1.334.218 2.618.618 3.815C10.7 22.8 9 25.2 9 28c0 3.314 2.686 6 6 6h21c2.761 0 5-2.239 5-5 0-2.761-2.239-5-5-5z"
                fill="url(#rainCloudGradient)"
                animate={animated ? { y: [0, -1, 0] } : {}}
                transition={animated ? { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } : {}}
              />
              {[...Array(5)].map((_, i) => (
                <motion.line
                  key={i}
                  x1={14 + i * 4}
                  y1="32"
                  x2={12 + i * 4}
                  y2="40"
                  stroke="#60A5FA"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  animate={animated ? { opacity: [0, 1, 0], y: [0, 4, 0] } : {}}
                  transition={animated ? { duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 } : {}}
                />
              ))}
            </svg>
          )

        case 1066: // Patchy snow possible
        case 1210: // Patchy light snow
        case 1213: // Light snow
        case 1216: // Patchy moderate snow
        case 1219: // Moderate snow
        case 1222: // Patchy heavy snow
        case 1225: // Heavy snow
        case 1255: // Light snow showers
        case 1258: // Moderate or heavy snow showers
          return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 48 48" className={className}>
              <defs>
                <linearGradient id="snowCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5E7EB" />
                  <stop offset="100%" stopColor="#D1D5DB" />
                </linearGradient>
              </defs>
              <motion.path
                d="M36 18c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 1.334.218 2.618.618 3.815C10.7 22.8 9 25.2 9 28c0 3.314 2.686 6 6 6h21c2.761 0 5-2.239 5-5 0-2.761-2.239-5-5-5z"
                fill="url(#snowCloudGradient)"
                animate={animated ? { y: [0, -1, 0] } : {}}
                transition={animated ? { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } : {}}
              />
              {[...Array(6)].map((_, i) => (
                <motion.g key={i}>
                  <motion.circle
                    cx={12 + i * 4}
                    cy="34"
                    r="1.5"
                    fill="white"
                    animate={animated ? { y: [0, 8, 0], opacity: [0, 1, 0] } : {}}
                    transition={animated ? { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 } : {}}
                  />
                  <motion.circle
                    cx={14 + i * 4}
                    cy="38"
                    r="1"
                    fill="white"
                    animate={animated ? { y: [0, 6, 0], opacity: [0, 1, 0] } : {}}
                    transition={animated ? { duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.15 } : {}}
                  />
                </motion.g>
              ))}
            </svg>
          )

        case 1087: // Thundery outbreaks possible
        case 1273: // Patchy light rain with thunder
        case 1276: // Moderate or heavy rain with thunder
        case 1279: // Patchy light snow with thunder
        case 1282: // Moderate or heavy snow with thunder
          return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 48 48" className={className}>
              <defs>
                <linearGradient id="stormCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#374151" />
                  <stop offset="100%" stopColor="#1F2937" />
                </linearGradient>
              </defs>
              <motion.path
                d="M36 18c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 1.334.218 2.618.618 3.815C10.7 22.8 9 25.2 9 28c0 3.314 2.686 6 6 6h21c2.761 0 5-2.239 5-5 0-2.761-2.239-5-5-5z"
                fill="url(#stormCloudGradient)"
                animate={animated ? { y: [0, -2, 0] } : {}}
                transition={animated ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } : {}}
              />
              <motion.path
                d="M20 32 L26 38 L22 38 L28 44 L22 38 L24 32 Z"
                fill="#FCD34D"
                stroke="#F59E0B"
                strokeWidth={strokeWidth / 2}
                animate={animated ? { opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] } : {}}
                transition={animated ? { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } : {}}
              />
            </svg>
          )

        case 1030: // Mist
        case 1135: // Fog
        case 1147: // Freezing fog
          return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 48 48" className={className}>
              <defs>
                <linearGradient id="mistGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(229, 231, 235, 0.8)" />
                  <stop offset="50%" stopColor="rgba(229, 231, 235, 0.4)" />
                  <stop offset="100%" stopColor="rgba(229, 231, 235, 0.8)" />
                </linearGradient>
              </defs>
              {[...Array(4)].map((_, i) => (
                <motion.line
                  key={i}
                  x1="8"
                  y1={16 + i * 4}
                  x2="40"
                  y2={16 + i * 4}
                  stroke="url(#mistGradient)"
                  strokeWidth={strokeWidth * 2}
                  strokeLinecap="round"
                  animate={animated ? { opacity: [0.3, 0.8, 0.3], x: [-2, 2, -2] } : {}}
                  transition={animated ? { duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 } : {}}
                />
              ))}
            </svg>
          )

        default:
          return (
            <motion.svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 48 48"
              className={className}
              animate={animated ? { rotate: [0, 360] } : {}}
              transition={animated ? { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : {}}
            >
              <defs>
                <radialGradient id="defaultSunGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </radialGradient>
              </defs>
              <circle cx="24" cy="24" r="8" fill="url(#defaultSunGradient)" />
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="24"
                  y1="4"
                  x2="24"
                  y2="8"
                  stroke="#FCD34D"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  transform={`rotate(${i * 45} 24 24)`}
                />
              ))}
            </motion.svg>
          )
      }
    }

    // Fallback based on condition text
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 48 48" className={className}>
        <circle cx="24" cy="24" r="8" fill="#FCD34D" />
      </svg>
    )
  }

  return getWeatherSVG()
}
