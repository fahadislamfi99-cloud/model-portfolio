"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ArrowRight } from "lucide-react";

interface LongVideo {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  description: string;
  telegramUrl?: string;
}

const fallbackLongVideos: LongVideo[] = [
  {
    id: "lv-1",
    title: "Comatozze Signature Feature 01",
    category: "EXCLUSIVE WIDESCREEN EDITORIAL",
    duration: "15:42",
    videoUrl: "/long_video/video-1.mp4",
    thumbnail: "/images/model/comatozze-pool-sunset-1.png",
    description: "Cinematic 16:9 widescreen showcase highlighting fluid motion, mood, and natural light.",
    telegramUrl: "https://t.me/comatozze_new",
  },
  {
    id: "lv-2",
    title: "Comatozze Signature Feature 02",
    category: "ATMOSPHERIC MOTION STUDY",
    duration: "21:18",
    videoUrl: "/long_video/video-2.mp4",
    thumbnail: "/images/model/comatozze-pool-sunset-2.png",
    description: "Intimate long-form production exploring artistic framing, authentic presence, and relaxed poise.",
    telegramUrl: "https://t.me/comatozze_new",
  },
];

export function LongVideoSection() {
  const [activeVideo, setActiveVideo] = useState<LongVideo | null>(null);
  const [videos, setVideos] = useState<LongVideo[]>(fallbackLongVideos);

  useEffect(() => {
    fetch("/api/admin/videos?format=widescreen")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.videos && data.videos.length > 0) {
          setVideos(data.videos);
        }
      })
      .catch(() => {
        // Fallback safely preserved
      });
  }, []);

  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#EFE8E6]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-[#D85E78] font-sans font-semibold uppercase block mb-1">
              CINEMATIC WIDESCREEN
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl text-[#1A1718] font-normal">
              Comatozze Latest Video
            </h2>
          </div>
          <Link
            href="/videos"
            className="inline-flex items-center space-x-1 text-[10px] tracking-[0.2em] font-sans font-semibold uppercase text-[#D85E78] hover:text-[#C24B65] mt-4 sm:mt-0"
          >
            <span>BROWSE ALL VIDEOS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 16:9 Widescreen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((item, idx) => (
            <div key={item._id || item.id || idx} className="group block">
              <div
                onClick={() => setActiveVideo(item)}
                className="relative aspect-video w-full overflow-hidden bg-[#1A1718] rounded-sm mb-4 cursor-pointer shadow-md border border-[#EFE8E6]"
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/70 backdrop-blur-xs text-[10px] tracking-wider font-sans text-white">
                  {item.duration}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border border-white/90 flex items-center justify-center bg-black/40 backdrop-blur-xs transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] tracking-[0.25em] font-sans uppercase text-[#D85E78] font-semibold block">
                  {item.category}
                </span>
                <h3
                  onClick={() => setActiveVideo(item)}
                  className="font-editorial-serif text-2xl text-[#1A1718] group-hover:text-[#D85E78] transition-colors cursor-pointer"
                >
                  {item.title}
                </h3>
                <p className="text-xs text-[#7A7273] font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player (16:9 Widescreen) */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 p-3 text-white hover:text-[#D85E78] transition-colors"
            aria-label="Close video player"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-5xl flex flex-col items-center">
            <div className="w-full aspect-video bg-black rounded-md overflow-hidden shadow-2xl border border-white/10">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Telegram Link Below Video */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full px-2 gap-3 text-center sm:text-left">
              <div>
                <span className="text-white text-sm font-editorial-serif tracking-wide block">
                  {activeVideo.title}
                </span>
                <span className="text-[11px] text-[#A09899] font-sans">
                  Watch uncut scene, high bitrate and daily releases
                </span>
              </div>
              <a
                href={activeVideo.telegramUrl || "https://t.me/comatozze_new"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#229ED9] hover:bg-[#1E88BE] text-white font-sans text-xs tracking-wider uppercase font-semibold rounded shadow-md transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
                <span>FULL VIDEO ON TELEGRAM</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
