"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface LoveReactButtonProps {
  videoId: string;
  initialLikes?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoveReactButton({
  videoId,
  initialLikes = 1420,
  size = "md",
  className = "",
}: LoveReactButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`comatozze_liked_${videoId}`);
      if (stored === "true") {
        setHasLiked(true);
      }
    } catch {}
  }, [videoId]);

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const nextState = !hasLiked;
    setHasLiked(nextState);
    setLikes((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    try {
      if (nextState) {
        localStorage.setItem(`comatozze_liked_${videoId}`, "true");
      } else {
        localStorage.removeItem(`comatozze_liked_${videoId}`);
      }

      await fetch("/api/videos/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId,
          action: nextState ? "like" : "unlike",
        }),
      });
    } catch {}
  };

  const formatCount = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const sizeClasses = {
    sm: "px-2.5 py-1 text-[11px] gap-1.5",
    md: "px-3.5 py-1.5 text-xs gap-2",
    lg: "px-5 py-2.5 text-sm gap-2.5",
  }[size];

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }[size];

  return (
    <button
      onClick={handleToggleLike}
      aria-label="Love react to this video"
      className={`inline-flex items-center justify-center font-sans font-medium rounded-full transition-all duration-300 select-none ${sizeClasses} ${
        hasLiked
          ? "bg-[#D85E78] text-white shadow-md shadow-[#D85E78]/30 scale-105"
          : "bg-[#191617]/75 hover:bg-[#191617] text-[#FAF8F5] border border-white/15 hover:border-[#D85E78]/60 backdrop-blur-sm"
      } ${className}`}
    >
      <Heart
        className={`${iconSizes} transition-transform duration-300 ${
          hasLiked ? "fill-white text-white scale-110" : "text-[#D85E78]"
        } ${animating ? "scale-130 animate-pulse" : ""}`}
      />
      <span className="tracking-wide">{formatCount(likes)}</span>
    </button>
  );
}
