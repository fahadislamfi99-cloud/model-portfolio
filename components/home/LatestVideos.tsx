"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, ArrowUpRight, Eye } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { LoveReactButton } from "@/components/videos/LoveReactButton";
import { UnifiedVideo, getBaselineStats, slugify } from "@/lib/videos";

const fallbackReels: UnifiedVideo[] = [
  {
    id: "reel-1",
    slug: "editorial-motion",
    title: "Editorial Motion & Silhouette",
    category: "FASHION REEL",
    year: "2026",
    duration: "00:30",
    thumbnail: "/images/model/comatozze-saree-gold.jpg",
    videoUrl: "/videos/comatozze-reel-1.mp4",
    format: "reel",
    telegramUrl: "https://t.me/comatozze_new",
    description: "A cinematic vertical motion study capturing fluid grace, statuesque poses, and light play.",
    views: 28400,
    likes: 3120,
    order: 0,
  },
  {
    id: "reel-2",
    slug: "golden-hour-atmosphere",
    title: "Golden Hour Atmosphere",
    category: "SUMMER REEL",
    year: "2026",
    duration: "00:24",
    thumbnail: "/images/model/comatozze-pool-sunset-2.png",
    videoUrl: "/videos/comatozze-reel-2.mp4",
    format: "reel",
    telegramUrl: "https://t.me/comatozze_new",
    description: "Golden reflections and relaxed elegance captured beside serene waters during twilight.",
    views: 39500,
    likes: 4890,
    order: 1,
  },
  {
    id: "reel-3",
    slug: "behind-the-scenes",
    title: "Behind The Scenes & Styling",
    category: "BTS REEL",
    year: "2026",
    duration: "00:45",
    thumbnail: "/images/model/image-6-lace-bodysuit.jpg",
    videoUrl: "/videos/comatozze-reel-3.mp4",
    format: "reel",
    telegramUrl: "https://t.me/comatozze_new",
    description: "Intimate behind-the-scenes moments showcasing hair, makeup, and on-set focus.",
    views: 21900,
    likes: 2450,
    order: 2,
  },
];

export function LatestVideos() {
  const [reels, setReels] = useState<UnifiedVideo[]>(fallbackReels);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/admin/videos?format=reel")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.videos && data.videos.length > 0) {
          const formatted: UnifiedVideo[] = data.videos.map(
            (v: {
              _id: string;
              title: string;
              category?: string;
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
              const stats = getBaselineStats(v._id, false);
              return {
                id: v._id,
                slug: slugify(v.title || `reel-${v._id}`),
                title: v.title,
                category: "FASHION REEL",
                year: "2026",
                duration: v.duration || "00:30",
                thumbnail: v.thumbnail || "/images/model/comatozze-saree-gold.jpg",
                videoUrl: v.videoUrl,
                format: "reel",
                telegramUrl: v.telegramUrl || "https://t.me/comatozze_new",
                description: v.description,
                views: stats.views + (v.views || 0),
                likes: stats.likes + (v.likes || 0),
                order: v.order !== undefined ? v.order : idx,
              };
            }
          );
          setReels(formatted);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
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
                VERTICAL MOTION ARCHIVE
              </span>
              <h2 className="font-editorial-serif text-4xl sm:text-5xl text-[#1A1718] font-light mt-2 tracking-wide">
                Short Reels <span className="italic">(9:16)</span>
              </h2>
              <p className="text-xs font-sans text-[#7A7273] mt-2 max-w-xl">
                Vertical fashion studies, styling reels, and fast atmospheric clips.
              </p>
            </div>
            <Link
              href="/videos"
              className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase text-[#1A1718] hover:text-[#D85E78] transition-colors group"
            >
              <span>Explore All Reels</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Loading Indicator */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex flex-col space-y-4 animate-pulse">
                <div className="aspect-[9/16] max-h-[500px] w-full bg-[#EFE8E6] rounded-sm flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#D85E78] border-t-transparent animate-spin" />
                </div>
                <div className="h-5 w-3/4 bg-[#EFE8E6] rounded" />
                <div className="h-4 w-1/2 bg-[#EFE8E6] rounded" />
              </div>
            ))}
          </div>
        ) : (
          /* 3-Column Vertical Reel Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reels.map((vid, idx) => (
              <ScrollReveal key={vid.id} direction="up" delay={idx * 120}>
                <article className="group flex flex-col justify-between space-y-4 h-full">
                  {/* Direct Link to Dedicated Video Page */}
                  <Link
                    href={`/videos/${vid.slug}`}
                    className="relative aspect-[9/16] max-h-[500px] w-full overflow-hidden bg-[#1A1718] rounded-sm block shadow-sm border border-[#EFE8E6]"
                  >
                    <Image
                      src={vid.thumbnail}
                      alt={vid.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/model/comatozze-saree-gold.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#191617]/80 via-transparent to-transparent" />

                    {/* Duration Badge */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/75 backdrop-blur-xs text-[10px] font-sans text-white rounded">
                      {vid.duration}
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-white/90 flex items-center justify-center bg-black/40 backdrop-blur-xs transform group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                      </div>
                    </div>
                  </Link>

                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <Link href={`/videos/${vid.slug}`} className="block">
                        <h3 className="font-editorial-serif text-2xl text-[#1A1718] group-hover:text-[#D85E78] transition-colors leading-snug line-clamp-2 min-h-[3.75rem]">
                          {vid.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-[#7A7273] font-sans line-clamp-2 mt-1 min-h-[2.25rem]">
                        {vid.description}
                      </p>
                    </div>

                    {/* Action Row */}
                    <div className="pt-3 border-t border-[#EFE8E6] flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-xs text-[#7A7273] font-sans bg-[#FAF0F2] px-2.5 py-1 rounded-full">
                          <Eye className="w-3.5 h-3.5 text-[#D85E78]" />
                          <span>{formatViews(vid.views)}</span>
                        </div>
                        <LoveReactButton videoId={vid.id} initialLikes={vid.likes} size="sm" />
                      </div>

                      <Link
                        href={`/videos/${vid.slug}`}
                        className="inline-flex items-center space-x-1 text-[11px] tracking-wider uppercase font-sans text-[#1A1718] hover:text-[#D85E78] font-semibold"
                      >
                        <span>WATCH REEL</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
