'use client'

import { Player } from "@lottiefiles/react-lottie-player"

export default function FlowerAnimations() {
  return (
    <>
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

    </>
  )
}