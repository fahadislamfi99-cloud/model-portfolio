"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, ArrowUpRight, Eye } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { LoveReactButton } from "@/components/videos/LoveReactButton";
import { VideoPlayerModal } from "@/components/videos/VideoPlayerModal";
import { UnifiedVideo, getBaselineStats, slugify } from "@/lib/videos";

const fallbackLongVideos: UnifiedVideo[] = [
  {
    id: "lv-1",
    slug: "comatozze-signature-feature-01",
    title: "Comatozze Signature Feature 01",
    category: "EXCLUSIVE WIDESCREEN EDITORIAL",
    year: "2026",
    duration: "15:42",
    videoUrl: "/long_video/video-1.mp4",
    thumbnail: "/images/model/comatozze-pool-sunset-1.png",
    format: "widescreen",
    description: "Cinematic 16:9 widescreen showcase highlighting fluid motion, mood, and natural light.",
    telegramUrl: "https://t.me/comatozze_new",
    views: 34200,
    likes: 4180,
    order: 0,
  },
  {
    id: "lv-2",
    slug: "comatozze-signature-feature-02",
    title: "Comatozze Signature Feature 02",
    category: "ATMOSPHERIC MOTION STUDY",
    year: "2026",
    duration: "21:18",
    videoUrl: "/long_video/video-2.mp4",
    thumbnail: "/images/model/comatozze-pool-sunset-2.png",
    format: "widescreen",
    description: "Intimate long-form production exploring artistic framing, authentic presence, and relaxed poise.",
    telegramUrl: "https://t.me/comatozze_new",
    views: 48900,
    likes: 5620,
    order: 1,
  },
];

export function LongVideoSection() {
  const [activeVideo, setActiveVideo] = useState<UnifiedVideo | null>(null);
  const [videos, setVideos] = useState<UnifiedVideo[]>(fallbackLongVideos);

  useEffect(() => {
    fetch("/api/admin/videos?format=widescreen")
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
              order?: number;
              views?: number;
              likes?: number;
            }, idx: number) => {
              const stats = getBaselineStats(v._id, true);
              return {
                id: v._id,
                slug: slugify(v.title || `video-${v._id}`),
                title: v.title,
                category: v.category || "WIDESCREEN FEATURE",
                year: "2026",
                duration: v.duration || "15:42",
                thumbnail: v.thumbnail || "/images/model/comatozze-pool-sunset-1.png",
                videoUrl: v.videoUrl,
                format: "widescreen",
                telegramUrl: v.telegramUrl || "https://t.me/comatozze_new",
                description: v.description,
                views: stats.views + (v.views || 0),
                likes: stats.likes + (v.likes || 0),
                order: v.order !== undefined ? v.order : idx,
              };
            }
          );
          setVideos(formatted);
        }
      })
      .catch(() => {});
  }, []);

  const formatViews = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <section className="py-24 bg-[#FAF8F5] border-t border-[#EFE8E6]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#EFE8E6] pb-8 gap-4">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-[#D85E78] font-sans uppercase font-medium">
                CINEMATIC MOTION ARCHIVE
              </span>
              <h2 className="font-editorial-serif text-4xl sm:text-5xl text-[#1A1718] font-light mt-2 tracking-wide">
                Comatozze <span className="italic">Latest Videos</span>
              </h2>
              <p className="text-xs font-sans text-[#7A7273] mt-2 max-w-xl">
                Exclusive 16:9 cinematic features with uncut scenes on Telegram.
              </p>
            </div>
            <Link
              href="/videos"
              className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase text-[#1A1718] hover:text-[#D85E78] transition-colors group"
            >
              <span>Explore All Videos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* 2-Column Responsive Widescreen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {videos.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 150}>
              <div className="group flex flex-col justify-between space-y-4 h-full">
                {/* Widescreen 16:9 Video Box */}
                <div
                  onClick={() => setActiveVideo(item)}
                  className="relative aspect-video w-full overflow-hidden bg-[#1A1718] rounded-sm cursor-pointer shadow-sm border border-[#EFE8E6]"
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/model/comatozze-pool-sunset-1.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191617]/70 via-transparent to-transparent" />

                  {/* Format & Fake Duration Badges */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#191617] text-white border border-[#D85E78]/50 text-[9px] font-sans uppercase tracking-wider rounded">
                    16:9 Widescreen
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/75 backdrop-blur-xs text-[10px] tracking-wider font-sans text-white rounded">
                    {item.duration}
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border border-white/90 flex items-center justify-center bg-black/40 backdrop-blur-xs transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[9px] tracking-[0.25em] font-sans uppercase text-[#D85E78] font-semibold">
                      <span>{item.category}</span>
                      <span>2026</span>
                    </div>
                    <h3
                      onClick={() => setActiveVideo(item)}
                      className="font-editorial-serif text-2xl text-[#1A1718] group-hover:text-[#D85E78] transition-colors cursor-pointer mt-1 leading-snug"
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#7A7273] font-sans leading-relaxed line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer Row: View Page link + Love Reaction + Views */}
                  <div className="pt-3 border-t border-[#EFE8E6] flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 text-xs text-[#7A7273] font-sans bg-[#FAF0F2] px-2.5 py-1 rounded-full">
                        <Eye className="w-3.5 h-3.5 text-[#D85E78]" />
                        <span>{formatViews(item.views)}</span>
                      </div>
                      <LoveReactButton videoId={item.id} initialLikes={item.likes} size="sm" />
                    </div>

                    <Link
                      href={`/videos/${item.slug}`}
                      className="inline-flex items-center space-x-1 text-[11px] tracking-wider uppercase font-sans text-[#1A1718] hover:text-[#D85E78] font-medium"
                    >
                      <span>DETAILS</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Unified Video Modal Player */}
      <VideoPlayerModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
