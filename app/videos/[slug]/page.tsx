import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Eye, Film, Smartphone, Clock, Calendar, Sparkles } from "lucide-react";
import { getAllVideos, getVideoBySlugOrId } from "@/lib/videos.server";
import { LoveReactButton } from "@/components/videos/LoveReactButton";

interface VideoDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allVideos = await getAllVideos();
  return allVideos.map((video) => ({
    slug: video.slug,
  }));
}

export async function generateMetadata({
  params,
}: VideoDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideoBySlugOrId(slug);
  if (!video) return { title: "Video Not Found" };

  const canonicalUrl = `https://comatozze.neonweb.xyz/videos/${video.slug}`;

  return {
    title: `${video.title} — Comatozze Official Video`,
    description: `${video.description} Watch the official fashion film and motion study starring Comatozze (Uma North). Full uncut release available on Telegram.`,
    keywords: [
      video.title,
      "Comatozze video",
      "Comatozze new video",
      "Comatozze latest video",
      "Comatozze reel",
      "Comatozze film",
      "Uma North video",
      "Comatozze official",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${video.title} — Comatozze Official Video`,
      description: video.description,
      url: canonicalUrl,
      type: "video.other",
      images: [
        {
          url: video.thumbnail,
          width: 1200,
          height: 675,
          alt: `${video.title} thumbnail`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${video.title} — Comatozze Official Video`,
      description: video.description,
      images: [video.thumbnail],
    },
  };
}

export default async function VideoDetailPage({ params }: VideoDetailProps) {
  const { slug } = await params;
  const video = await getVideoBySlugOrId(slug);

  if (!video) {
    notFound();
  }

  const allVideos = await getAllVideos();
  const relatedVideos = allVideos
    .filter((v) => v.id !== video.id && v.slug !== video.slug)
    .slice(0, 3);

  const isReel = video.format === "reel";

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [
      video.thumbnail.startsWith("http")
        ? video.thumbnail
        : `https://comatozze.neonweb.xyz${video.thumbnail}`,
    ],
    uploadDate: `${video.year}-01-01T00:00:00Z`,
    duration: isReel ? "PT30S" : "PT15M42S",
    contentUrl: video.videoUrl.startsWith("http")
      ? video.videoUrl
      : `https://comatozze.neonweb.xyz${video.videoUrl}`,
    embedUrl: `https://comatozze.neonweb.xyz/videos/${video.slug}`,
    actor: {
      "@type": "Person",
      name: "Comatozze",
      alternateName: "Uma North",
      url: "https://comatozze.neonweb.xyz",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://comatozze.neonweb.xyz",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Videos",
        item: "https://comatozze.neonweb.xyz/videos",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: video.title,
        item: `https://comatozze.neonweb.xyz/videos/${video.slug}`,
      },
    ],
  };

  const formatViews = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div className="pt-32 pb-24 md:pb-36 bg-[#FAF8F5]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/videos"
            className="inline-flex items-center space-x-2 text-xs tracking-[0.25em] font-sans uppercase text-[#7A7273] hover:text-[#D85E78] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO ALL VIDEOS</span>
          </Link>
        </div>

        {/* Video Header & Metadata */}
        <div className="border-b border-[#E8DFDC] pb-8 mb-10">
          <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-[0.3em] font-sans uppercase font-medium text-[#D85E78] mb-3">
            <span className="flex items-center space-x-1 bg-[#FAF0F2] px-2.5 py-1 rounded-full">
              {isReel ? <Smartphone className="w-3 h-3" /> : <Film className="w-3 h-3" />}
              <span>{isReel ? "9:16 Vertical Reel" : "16:9 Cinematic Feature"}</span>
            </span>
            <span>·</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-[#A09899]" />
              <span>{video.duration}</span>
            </span>
            <span>·</span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-[#A09899]" />
              <span>{video.year}</span>
            </span>
          </div>

          <h1 className="font-editorial-serif text-4xl sm:text-6xl lg:text-7xl text-[#191617] font-light tracking-wide leading-tight">
            {video.title}
          </h1>

          {/* Social Proof & Love React Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E8DFDC]">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#EFE8E6] text-xs font-sans text-[#191617]">
                <Eye className="w-4 h-4 text-[#D85E78]" />
                <span className="font-semibold">{formatViews(video.views)}</span>
                <span className="text-[#7A7273]">views</span>
              </div>
              <LoveReactButton videoId={video.id} initialLikes={video.likes} size="md" />
            </div>

            <span className="text-xs font-sans text-[#7A7273] uppercase tracking-wider">
              Category: <strong className="text-[#191617]">{video.category}</strong>
            </span>
          </div>
        </div>

        {/* Video Player Display */}
        <div className="flex justify-center mb-12">
          <div
            className={`relative w-full bg-black overflow-hidden rounded-xl shadow-2xl border border-black/10 ${
              isReel
                ? "max-w-md aspect-[9/16] max-h-[75vh]"
                : "max-w-5xl aspect-video"
            }`}
          >
            <video
              src={video.videoUrl}
              poster={video.thumbnail}
              controls
              playsInline
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Telegram Direct Access Callout Banner */}
        <div className="mb-16 p-6 sm:p-8 bg-gradient-to-r from-[#191617] via-[#241F21] to-[#191617] rounded-xl border border-white/10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-[#229ED9]/20 text-[#229ED9] text-[10px] tracking-widest font-sans uppercase font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Full Uncut HD Release</span>
            </div>
            <h3 className="font-editorial-serif text-2xl sm:text-3xl text-white">
              Watch Uncut Footage & Raw Takes on Telegram
            </h3>
            <p className="text-xs sm:text-sm text-[#C4BDBF] font-sans max-w-xl">
              Join Comatozze&apos;s verified channel (@comatozze_new) to stream original 4K raw footage, unseen extended angles, and private daily releases.
            </p>
          </div>

          <a
            href={video.telegramUrl || "https://t.me/comatozze_new"}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-[#229ED9] hover:bg-[#1E88BE] text-white font-sans text-xs tracking-wider uppercase font-bold rounded-lg shadow-lg hover:shadow-[#229ED9]/40 transition-all duration-200 transform hover:scale-105"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
            <span>JOIN OFFICIAL TELEGRAM CHANNEL</span>
          </a>
        </div>

        {/* Description & Production Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#E8DFDC] pb-16 mb-16">
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
              ABOUT THIS PRODUCTION
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#554F50] leading-relaxed">
              {video.description}
            </p>
            <p className="font-sans text-sm text-[#7A7273] leading-relaxed">
              Starring independent fashion model Comatozze (Uma North). Produced with natural ambient lighting, fluid physical expression, and intimate color calibration.
            </p>
          </div>

          <div className="md:col-span-4 border-l border-[#E8DFDC] pl-6 space-y-3 text-xs font-sans text-[#7A7273]">
            <h3 className="text-[10px] tracking-[0.35em] text-[#191617] uppercase font-bold mb-3">
              PRODUCTION CREDITS
            </h3>
            <p>STARRING: <span className="text-[#191617] font-medium">Comatozze (Uma North)</span></p>
            <p>ASPECT: <span className="text-[#191617] font-medium">{isReel ? "9:16 Vertical Portrait" : "16:9 Cinematic Widescreen"}</span></p>
            <p>RESOLUTION: <span className="text-[#191617] font-medium">4K Ultra HD</span></p>
            <p>LOCATION: <span className="text-[#191617] font-medium">Private Studio / Outdoor</span></p>
            <p>VERIFIED LINK: <a href="https://t.me/comatozze_new" target="_blank" rel="noopener noreferrer" className="text-[#229ED9] hover:underline">@comatozze_new</a></p>
          </div>
        </div>

        {/* Related Videos Section */}
        {relatedVideos.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-8 border-b border-[#E8DFDC] pb-4">
              <div>
                <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
                  EXPLORE MORE
                </span>
                <h3 className="font-editorial-serif text-3xl text-[#191617] mt-1">
                  Related Videos & Films
                </h3>
              </div>
              <Link
                href="/videos"
                className="text-xs tracking-[0.25em] font-sans uppercase text-[#191617] hover:text-[#D85E78] font-medium"
              >
                VIEW ARCHIVE →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedVideos.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/videos/${rel.slug}`}
                  className="group flex flex-col justify-between space-y-3"
                >
                  <div
                    className={`relative w-full overflow-hidden bg-[#191617] rounded-sm border border-[#E8DFDC] ${
                      rel.format === "reel" ? "aspect-[9/16] max-h-[380px]" : "aspect-video"
                    }`}
                  >
                    <Image
                      src={rel.thumbnail || "/images/model/comatozze-pool-sunset-1.png"}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/75 text-white text-[10px] font-sans rounded">
                      {rel.duration}
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline border-b border-[#E8DFDC] pb-2">
                    <div>
                      <span className="text-[9px] tracking-[0.25em] font-sans uppercase text-[#D85E78] block">
                        {rel.category}
                      </span>
                      <h4 className="font-editorial-serif text-xl text-[#191617] group-hover:text-[#D85E78] transition-colors leading-snug">
                        {rel.title}
                      </h4>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#7A7273] group-hover:text-[#191617] shrink-0 ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
