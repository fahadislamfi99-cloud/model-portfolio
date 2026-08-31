"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const duration = 1100;
    const startTime = performance.now();

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const fraction = Math.min(elapsed / duration, 1);
      
      // Quartic ease out for fluid deceleration
      const eased = 1 - Math.pow(1 - fraction, 4);
      setProgress(Math.floor(eased * 100));

      if (fraction < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsRevealed(true);
          setTimeout(() => setIsRemoved(true), 750);
        }, 150);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-[#FAF8F5] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isRevealed ? "-translate-y-full opacity-90" : "translate-y-0 opacity-100"
      }`}
      aria-hidden={isRevealed}
    >
      <div className="flex flex-col items-center select-none">
        {/* Brandmark */}
        <h1 className="font-editorial-serif text-2xl sm:text-3xl tracking-[0.35em] text-[#191617] font-light uppercase pl-[0.35em]">
          Comatozze
        </h1>

        {/* Minimal Hairline Progress Indicator */}
        <div className="w-24 h-[1px] bg-[#E8DFDC] mt-5 mb-3 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[#D85E78] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Minimal Percentage Counter */}
        <span className="font-sans text-[9px] tracking-[0.25em] text-[#7A7273] font-light">
          {progress.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
