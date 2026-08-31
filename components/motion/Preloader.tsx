"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("comatozze_loaded");
    if (hasLoadedBefore) {
      setIsRemoved(true);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            sessionStorage.setItem("comatozze_loaded", "true");
            setTimeout(() => setIsRemoved(true), 600);
          }, 150);
          return 100;
        }
        const jump = Math.floor(Math.random() * 15) + 10;
        return Math.min(prev + jump, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#FAF8F5] p-8 md:p-14 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isLoaded ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-hidden={isLoaded}
    >
      <div className="flex justify-between items-center text-[10px] tracking-[0.25em] text-[#7A7273] uppercase font-sans">
        <span>EDITORIAL PORTFOLIO</span>
        <span>2026 EDITION</span>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="font-editorial-serif text-3xl sm:text-5xl tracking-[0.2em] font-light text-[#191617]">
          COMATOZZE
        </h1>
        <p className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase">
          MODEL
        </p>
      </div>

      <div className="flex justify-between items-end border-t border-[#E8DFDC] pt-4">
        <div className="text-[10px] tracking-[0.25em] text-[#7A7273] font-sans uppercase">
          INITIALIZING VISUAL ARCHIVE
        </div>
        <div className="font-editorial-serif text-lg tracking-widest text-[#191617]">
          {progress.toString().padStart(2, "0")} <span className="text-xs text-[#C98A90]">/ 100</span>
        </div>
      </div>
    </div>
  );
}
