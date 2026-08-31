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
          <div className="w-full max-w-sm aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl">
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
        </div>
      )}
    </section>
  );
}
