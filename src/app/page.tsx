"use client" 

import { useState, useEffect } from "react"
import dynamic from "next/dynamic";
import FloatingHearts from "./components/FloatingHearts"

const ValentinesProposal = dynamic(() => import("./components/ValentinesProposal"), { ssr: false });
const Flower = dynamic(() => import("./components/Flower"), { ssr: false });
const Heart = dynamic(() => import("./components/Heart"), { ssr: false });
const Celebration = dynamic(() => import("./components/Celebration"), { ssr: false });

export default function Home() {
  const [accepted, setAccepted] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(true)
  }, [])

  if (!showContent) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200">
        <div className="w-12 h-12 border-4 border-rose-300 border-t-rose-500 rounded-full animate-spin" />
      </main>
    )
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 w-full max-w-4xl">
        {accepted ? (
          <div className="animate-fade-in-up">
            <Celebration />
            <div className="text-center space-y-6 mt-8">
              <div className="glass-card p-8 rounded-3xl inline-block">
                <Heart/>
                <h1 className="text-3xl md:text-5xl font-bold text-gradient mt-4">
                  Yay! You said YES! 💕
                </h1>
                <p className="text-xl text-rose-700 mt-4">
                  Happy Valentine's Day! 🌹
                </p>
                <p className="text-lg text-rose-600/80 mt-2">
                  You've made me the happiest person alive!
                </p>
              </div>
            </div>
            <Flower />
          </div>
        ) : (
          <ValentinesProposal onAccept={() => setAccepted(true)} />
        )}
      </div>
    </main>
  )
}
