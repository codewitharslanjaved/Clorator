"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

export function OptimizedClouds() {
  // Memoize cloud data to prevent re-creation
  const cloudData = useMemo(
    () => [
      {
        id: 1,
        width: 200,
        height: 120,
        top: "10%",
        left: "-10%",
        opacity: 0.1,
        duration: 40,
      },
      {
        id: 2,
        width: 160,
        height: 100,
        top: "25%",
        right: "10%",
        opacity: 0.08,
        duration: 35,
      },
      {
        id: 3,
        width: 140,
        height: 90,
        top: "40%",
        left: "20%",
        opacity: 0.06,
        duration: 45,
      },
    ],
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cloudData.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            top: cloud.top,
            left: cloud.left,
            right: cloud.right,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <svg width={cloud.width} height={cloud.height} viewBox={`0 0 ${cloud.width} ${cloud.height}`}>
            <defs>
              <linearGradient id={`cloud-gradient-${cloud.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={`rgba(255,255,255,${cloud.opacity})`} />
                <stop offset="100%" stopColor={`rgba(255,255,255,${cloud.opacity * 0.3})`} />
              </linearGradient>
            </defs>
            <ellipse
              cx={cloud.width * 0.25}
              cy={cloud.height * 0.5}
              rx={cloud.width * 0.15}
              ry={cloud.height * 0.2}
              fill={`url(#cloud-gradient-${cloud.id})`}
            />
            <ellipse
              cx={cloud.width * 0.45}
              cy={cloud.height * 0.4}
              rx={cloud.width * 0.18}
              ry={cloud.height * 0.25}
              fill={`url(#cloud-gradient-${cloud.id})`}
            />
            <ellipse
              cx={cloud.width * 0.65}
              cy={cloud.height * 0.5}
              rx={cloud.width * 0.15}
              ry={cloud.height * 0.2}
              fill={`url(#cloud-gradient-${cloud.id})`}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
