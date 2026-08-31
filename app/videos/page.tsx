"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ArrowUpRight } from "lucide-react";
import { videosData, VideoItem } from "@/data/videos";

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <div className="pt-32 pb-24 md:pb-36 bg-[#FAF8F5]">
      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Page Header */}
        <div className="border-b border-[#E8DFDC] pb-12 mb-16">
          <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
            CINEMATIC ARCHIVE & MOTION
          </span>
          <h1 className="font-editorial-serif text-5xl sm:text-7xl lg:text-8xl text-[#191617] font-light mt-3 tracking-wide">
            Comatozze <span className="italic">Videos</span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#7A7273] mt-4 max-w-xl">
            Explore Comatozze&apos;s latest publicly available modeling films, campaign motion studies, widescreen features, and behind-the-scenes perspectives.
          </p>
        </div>

        {/* 3-Column Editorial Grid (Desktop: 3, Tablet: 2, Mobile: 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {videosData.map((video) => (
            <article key={video.slug} className="group flex flex-col space-y-4">
              <div
                onClick={() => setActiveVideo(video)}
                className="relative aspect-video w-full overflow-hidden bg-[#191617] border border-[#E8DFDC] cursor-pointer"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191617]/60 via-transparent to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5]/90 backdrop-blur-sm flex items-center justify-center border border-[#FAF8F5] shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 text-[#191617] ml-0.5" fill="#191617" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#191617]/80 text-[#FAF8F5] text-[10px] tracking-wider font-sans uppercase backdrop-blur-sm">
                  {video.duration}
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between text-[10px] tracking-[0.25em] font-sans uppercase text-[#C98A90]">
                  <span>{video.category}</span>
                  <span>{video.year}</span>
                </div>
                <h2
                  onClick={() => setActiveVideo(video)}
                  className="font-editorial-serif text-2xl sm:text-3xl text-[#191617] group-hover:text-[#C98A90] transition-colors cursor-pointer"
                >
                  {video.title}
                </h2>
                <p className="text-xs text-[#7A7273] font-sans leading-relaxed">
                  {video.description}
                </p>

                <div className="pt-2 flex justify-between items-center">
                  <Link
                    href={`/videos/${video.slug}`}
                    className="inline-flex items-center space-x-1 text-[11px] tracking-[0.2em] font-sans uppercase text-[#191617] hover:text-[#C98A90] transition-colors"
                  >
                    <span>DETAILS & CREDITS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
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

          <div className="w-full max-w-5xl aspect-video bg-black overflow-hidden shadow-2xl border border-white/10">
            <video
              src={activeVideo.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
