"use client"

import { useState, useCallback } from "react"

interface Position {
  x: number
  y: number
}

const useRandomPosition = (initialPosition: Position) => {
  const [position, setPosition] = useState<Position>(initialPosition)
  const [hasMovedOnce, setHasMovedOnce] = useState(false)

  const updatePosition = useCallback(
    (containerLeft: number, containerTop: number, containerWidth: number, containerHeight: number) => {
      if (!hasMovedOnce) {
        setHasMovedOnce(true)
        return
      }

      let newX: number, newY: number
      let attempts = 0
      const maxAttempts = 20 // Prevent infinite loops
      const minDistance = 100 // Minimum movement distance to make it jump farther
      const maxDistance = 250 // Maximum movement distance for unpredictability

      do {
        // Generate a random angle for movement direction
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * (maxDistance - minDistance) + minDistance

        // Calculate new position based on angle and distance
        newX = position.x + Math.cos(angle) * distance
        newY = position.y + Math.sin(angle) * distance

        // Keep inside container bounds
        newX = Math.max(10, Math.min(containerWidth - 80, newX)) // 80 is estimated button width
        newY = Math.max(10, Math.min(containerHeight - 40, newY)) // 40 is estimated button height

        attempts++
      } while (attempts < maxAttempts)

      setPosition({ x: newX, y: newY })
    },
    [hasMovedOnce, position]
  )

  return { position, updatePosition }
}

export default useRandomPosition
