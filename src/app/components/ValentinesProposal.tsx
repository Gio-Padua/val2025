"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const Enve = dynamic(() => import("./Enve"), { ssr: false });

interface ValentinesProposalProps {
  onAccept: () => void;
}

const rejectionPhrases = [
  "No",
  "Are you sure?",
  "Think again!",
  "Give it a chance!",
  "Pretty please?",
  "Don't break my heart",
  "I'll keep asking!",
  "You know you want to!",
  "Last chance!",
  "Say yes!",
];

const encouragingMessages = [
  "I promise to make you smile every day!",
  "We could have amazing adventures together!",
  "You're the missing piece to my puzzle!",
  "My heart beats only for you!",
  "Together we'd be unstoppable!",
  "You're my favorite notification!",
];

export default function ValentinesProposal({ onAccept }: ValentinesProposalProps) {
  const [noCount, setNoCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number | null; y: number }>({ x: null, y: 0 });
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [encouragementIndex, setEncouragementIndex] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && buttonsContainerRef.current && yesButtonRef.current) {
      const containerRect = buttonsContainerRef.current.getBoundingClientRect();
      const yesRect = yesButtonRef.current.getBoundingClientRect();

      setNoButtonPosition({
        x: yesRect.left - containerRect.left + yesRect.width + 40,
        y: yesRect.top - containerRect.top,
      });
    }
  }, []);

  useEffect(() => {
    const newScale = 1 + noCount * 0.15;
    setYesScale(Math.min(newScale, 2));
  }, [noCount]);

  const getRandomPosition = useCallback(() => {
    if (buttonsContainerRef.current && yesButtonRef.current && noButtonRef.current) {
      const containerRect = buttonsContainerRef.current.getBoundingClientRect();
      const yesRect = yesButtonRef.current.getBoundingClientRect();
      const noRect = noButtonRef.current.getBoundingClientRect();

      const containerPadding = 20;
      const availableWidth = containerRect.width - noRect.width - containerPadding * 2;
      const availableHeight = containerRect.height - noRect.height - containerPadding * 2;

      let newX: number;
      let newY: number;
      let attempts = 0;
      const maxAttempts = 30;
      const minDistanceFromYes = 100;

      do {
        newX = Math.random() * availableWidth + containerPadding;
        newY = Math.random() * availableHeight + containerPadding;

        const yesCenterX = yesRect.left - containerRect.left + yesRect.width / 2;
        const yesCenterY = yesRect.top - containerRect.top + yesRect.height / 2;
        const noCenterX = newX + noRect.width / 2;
        const noCenterY = newY + noRect.height / 2;

        const distance = Math.sqrt(
          Math.pow(yesCenterX - noCenterX, 2) + Math.pow(yesCenterY - noCenterY, 2)
        );

        if (distance >= minDistanceFromYes || attempts > maxAttempts - 5) {
          break;
        }

        attempts++;
      } while (attempts < maxAttempts);

      setNoButtonPosition({ x: newX, y: newY });
    }
  }, []);

  const handleNoInteraction = useCallback(() => {
    setNoCount((prev) => {
      const newCount = prev + 1;
      
      if (newCount % 2 === 0 && newCount < encouragingMessages.length * 2) {
        setEncouragementIndex(Math.floor(newCount / 2) % encouragingMessages.length);
        setShowEncouragement(true);
        setTimeout(() => setShowEncouragement(false), 3000);
      }
      
      return newCount;
    });
    
    getRandomPosition();
  }, [getRandomPosition]);

  const getNoButtonText = () => {
    if (noCount < rejectionPhrases.length) {
      return rejectionPhrases[noCount];
    }
    return rejectionPhrases[rejectionPhrases.length - 1];
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in-up">
      <div className="relative">
        <Enve />
      </div>
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient animate-heart-beat">
          Will you be my Valentine?
        </h1>
        <p className="text-lg md:text-xl text-rose-700/80 font-medium">
          My heart is racing just asking...
        </p>
      </div>

      {showEncouragement && (
        <div className="glass-card px-6 py-3 rounded-full animate-bounce-in">
          <p className="text-rose-700 font-semibold text-center">
            {encouragingMessages[encouragementIndex]}
          </p>
        </div>
      )}

      <div 
        ref={buttonsContainerRef} 
        className="relative w-96 h-40 flex justify-center items-center"
      >
        <button
          ref={yesButtonRef}
          className="btn-yes px-8 py-4 text-white rounded-full font-bold text-lg animate-pulse-glow z-10"
          style={{
            transform: `scale(${yesScale})`,
            transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          }}
          onClick={onAccept}
        >
          Yes! 💝
        </button>

        {noButtonPosition.x !== null && (
          <button
            ref={noButtonRef}
            className="btn-no px-6 py-3 text-white rounded-full font-semibold text-base"
            style={{
              position: 'absolute',
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              zIndex: 20,
            }}
            onClick={handleNoInteraction}
            onMouseEnter={handleNoInteraction}
            onTouchStart={handleNoInteraction}
          >
            {getNoButtonText()}
          </button>
        )}
      </div>

      {noCount > 0 && (
        <p className="text-sm text-rose-500/60 italic">
          You've said no {noCount} time{noCount !== 1 ? 's' : ''}... but I'm persistent! 💪
        </p>
      )}
    </div>
  );
}
