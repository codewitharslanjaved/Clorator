"use client"

import { motion } from "framer-motion"

interface PremiumBackgroundProps {
  weatherCondition: string
  isNight: boolean
}

export function PremiumBackground({ weatherCondition, isNight }: PremiumBackgroundProps) {
  const getBackgroundElements = () => {
    if (isNight) {
      return (
        <>
          {/* Night Sky Gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
            animate={{
              background: [
                "linear-gradient(135deg, #0f172a 0%, #581c87 50%, #312e81 100%)",
                "linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #4338ca 100%)",
                "linear-gradient(135deg, #0f172a 0%, #581c87 50%, #312e81 100%)",
              ],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          {/* Aurora Effect */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(ellipse at 20% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
                "radial-gradient(ellipse at 80% 30%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
                "radial-gradient(ellipse at 40% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                "radial-gradient(ellipse at 20% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </>
      )
    }

    if (weatherCondition.includes("clear") || weatherCondition.includes("sunny")) {
      return (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500"
            animate={{
              background: [
                "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 50%, #6366f1 100%)",
                "linear-gradient(135deg, #93c5fd 0%, #3b82f6 50%, #4f46e5 100%)",
                "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 50%, #6366f1 100%)",
              ],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          {/* Sun Rays */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "conic-gradient(from 0deg at 70% 30%, rgba(251, 191, 36, 0.1) 0deg, transparent 60deg, transparent 300deg, rgba(251, 191, 36, 0.1) 360deg)",
                "conic-gradient(from 60deg at 70% 30%, rgba(251, 191, 36, 0.15) 0deg, transparent 60deg, transparent 300deg, rgba(251, 191, 36, 0.15) 360deg)",
                "conic-gradient(from 0deg at 70% 30%, rgba(251, 191, 36, 0.1) 0deg, transparent 60deg, transparent 300deg, rgba(251, 191, 36, 0.1) 360deg)",
              ],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </>
      )
    }

    if (weatherCondition.includes("rain")) {
      return (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-600 via-slate-700 to-gray-800"
          animate={{
            background: [
              "linear-gradient(135deg, #4b5563 0%, #334155 50%, #1f2937 100%)",
              "linear-gradient(135deg, #6b7280 0%, #475569 50%, #374151 100%)",
              "linear-gradient(135deg, #4b5563 0%, #334155 50%, #1f2937 100%)",
            ],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      )
    }

    if (weatherCondition.includes("cloud")) {
      return (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-400 via-slate-500 to-gray-600"
          animate={{
            background: [
              "linear-gradient(135deg, #9ca3af 0%, #64748b 50%, #4b5563 100%)",
              "linear-gradient(135deg, #d1d5db 0%, #94a3b8 50%, #64748b 100%)",
              "linear-gradient(135deg, #9ca3af 0%, #64748b 50%, #4b5563 100%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      )
    }

    return (
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600"
        animate={{
          background: [
            "linear-gradient(135deg, #38bdf8 0%, #3b82f6 50%, #4f46e5 100%)",
            "linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #4338ca 100%)",
            "linear-gradient(135deg, #38bdf8 0%, #3b82f6 50%, #4f46e5 100%)",
          ],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    )
  }

  return (
    <div className="fixed inset-0">
      {getBackgroundElements()}

      {/* Atmospheric Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10"
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Depth Layers */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 60%, rgba(255,255,255,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  )
}
