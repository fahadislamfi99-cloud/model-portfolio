"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, X } from "lucide-react";

const reels = [
  {
    title: "Editorial Motion & Silhouette",
    category: "FASHION REEL",
    duration: "00:30",
    thumbnail: "/images/model/comatozze-saree-gold.jpg",
    videoUrl: "/videos/comatozze-reel-1.mp4",
  },
  {
    title: "Golden Hour Atmosphere",
    category: "SUMMER REEL",
    duration: "00:24",
    thumbnail: "/images/model/comatozze-pool-sunset-2.png",
    videoUrl: "/videos/comatozze-reel-2.mp4",
  },
  {
    title: "Behind The Scenes & Styling",
    category: "BTS REEL",
    duration: "00:45",
    thumbnail: "/images/model/image-6-lace-bodysuit.jpg",
    videoUrl: "/videos/comatozze-reel-3.mp4",
  },
];

export function LatestVideos() {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#EFE8E6]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-[#D85E78] font-sans font-semibold uppercase block mb-1">
              SHORT VIDEOS & REELS
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl text-[#1A1718] font-normal">
              Behind The Lens
            </h2>
          </div>
          <Link
            href="/videos"
            className="inline-flex items-center space-x-1 text-[10px] tracking-[0.2em] font-sans font-semibold uppercase text-[#D85E78] hover:text-[#C24B65]"
          >
            <span>VIEW ALL REELS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3-Column Reels Grid (9:16 Portrait Reel aspect ratio) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {reels.map((vid, idx) => (
            <div key={idx} className="group block">
              <div
                onClick={() => setActiveUrl(vid.videoUrl)}
                className="relative aspect-[9/16] w-full overflow-hidden bg-[#1A1718] rounded-sm mb-3 cursor-pointer shadow-sm"
              >
                <Image
                  src={vid.thumbnail}
                  alt={vid.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Duration Badge Top Right */}
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-[10px] font-sans text-white">
                  {vid.duration}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-white/90 flex items-center justify-center bg-black/40 backdrop-blur-xs transform group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                  </div>
                </div>
              </div>

              <h3
                onClick={() => setActiveUrl(vid.videoUrl)}
                className="font-editorial-serif text-xl text-[#1A1718] group-hover:text-[#D85E78] transition-colors cursor-pointer"
              >
                {vid.title}
              </h3>
              <p className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#7A7273] mt-1">
                {vid.category}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reel Video Modal (9:16 format) */}
      {activeUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={() => setActiveUrl(null)}
            className="absolute top-6 right-6 p-2 text-white hover:text-[#D85E78]"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-sm flex flex-col items-center">
            <div className="w-full aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl">
              <video
                src={activeUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              >
                Video not supported
              </video>
            </div>

            {/* Telegram Link Below Reel */}
            <div className="mt-3 w-full text-center">
              <a
                href="https://t.me/comatozze_new"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#229ED9] hover:bg-[#1E88BE] text-white font-sans text-xs tracking-wider uppercase font-semibold rounded shadow-md transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
                <span>WATCH FULL VIDEO ON TELEGRAM</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
