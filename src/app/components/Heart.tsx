'use client'

import { Player } from "@lottiefiles/react-lottie-player"

export default function HeartAnimations() {
  return (
    <>
     <Player
              autoplay
              loop
              src="/explode.json"
              style={{ height: "300px", width: "300px" }}
            />

    </>
  )
}