"use client"

import { motion } from "framer-motion"

export function AnimatedClouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large Background Clouds */}
      <motion.div
        className="absolute top-10 -left-20"
        animate={{
          x: [0, 200, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 40,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <svg width="200" height="120" viewBox="0 0 200 120" className="opacity-20">
          <defs>
            <linearGradient id="cloud1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="60" rx="35" ry="25" fill="url(#cloud1)" />
          <ellipse cx="80" cy="50" rx="40" ry="30" fill="url(#cloud1)" />
          <ellipse cx="110" cy="55" rx="35" ry="25" fill="url(#cloud1)" />
          <ellipse cx="140" cy="65" rx="30" ry="20" fill="url(#cloud1)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-32 right-10"
        animate={{
          x: [0, -150, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 35,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <svg width="160" height="100" viewBox="0 0 160 100" className="opacity-15">
          <defs>
            <linearGradient id="cloud2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
            </linearGradient>
          </defs>
          <ellipse cx="40" cy="50" rx="30" ry="20" fill="url(#cloud2)" />
          <ellipse cx="65" cy="45" rx="35" ry="25" fill="url(#cloud2)" />
          <ellipse cx="90" cy="50" rx="30" ry="20" fill="url(#cloud2)" />
          <ellipse cx="115" cy="55" rx="25" ry="18" fill="url(#cloud2)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-60 left-1/3"
        animate={{
          x: [0, 100, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 45,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <svg width="180" height="110" viewBox="0 0 180 110" className="opacity-10">
          <defs>
            <linearGradient id="cloud3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
            </linearGradient>
          </defs>
          <ellipse cx="45" cy="55" rx="32" ry="22" fill="url(#cloud3)" />
          <ellipse cx="75" cy="48" rx="38" ry="28" fill="url(#cloud3)" />
          <ellipse cx="105" cy="52" rx="32" ry="22" fill="url(#cloud3)" />
          <ellipse cx="130" cy="60" rx="28" ry="19" fill="url(#cloud3)" />
        </svg>
      </motion.div>

      {/* Small Floating Clouds */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 70 + 10}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 10,
          }}
        >
          <svg width="60" height="40" viewBox="0 0 60 40" className="opacity-5">
            <ellipse cx="15" cy="20" rx="12" ry="8" fill="rgba(255,255,255,0.6)" />
            <ellipse cx="30" cy="18" rx="15" ry="10" fill="rgba(255,255,255,0.6)" />
            <ellipse cx="45" cy="22" rx="12" ry="8" fill="rgba(255,255,255,0.6)" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
