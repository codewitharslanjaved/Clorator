import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle, Cloudy } from "lucide-react"

interface WeatherIconProps {
  condition: string
  code?: number
  size?: number
  className?: string
}

export function WeatherIcon({ condition, code, size = 24, className = "" }: WeatherIconProps) {
  const iconProps = { size, className }

  // WeatherAPI.com condition codes
  if (code) {
    switch (code) {
      case 1000: // Sunny/Clear
        return <Sun {...iconProps} />
      case 1003: // Partly cloudy
      case 1006: // Cloudy
      case 1009: // Overcast
        return <Cloud {...iconProps} />
      case 1030: // Mist
      case 1135: // Fog
      case 1147: // Freezing fog
        return <Cloudy {...iconProps} />
      case 1063: // Patchy rain possible
      case 1180: // Light rain
      case 1183: // Light rain
      case 1186: // Moderate rain at times
      case 1189: // Moderate rain
      case 1192: // Heavy rain at times
      case 1195: // Heavy rain
      case 1240: // Light rain shower
      case 1243: // Moderate or heavy rain shower
      case 1246: // Torrential rain shower
        return <CloudRain {...iconProps} />
      case 1150: // Patchy light drizzle
      case 1153: // Light drizzle
      case 1168: // Freezing drizzle
      case 1171: // Heavy freezing drizzle
        return <CloudDrizzle {...iconProps} />
      case 1066: // Patchy snow possible
      case 1210: // Patchy light snow
      case 1213: // Light snow
      case 1216: // Patchy moderate snow
      case 1219: // Moderate snow
      case 1222: // Patchy heavy snow
      case 1225: // Heavy snow
      case 1255: // Light snow showers
      case 1258: // Moderate or heavy snow showers
        return <CloudSnow {...iconProps} />
      case 1087: // Thundery outbreaks possible
      case 1273: // Patchy light rain with thunder
      case 1276: // Moderate or heavy rain with thunder
      case 1279: // Patchy light snow with thunder
      case 1282: // Moderate or heavy snow with thunder
        return <Zap {...iconProps} />
      default:
        return <Sun {...iconProps} />
    }
  }

  // Fallback to text-based matching
  const conditionLower = condition.toLowerCase()
  if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
    return <Sun {...iconProps} />
  } else if (conditionLower.includes("cloud")) {
    return <Cloud {...iconProps} />
  } else if (conditionLower.includes("rain")) {
    return <CloudRain {...iconProps} />
  } else if (conditionLower.includes("drizzle")) {
    return <CloudDrizzle {...iconProps} />
  } else if (conditionLower.includes("snow")) {
    return <CloudSnow {...iconProps} />
  } else if (conditionLower.includes("thunder") || conditionLower.includes("storm")) {
    return <Zap {...iconProps} />
  } else if (conditionLower.includes("mist") || conditionLower.includes("fog")) {
    return <Cloudy {...iconProps} />
  }

  return <Sun {...iconProps} />
}
