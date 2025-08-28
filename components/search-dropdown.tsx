"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Loader2 } from "lucide-react"

interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
}

interface SearchDropdownProps {
  onLocationSelect: (lat: number, lon: number, name: string) => void
  searchLocations: (query: string) => Promise<Location[]>
}

export function SearchDropdown({ onLocationSelect, searchLocations }: SearchDropdownProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Location[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    setLoading(true)
    try {
      const locations = await searchLocations(searchQuery)
      setResults(locations)
      setIsOpen(locations.length > 0)
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    handleSearch(value)
  }

  const handleLocationClick = (location: Location) => {
    const locationName = location.region
      ? `${location.name}, ${location.region}, ${location.country}`
      : `${location.name}, ${location.country}`
    setQuery(locationName)
    setIsOpen(false)
    onLocationSelect(location.lat, location.lon, locationName)
  }

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city..."
          className="w-full bg-transparent text-white placeholder:text-sky-200/60 border-none outline-none text-lg px-4 py-3"
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
        />
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Loader2 className="w-5 h-5 text-sky-200 animate-spin" />
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {results.map((location, index) => (
              <motion.button
                key={`${location.lat}-${location.lon}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => handleLocationClick(location)}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 text-white"
              >
                <MapPin className="w-4 h-4 text-sky-300 flex-shrink-0" />
                <span className="flex-1">
                  {location.name}
                  {location.region && `, ${location.region}`}, {location.country}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
