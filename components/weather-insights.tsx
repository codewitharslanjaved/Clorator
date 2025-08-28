"use client"

import { motion } from "framer-motion"
import { Lightbulb, Shirt, Umbrella, GlassesIcon as Sunglasses, Wind, Droplets } from "lucide-react"
import { GlassCard } from "./glass-card"

interface WeatherInsightsProps {
  temperature: number
  humidity: number
  uvIndex: number
  windSpeed: number
  chanceOfRain: number
  condition: string
}

export function WeatherInsights({
  temperature,
  humidity,
  uvIndex,
  windSpeed,
  chanceOfRain,
  condition,
}: WeatherInsightsProps) {
  const getInsights = () => {
    const insights = []

    // Temperature-based insights
    if (temperature < 10) {
      insights.push({
        icon: Shirt,
        title: "Dress Warmly",
        description: "Layer up with warm clothing",
        color: "text-blue-300",
      })
    } else if (temperature > 25) {
      insights.push({
        icon: Shirt,
        title: "Light Clothing",
        description: "Perfect for light, breathable fabrics",
        color: "text-orange-300",
      })
    }

    // UV Index insights
    if (uvIndex > 6) {
      insights.push({
        icon: Sunglasses,
        title: "UV Protection",
        description: "Wear sunscreen and sunglasses",
        color: "text-yellow-300",
      })
    }

    // Rain insights
    if (chanceOfRain > 50) {
      insights.push({
        icon: Umbrella,
        title: "Bring Umbrella",
        description: "High chance of precipitation",
        color: "text-blue-300",
      })
    }

    // Wind insights
    if (windSpeed > 20) {
      insights.push({
        icon: Wind,
        title: "Windy Conditions",
        description: "Secure loose items outdoors",
        color: "text-green-300",
      })
    }

    // Humidity insights
    if (humidity > 80) {
      insights.push({
        icon: Droplets,
        title: "High Humidity",
        description: "May feel warmer than actual temperature",
        color: "text-cyan-300",
      })
    }

    return insights.slice(0, 3) // Limit to 3 insights for performance
  }

  const insights = getInsights()

  if (insights.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mb-8"
    >
      <h3 className="text-xl font-light text-white mb-4 flex items-center">
        <Lightbulb className="w-5 h-5 mr-2 text-yellow-300" />
        Weather Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
          >
            <GlassCard className="p-4">
              <div className="flex items-start space-x-3">
                <insight.icon className={`w-5 h-5 ${insight.color} flex-shrink-0 mt-0.5`} />
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">{insight.title}</h4>
                  <p className="text-white/70 text-xs font-light">{insight.description}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
