'use client'

import { Player } from "@lottiefiles/react-lottie-player"

export default function EnveAni() {
  return (
    <>
         <Player autoplay loop src="/enve.json" style={{ height: "300px", width: "300px" }} />


    </>
  )
}