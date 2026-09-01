"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowUpRight, Film, Smartphone, Eye } from "lucide-react";
import { LoveReactButton } from "@/components/videos/LoveReactButton";
import { UnifiedVideo, getBaselineStats, slugify } from "@/lib/videos";
import { videosData } from "@/data/videos";

export default function VideosPage() {
  const [activeTab, setActiveTab] = useState<"all" | "long_videos" | "reels">("all");
  const [allVideos, setAllVideos] = useState<UnifiedVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Static baseline fallback
    const staticUnified: UnifiedVideo[] = videosData.map((v, idx) => {
      const isWidescreen = !v.category.toLowerCase().includes("reel");
      const stats = getBaselineStats(v.slug, isWidescreen);
      return {
        id: v.slug,
        slug: v.slug,
        title: v.title,
        category: "VIDEO",
        year: v.year || "2026",
        duration: v.duration,
        thumbnail: v.thumbnail || "/images/model/comatozze-pool-sunset-1.png",
        videoUrl: v.videoUrl,
        format: isWidescreen ? "widescreen" : "reel",
        telegramUrl: "https://t.me/comatozze_new",
        description: v.description,
        views: stats.views,
        likes: stats.likes,
        order: idx,
      };
    });

    fetch("/api/admin/videos")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.videos && data.videos.length > 0) {
          const formattedDb: UnifiedVideo[] = data.videos.map(
            (v: {
              _id: string;
              title: string;
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
              const vidId = v._id;
              const format = v.format || (v.videoUrl?.includes("reel") ? "reel" : "widescreen");
              const stats = getBaselineStats(vidId, format === "widescreen");
              return {
                id: vidId,
                slug: slugify(v.title || `video-${vidId}`),
                title: v.title,
                category: "VIDEO",
                year: "2026",
                duration: v.duration || (format === "widescreen" ? "15:42" : "00:30"),
                thumbnail: v.thumbnail || "/images/model/comatozze-pool-sunset-1.png",
                videoUrl: v.videoUrl,
                format: format as "reel" | "widescreen",
                telegramUrl: v.telegramUrl || "https://t.me/comatozze_new",
                description: v.description || "Exclusive official video starring Comatozze.",
                views: stats.views + (v.views || 0),
                likes: stats.likes + (v.likes || 0),
                order: v.order !== undefined ? v.order : idx,
              };
            }
          );

          const dbTitles = new Set(formattedDb.map((v) => v.title.toLowerCase().trim()));
          setAllVideos([
            ...formattedDb,
            ...staticUnified.filter((v) => !dbTitles.has(v.title.toLowerCase().trim())),
          ]);
        } else {
          setAllVideos(staticUnified);
        }
      })
      .catch(() => {
        setAllVideos(staticUnified);
      })
      .finally(() => setLoading(false));
  }, []);

  const longVideos = allVideos.filter((v) => v.format === "widescreen");
  const reels = allVideos.filter((v) => v.format === "reel");

  const formatViews = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

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
              Official video archive: widescreen 16:9 cinematic features, vertical 9:16 reels, and full uncut scenes on Telegram.
            </p>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center space-x-2 bg-[#EFE8E6] p-1.5 rounded-full self-start md:self-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-[#191617] text-white shadow-xs"
                  : "text-[#7A7273] hover:text-[#191617]"
              }`}
            >
              All ({allVideos.length})
            </button>
            <button
              onClick={() => setActiveTab("long_videos")}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition-all ${
                activeTab === "long_videos"
                  ? "bg-[#191617] text-white shadow-xs"
                  : "text-[#7A7273] hover:text-[#191617]"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Long Videos 16:9 ({longVideos.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("reels")}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition-all ${
                activeTab === "reels"
                  ? "bg-[#191617] text-white shadow-xs"
                  : "text-[#7A7273] hover:text-[#191617]"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Short Reels 9:16 ({reels.length})</span>
            </button>
          </div>
        </div>

        {/* Loading Indicator State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-10 h-10 rounded-full border-3 border-[#D85E78] border-t-transparent animate-spin" />
            <p className="font-sans text-xs uppercase tracking-widest text-[#7A7273]">
              Loading cinematic archive...
            </p>
          </div>
        ) : (
          <>
            {/* SECTION 1: LONG VIDEOS (16:9 WIDESCREEN) - Placed First */}
            {(activeTab === "all" || activeTab === "long_videos") && (
              <section className="mb-24">
                <div className="flex items-center justify-between border-b border-[#E8DFDC] pb-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#FAF0F2] text-[#D85E78] flex items-center justify-center">
                      <Film className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-editorial-serif text-2xl sm:text-3xl text-[#191617]">
                        Cinematic Widescreen Features <span className="italic text-[#C98A90] font-light">(16:9)</span>
                      </h2>
                      <p className="text-xs text-[#7A7273] font-sans">
                        Full-length atmospheric film productions and exclusive long-form showcases
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-sans font-medium text-[#C98A90] uppercase tracking-wider hidden sm:inline-block">
                    {longVideos.length} Features
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {longVideos.map((video) => (
                    <article key={video.id} className="group flex flex-col justify-between space-y-4 h-full">
                      {/* Direct Click Opens Video Player Page */}
                      <Link
                        href={`/videos/${video.slug}`}
                        className="relative w-full aspect-video overflow-hidden bg-[#191617] border border-[#E8DFDC] rounded-sm block shadow-xs"
                      >
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/images/model/comatozze-pool-sunset-1.png";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#191617]/70 via-transparent to-transparent" />

                        {/* Duration Badge */}
                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#191617]/85 text-[#FAF8F5] text-[10px] tracking-wider font-sans uppercase backdrop-blur-sm rounded">
                          {video.duration}
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-[#FAF8F5]/90 backdrop-blur-sm flex items-center justify-center border border-[#FAF8F5] shadow transform group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-5 h-5 text-[#191617] ml-0.5" fill="#191617" />
                          </div>
                        </div>
                      </Link>

                      <div className="flex flex-col space-y-2 flex-1 justify-between">
                        <div>
                          <Link href={`/videos/${video.slug}`} className="block">
                            <h3 className="font-editorial-serif text-2xl text-[#191617] group-hover:text-[#D85E78] transition-colors leading-snug line-clamp-2 min-h-[3.75rem]">
                              {video.title}
                            </h3>
                          </Link>
                          <p className="text-xs text-[#7A7273] font-sans leading-relaxed line-clamp-2 mt-1 min-h-[2.25rem]">
                            {video.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#E8DFDC] flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1 text-xs text-[#7A7273] font-sans bg-[#FAF0F2] px-2.5 py-1 rounded-full">
                              <Eye className="w-3.5 h-3.5 text-[#D85E78]" />
                              <span>{formatViews(video.views)}</span>
                            </div>
                            <LoveReactButton videoId={video.id} initialLikes={video.likes} size="sm" />
                          </div>

                          <Link
                            href={`/videos/${video.slug}`}
                            className="inline-flex items-center space-x-1 text-[11px] tracking-wider uppercase font-sans text-[#191617] hover:text-[#D85E78] font-semibold"
                          >
                            <span>WATCH FULL</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION 2: SHORT REELS (9:16 VERTICAL) - Placed Second */}
            {(activeTab === "all" || activeTab === "reels") && (
              <section className="mb-20">
                <div className="flex items-center justify-between border-b border-[#E8DFDC] pb-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#FAF0F2] text-[#D85E78] flex items-center justify-center">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-editorial-serif text-2xl sm:text-3xl text-[#191617]">
                        Vertical Motion Reels <span className="italic text-[#C98A90] font-light">(9:16)</span>
                      </h2>
                      <p className="text-xs text-[#7A7273] font-sans">
                        Fast-paced fashion reels, silhouette studies, and portrait motion
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-sans font-medium text-[#C98A90] uppercase tracking-wider hidden sm:inline-block">
                    {reels.length} Reels
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {reels.map((video) => (
                    <article key={video.id} className="group flex flex-col justify-between space-y-3 h-full">
                      {/* Direct Click Opens Video Player Page */}
                      <Link
                        href={`/videos/${video.slug}`}
                        className="relative w-full aspect-[9/16] overflow-hidden bg-[#191617] border border-[#E8DFDC] rounded-sm block shadow-xs"
                      >
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/images/model/comatozze-saree-gold.jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#191617]/80 via-transparent to-transparent" />

                        {/* Duration Badge */}
                        <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/75 text-[#FAF8F5] text-[10px] font-sans rounded backdrop-blur-xs">
                          {video.duration}
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[#FAF8F5]/90 backdrop-blur-sm flex items-center justify-center border border-[#FAF8F5] shadow transform group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-4 h-4 text-[#191617] ml-0.5" fill="#191617" />
                          </div>
                        </div>
                      </Link>

                      <div className="flex flex-col space-y-1.5 flex-1 justify-between">
                        <div>
                          <Link href={`/videos/${video.slug}`} className="block">
                            <h3 className="font-editorial-serif text-xl text-[#191617] group-hover:text-[#D85E78] transition-colors leading-snug line-clamp-2 min-h-[3.25rem]">
                              {video.title}
                            </h3>
                          </Link>
                          <p className="text-xs text-[#7A7273] font-sans line-clamp-2 mt-1 min-h-[2rem]">
                            {video.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#E8DFDC] flex items-center justify-between">
                          <div className="flex items-center space-x-1.5">
                            <div className="flex items-center space-x-1 text-[11px] text-[#7A7273] font-sans bg-[#FAF0F2] px-2 py-0.5 rounded-full">
                              <Eye className="w-3 h-3 text-[#D85E78]" />
                              <span>{formatViews(video.views)}</span>
                            </div>
                            <LoveReactButton videoId={video.id} initialLikes={video.likes} size="sm" />
                          </div>

                          <Link
                            href={`/videos/${video.slug}`}
                            className="inline-flex items-center space-x-1 text-[10px] tracking-wider uppercase font-sans text-[#191617] hover:text-[#D85E78] font-semibold"
                          >
                            <span>WATCH REEL</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
