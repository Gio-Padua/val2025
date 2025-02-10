"use client"

import { useState } from "react"
import ValentinesProposal from "./components/ValentinesProposal"
import { Player } from "@lottiefiles/react-lottie-player"

export default function Home() {
  const [accepted, setAccepted] = useState(false)

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24 bg-pink-100 overflow-hidden">
      {accepted ? (
        <>
          {/* Background Flower Animations */}
          <Player
            autoplay
            loop
            src="/flowerExp.json"
            className="absolute top-10 left-10 w-40 h-40 opacity-80"
          />
            <Player
            autoplay
            loop
            src="/flowerExp.json"
            className="absolute top-80 left-20 w-40 h-40 opacity-80"
          />
          <Player
            autoplay
            loop
            src="/flowerExp.json"
            className="absolute bottom-10 left-10 w-40 h-40 opacity-80"
          />
          <Player
            autoplay
            loop
            src="/flowerExp.json"
            className="absolute bottom-10 right-10 w-40 h-40 opacity-80"
          />
          <Player
            autoplay
            loop
            src="/flowerExp.json"
            className="absolute top-10 right-10 w-40 h-40 opacity-80"
          />
          <Player
            autoplay
            loop
            src="/flowerExp.json"
            className="absolute top-10 left-70 w-40 h-40 opacity-80"
          />
           <Player
            autoplay
            loop
            src="/flowerExp.json"
            className="absolute top-20 left-1/4 w-40 h-40 opacity-80"
          />
          <Player
            autoplay
            loop
            src="/flowerExp.json"
            className="absolute top-1/4 right-10 w-32 h-32 opacity-80"
          />
          <Player
            autoplay
            loop
            src="/flowerExp.json"
            className="absolute bottom-10 left-1/3 w-36 h-36 opacity-80"
          />
          <Player
            autoplay
            loop
            src="/flowerExp.json"
            className="absolute bottom-10 left-2/3 w-36 h-36 opacity-80"
          />
          {/* Celebration Animation & Text */}
          <div className="text-4xl font-bold text-rose-900 text-center">
            <Player
              autoplay
              loop
              src="/explode.json"
              style={{ height: "300px", width: "300px" }}
            />
            <h1>Yay! See you! Happy Valentine&apos;s Day! </h1>
          </div>
        </>
      ) : (
        <ValentinesProposal onAccept={() => setAccepted(true)} />
      )}
    </main>
  )
}
