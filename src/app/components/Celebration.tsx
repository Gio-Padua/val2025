"use client";

import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
}

export default function Celebration() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const colors = [
      "#e11d48",
      "#fb7185",
      "#fbbf24",
      "#f472b6",
      "#a78bfa",
      "#34d399",
    ];
    const newConfetti: ConfettiPiece[] = [];

    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
      });
    }
    setConfetti(newConfetti);

    const loveEmojis = [
      "💕",
      "💖",
      "💗",
      "💓",
      "💝",
      "🌹",
      "✨",
      "🎉",
      "💘",
      "🥰",
    ];
    const newEmojis: FloatingEmoji[] = [];

    for (let i = 0; i < 15; i++) {
      newEmojis.push({
        id: i,
        emoji: loveEmojis[Math.floor(Math.random() * loveEmojis.length)],
        x: Math.random() * 90 + 5,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
      });
    }
    setEmojis(newEmojis);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-float"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}

      {emojis.map((item) => (
        <div
          key={item.id}
          className="absolute text-4xl animate-float-up"
          style={{
            left: `${item.x}%`,
            bottom: "0",
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}
