"use client" 

import { useState } from "react"
import ValentinesProposal from "./components/ValentinesProposal"
import dynamic from "next/dynamic";


const Flower = dynamic(() => import("./components/Flower"), { ssr: false });
const Heart = dynamic(() => import("./components/Heart"), { ssr: false });
export default function Home() {
  const [accepted, setAccepted] = useState(false)

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24 bg-pink-100 overflow-hidden">
      {accepted ? (
        <>
          <Flower />
          {/* Celebration Animation & Text */}
          <div className="text-4xl font-bold text-rose-900 text-center">
            <Heart/>
            <h1>Yay! See you! Happy Valentine&apos;s Day! </h1>
          </div>
        </>
      ) : (
        <ValentinesProposal onAccept={() => setAccepted(true)} />
      )}
    </main>
  )
}