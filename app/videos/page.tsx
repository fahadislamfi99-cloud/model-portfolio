"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X, ArrowUpRight, Film, Smartphone } from "lucide-react";
import { videosData, VideoItem } from "@/data/videos";

interface UnifiedVideo {
  id: string;
  slug?: string;
  title: string;
  category: string;
  year?: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  format?: "reel" | "widescreen";
  telegramUrl?: string;
  description: string;
}

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<UnifiedVideo | null>(null);
  const [filter, setFilter] = useState<"all" | "reel" | "widescreen">("all");
  const [dbVideos, setDbVideos] = useState<UnifiedVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/videos")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.videos && data.videos.length > 0) {
          const formatted: UnifiedVideo[] = data.videos.map(
            (v: {
              _id: string;
              title: string;
              category: string;
              duration: string;
              thumbnail: string;
              videoUrl: string;
              format: "reel" | "widescreen";
              telegramUrl?: string;
              description: string;
            }) => ({
              id: v._id,
              slug: v._id,
              title: v.title,
              category: v.category || (v.format === "reel" ? "FASHION REEL" : "WIDESCREEN FEATURE"),
              year: "2026",
              duration: v.duration,
              thumbnail: v.thumbnail || "/images/model/comatozze-pool-sunset-1.png",
              videoUrl: v.videoUrl,
              format: v.format || (v.videoUrl.includes("reel") ? "reel" : "widescreen"),
              telegramUrl: v.telegramUrl || "https://t.me/comatozze_new",
              description: v.description,
            })
          );
          setDbVideos(formatted);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Merge static videosData with database uploaded videos, avoiding duplicate titles
  const staticUnified: UnifiedVideo[] = videosData.map((v) => ({
    id: v.slug,
    slug: v.slug,
    title: v.title,
    category: v.category,
    year: v.year,
    duration: v.duration,
    thumbnail: v.thumbnail || "/images/model/comatozze-pool-sunset-1.png",
    videoUrl: v.videoUrl,
    format: v.category.includes("REEL") ? "reel" : "widescreen",
    telegramUrl: "https://t.me/comatozze_new",
    description: v.description,
  }));

  // Combine DB videos first, followed by static archive
  const existingTitles = new Set(dbVideos.map((v) => v.title.toLowerCase().trim()));
  const allVideos: UnifiedVideo[] = [
    ...dbVideos,
    ...staticUnified.filter((v) => !existingTitles.has(v.title.toLowerCase().trim())),
  ];

  const displayedVideos = allVideos.filter((v) => {
    if (filter === "all") return true;
    return v.format === filter;
  });

  return (
    <div className="pt-32 pb-24 md:pb-36 bg-[#FAF8F5]">
      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Page Header */}
        <div className="border-b border-[#E8DFDC] pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
              CINEMATIC ARCHIVE & MOTION
            </span>
            <h1 className="font-editorial-serif text-5xl sm:text-7xl lg:text-8xl text-[#191617] font-light mt-3 tracking-wide">
              Comatozze <span className="italic">Videos</span>
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#7A7273] mt-4 max-w-xl">
              Official video archive: vertical 9:16 reels, widescreen features, and direct uncut links on Telegram.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 bg-[#EFE8E6] p-1.5 rounded-full self-start md:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider font-medium transition-all ${
                filter === "all"
                  ? "bg-[#191617] text-white shadow-xs"
                  : "text-[#7A7273] hover:text-[#191617]"
              }`}
            >
              All ({allVideos.length})
            </button>
            <button
              onClick={() => setFilter("reel")}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider font-medium transition-all ${
                filter === "reel"
                  ? "bg-[#191617] text-white shadow-xs"
                  : "text-[#7A7273] hover:text-[#191617]"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Reels ({allVideos.filter((v) => v.format === "reel").length})</span>
            </button>
            <button
              onClick={() => setFilter("widescreen")}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider font-medium transition-all ${
                filter === "widescreen"
                  ? "bg-[#191617] text-white shadow-xs"
                  : "text-[#7A7273] hover:text-[#191617]"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Widescreen ({allVideos.filter((v) => v.format === "widescreen").length})</span>
            </button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {displayedVideos.map((video) => (
            <article key={video.id} className="group flex flex-col justify-between space-y-4">
              <div
                onClick={() => setActiveVideo(video)}
                className={`relative w-full overflow-hidden bg-[#191617] border border-[#E8DFDC] cursor-pointer shadow-xs ${
                  video.format === "reel" ? "aspect-[9/16] max-h-[480px] mx-auto" : "aspect-video"
                }`}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    // Fallback to pool sunset if thumbnail fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/model/comatozze-pool-sunset-1.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191617]/70 via-transparent to-transparent" />

                {/* Format Badge */}
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#D85E78] text-white text-[9px] font-sans uppercase tracking-wider rounded">
                  {video.format === "reel" ? "9:16 Reel" : "16:9 Long"}
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#191617]/80 text-[#FAF8F5] text-[10px] tracking-wider font-sans uppercase backdrop-blur-sm">
                  {video.duration}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5]/90 backdrop-blur-sm flex items-center justify-center border border-[#FAF8F5] shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 text-[#191617] ml-0.5" fill="#191617" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5 flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] tracking-[0.25em] font-sans uppercase text-[#C98A90]">
                    <span>{video.category}</span>
                    <span>{video.year || "2026"}</span>
                  </div>
                  <h2
                    onClick={() => setActiveVideo(video)}
                    className="font-editorial-serif text-2xl text-[#191617] group-hover:text-[#D85E78] transition-colors cursor-pointer leading-snug mt-1"
                  >
                    {video.title}
                  </h2>
                  <p className="text-xs text-[#7A7273] font-sans leading-relaxed line-clamp-2 mt-1">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8DFDC] flex justify-between items-center">
                  <button
                    onClick={() => setActiveVideo(video)}
                    className="inline-flex items-center space-x-1 text-[11px] tracking-[0.2em] font-sans uppercase text-[#191617] hover:text-[#D85E78] transition-colors font-medium"
                  >
                    <span>PLAY VIDEO</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={video.telegramUrl || "https://t.me/comatozze_new"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-sans text-[#229ED9] hover:underline"
                  >
                    Telegram Full Cut →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Video Modal Player with Telegram CTA */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#191617]/95 p-4 md:p-10 backdrop-blur-md"
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 p-3 text-[#FAF8F5] hover:text-[#C98A90] transition-colors"
            aria-label="Close video player"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className={`w-full bg-black overflow-hidden shadow-2xl border border-white/10 flex flex-col items-center ${
              activeVideo.format === "reel"
                ? "max-w-sm aspect-[9/16]"
                : "max-w-5xl aspect-video"
            }`}
          >
            <video
              src={activeVideo.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>

            {/* Telegram Full Video Link Button */}
            <div className="w-full p-4 bg-[#191617] border-t border-white/10 text-center">
              <a
                href={activeVideo.telegramUrl || "https://t.me/comatozze_new"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 bg-[#229ED9] hover:bg-[#1E88BE] text-white font-sans text-xs tracking-wider uppercase font-semibold rounded shadow transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
                <span>WATCH FULL VIDEO ON TELEGRAM</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
