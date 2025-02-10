"use client"

import { useState, useCallback, useRef } from "react"
import { Player } from "@lottiefiles/react-lottie-player"

interface ValentinesProposalProps {
  onAccept: () => void
}

export default function ValentinesProposal({ onAccept }: ValentinesProposalProps) {
  const [noCount, setNoCount] = useState(0)
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number | null; y: number | null }>({ x: null, y: null })
  const buttonsContainerRef = useRef<HTMLDivElement>(null)
  const yesButtonRef = useRef<HTMLButtonElement>(null)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  const updateNoButtonPosition = useCallback(() => {
    if (buttonsContainerRef.current && yesButtonRef.current && noButtonRef.current) {
      const containerRect = buttonsContainerRef.current.getBoundingClientRect()
      const yesRect = yesButtonRef.current.getBoundingClientRect()
      const noRect = noButtonRef.current.getBoundingClientRect()

      let newX: number
      let newY: number
      let attempts = 0
      const maxAttempts = 20 // Prevent infinite loops

      do {
        newX = Math.random() * (containerRect.width - noRect.width)
        newY = Math.random() * (containerRect.height - noRect.height)
        attempts++
      } while (
        attempts < maxAttempts &&
        newX + noRect.width > yesRect.left - containerRect.left &&
        newX < yesRect.right - containerRect.left &&
        newY + noRect.height > yesRect.top - containerRect.top &&
        newY < yesRect.bottom - containerRect.top
      )

      setNoButtonPosition({ x: newX, y: newY })
    }
  }, [])

  const handleNoHover = useCallback(() => {
    updateNoButtonPosition()
  }, [updateNoButtonPosition])

  const handleNoClick = useCallback(() => {
    setNoCount((prev) => prev + 1)
    updateNoButtonPosition()
  }, [updateNoButtonPosition])

  const getNoButtonText = () => {
    const phrases = ["No", "Are you sure?", "Sure???","Really?", "Think again!","Sigurado ka?", "Last chance!"]
    return phrases[Math.min(noCount, phrases.length - 1)]
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <Player
        autoplay
        loop
        src="/enve.json"
        style={{ height: "300px", width: "300px" }}
      />
      <h1 className="text-3xl font-bold text-rose-900">Will you be my Valentine Wab?</h1>
      <div ref={buttonsContainerRef} className="relative w-80 h-24 flex justify-center items-center">
        <button
          ref={yesButtonRef}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700 transition-colors mr-2"
          onClick={onAccept}
        >
          Yes
        </button>
        <button
          ref={noButtonRef}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
          style={{
            position: noButtonPosition.x !== null ? "absolute" : "static",
            left: noButtonPosition.x !== null ? `${noButtonPosition.x}px` : "auto",
            top: noButtonPosition.y !== null ? `${noButtonPosition.y}px` : "auto",
            transition: "left 0.2s, top 0.2s",
          }}
          onClick={handleNoClick}
          onMouseEnter={handleNoHover}
        >
          {getNoButtonText()}
        </button>
      </div>
    </div>
  )
}
