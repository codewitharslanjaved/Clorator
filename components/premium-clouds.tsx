"use client"

import { motion } from "framer-motion"

export function PremiumClouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Hero Clouds */}
      <motion.div
        className="absolute top-16 -left-32"
        animate={{
          x: [0, 300, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 50,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <svg width="300" height="180" viewBox="0 0 300 180" className="opacity-15">
          <defs>
            <linearGradient id="premiumCloud1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
            </linearGradient>
            <filter id="blur1">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
          </defs>
          <ellipse cx="75" cy="90" rx="50" ry="35" fill="url(#premiumCloud1)" filter="url(#blur1)" />
          <ellipse cx="120" cy="75" rx="60" ry="45" fill="url(#premiumCloud1)" filter="url(#blur1)" />
          <ellipse cx="165" cy="85" rx="50" ry="35" fill="url(#premiumCloud1)" filter="url(#blur1)" />
          <ellipse cx="210" cy="95" rx="45" ry="30" fill="url(#premiumCloud1)" filter="url(#blur1)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-40 right-16"
        animate={{
          x: [0, -200, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 45,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <svg width="250" height="150" viewBox="0 0 250 150" className="opacity-12">
          <defs>
            <linearGradient id="premiumCloud2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>
            <filter id="blur2">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="75" rx="45" ry="30" fill="url(#premiumCloud2)" filter="url(#blur2)" />
          <ellipse cx="100" cy="65" rx="55" ry="40" fill="url(#premiumCloud2)" filter="url(#blur2)" />
          <ellipse cx="140" cy="75" rx="45" ry="30" fill="url(#premiumCloud2)" filter="url(#blur2)" />
          <ellipse cx="175" cy="85" rx="40" ry="25" fill="url(#premiumCloud2)" filter="url(#blur2)" />
        </svg>
      </motion.div>

      {/* Ambient Clouds */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 120 - 10}%`,
          }}
          animate={{
            x: [0, Math.random() * 150 - 75, 0],
            y: [0, Math.random() * 40 - 20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: Math.random() * 30 + 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 15,
          }}
        >
          <svg width="100" height="60" viewBox="0 0 100 60">
            <defs>
              <linearGradient id={`cloud-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
              </linearGradient>
              <filter id={`blur-${i}`}>
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
            </defs>
            <ellipse cx="25" cy="30" rx="20" ry="15" fill={`url(#cloud-${i})`} filter={`url(#blur-${i})`} />
            <ellipse cx="45" cy="25" rx="25" ry="18" fill={`url(#cloud-${i})`} filter={`url(#blur-${i})`} />
            <ellipse cx="65" cy="30" rx="20" ry="15" fill={`url(#cloud-${i})`} filter={`url(#blur-${i})`} />
            <ellipse cx="80" cy="35" rx="18" ry="12" fill={`url(#cloud-${i})`} filter={`url(#blur-${i})`} />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
