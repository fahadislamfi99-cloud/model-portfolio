"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ArrowUpRight, Eye } from "lucide-react";
import { LoveReactButton } from "@/components/videos/LoveReactButton";
import { UnifiedVideo } from "@/lib/videos";

interface VideoPlayerModalProps {
  video: UnifiedVideo | null;
  onClose: () => void;
}

export function VideoPlayerModal({ video, onClose }: VideoPlayerModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (video) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  const isReel = video.format === "reel";

  const formatViews = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 sm:p-6 md:p-8 backdrop-blur-xl animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full bg-[#121011] border border-white/15 rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto transition-all ${
          isReel
            ? "max-w-[420px] max-h-[92vh]"
            : "max-w-4xl max-h-[92vh]"
        }`}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#191617] shrink-0">
          <div className="flex items-center space-x-2 min-w-0 pr-2">
            <span
              className={`px-2 py-0.5 text-[9px] font-sans uppercase tracking-wider rounded font-medium shrink-0 ${
                isReel ? "bg-[#D85E78] text-white" : "bg-[#FAF8F5]/20 text-[#FAF8F5]"
              }`}
            >
              {isReel ? "9:16 Reel" : "16:9 Long Video"}
            </span>
            <span className="text-[10px] text-[#A09899] font-sans uppercase tracking-widest truncate hidden sm:inline-block">
              {video.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#FAF8F5]/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div
          className={`relative w-full bg-black flex items-center justify-center shrink-0 ${
            isReel ? "aspect-[9/16] max-h-[56vh]" : "aspect-video"
          }`}
        >
          <video
            src={video.videoUrl}
            poster={video.thumbnail}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Modal Footer / Permanent Action Center */}
        <div className="p-4 sm:p-5 bg-[#141213] border-t border-white/10 flex flex-col space-y-3 shrink-0 overflow-y-auto">
          {/* Title & Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h2 className="font-editorial-serif text-lg sm:text-xl text-[#FAF8F5] leading-snug tracking-wide truncate">
                {video.title}
              </h2>
              <p className="text-xs font-sans text-[#A09899] mt-1 line-clamp-2 leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* Live Love React & Views */}
            <div className="flex items-center space-x-2 shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#FAF8F5] font-sans">
                <Eye className="w-3.5 h-3.5 text-[#A09899]" />
                <span>{formatViews(video.views)}</span>
              </div>
              <LoveReactButton videoId={video.id} initialLikes={video.likes} size="sm" />
            </div>
          </div>

          {/* Action Row: Dedicated Page Link + Prominent Telegram Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2.5 border-t border-white/10">
            <Link
              href={`/videos/${video.slug}`}
              onClick={onClose}
              className="inline-flex items-center space-x-1.5 text-[11px] tracking-[0.2em] font-sans uppercase text-[#D85E78] hover:text-white transition-colors font-medium self-start sm:self-auto"
            >
              <span>OPEN FULL PAGE & DETAILS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Permanent Telegram Link Button */}
            <a
              href={video.telegramUrl || "https://t.me/comatozze_new"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#229ED9] hover:bg-[#1E88BE] text-white font-sans text-xs tracking-wider uppercase font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02]"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
              <span>WATCH FULL UNCUT VIDEO ON TELEGRAM</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
