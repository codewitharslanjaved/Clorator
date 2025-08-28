"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Snowflake, Wind, Thermometer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "./glass-card"

interface SnowControlsProps {
  onIntensityChange: (intensity: "light" | "moderate" | "heavy") => void
  currentIntensity: "light" | "moderate" | "heavy"
}

export function SnowControls({ onIntensityChange, currentIntensity }: SnowControlsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const intensityOptions = [
    { value: "light", label: "Light Snow", icon: Snowflake, particles: 30 },
    { value: "moderate", label: "Moderate Snow", icon: Wind, particles: 60 },
    { value: "heavy", label: "Heavy Snow", icon: Thermometer, particles: 100 },
  ] as const

  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className="p-2" hover={false}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm transition-all duration-300"
            size="sm"
          >
            <Snowflake className="w-4 h-4 mr-2" />
            Snow
          </Button>
        </motion.div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 min-w-48"
          >
            <GlassCard className="p-3" hover={false}>
              <div className="space-y-2">
                <p className="text-white/80 text-sm font-light mb-3">Snow Intensity</p>
                {intensityOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => {
                      onIntensityChange(option.value)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 p-2 rounded-xl transition-all duration-200 ${
                      currentIntensity === option.value
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <option.icon className="w-4 h-4" />
                    <span className="text-sm">{option.label}</span>
                    <span className="text-xs text-white/50 ml-auto">{option.particles}</span>
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </GlassCard>
    </motion.div>
  )
}
