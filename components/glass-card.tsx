"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={hover ? { scale: 1.02, y: -8 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Main glass background */}
      <motion.div
        className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20"
        animate={{
          background: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.15)", "rgba(255,255,255,0.1)"],
          borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.2)"],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        animate={{
          boxShadow: [
            "0 8px 32px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
            "0 8px 32px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
            "0 8px 32px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
