import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { videosData } from "@/data/videos";

interface VideoDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return videosData.map((video) => ({
    slug: video.slug,
  }));
}

export async function generateMetadata({
  params,
}: VideoDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const video = videosData.find((v) => v.slug === slug);
  if (!video) return { title: "Video Not Found" };

  return {
    title: `${video.title} — Comatozze Official Fashion Film`,
    description: video.description,
    alternates: {
      canonical: `https://comatozze.com/videos/${video.slug}`,
    },
    openGraph: {
      title: `${video.title} — Comatozze Official Video`,
      description: video.description,
      url: `https://comatozze.com/videos/${video.slug}`,
      images: [video.thumbnail],
    },
  };
}

export default async function VideoDetailPage({ params }: VideoDetailProps) {
  const { slug } = await params;
  const video = videosData.find((v) => v.slug === slug);

  if (!video) {
    notFound();
  }

  const relatedVideos = videosData.filter((v) => v.slug !== slug).slice(0, 2);

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [`https://comatozze.com${video.thumbnail}`],
    uploadDate: `${video.year}-01-01T00:00:00Z`,
    contentUrl: `https://comatozze.com${video.videoUrl}`,
    embedUrl: `https://comatozze.com/videos/${video.slug}`,
    actor: {
      "@type": "Person",
      name: "Comatozze",
      alternateName: "Uma North",
      url: "https://comatozze.com",
    },
  };

  return (
    <div className="pt-32 pb-24 md:pb-36 bg-[#FAF8F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Back Link */}
        <Link
          href="/videos"
          className="inline-flex items-center space-x-2 text-xs tracking-[0.25em] font-sans uppercase text-[#7A7273] hover:text-[#191617] mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO FILMS</span>
        </Link>

        {/* Video Header */}
        <div className="border-b border-[#E8DFDC] pb-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
              {video.category} · {video.year} · {video.duration}
            </span>
            <h1 className="font-editorial-serif text-5xl sm:text-7xl text-[#191617] font-light mt-3 tracking-wide">
              {video.title}
            </h1>
          </div>
          <div className="text-xs font-sans text-[#7A7273] space-y-1">
            <p>DIRECTOR: <span className="text-[#191617]">{video.director}</span></p>
            <p>CLIENT: <span className="text-[#191617]">{video.client}</span></p>
          </div>
        </div>

        {/* Large 16:9 Player */}
        <div className="relative aspect-video w-full bg-black overflow-hidden border border-[#E8DFDC] mb-12 shadow-sm">
          <video
            src={video.videoUrl}
            poster={video.thumbnail}
            controls
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Description & Credits */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#E8DFDC] pb-16 mb-16">
          <div className="md:col-span-8">
            <h2 className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium mb-3">
              ABOUT THE FILM
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#7A7273] leading-relaxed">
              {video.description}
            </p>
          </div>
          <div className="md:col-span-4 border-l border-[#E8DFDC] pl-6 space-y-3 text-xs font-sans text-[#7A7273]">
            <h3 className="text-[10px] tracking-[0.35em] text-[#191617] uppercase font-medium mb-2">
              PRODUCTION DETAILS
            </h3>
            <p>STARRING: <span className="text-[#191617]">Comatozze</span></p>
            <p>FORMAT: <span className="text-[#191617]">Digital Anamorphic 4K</span></p>
            <p>SOUND DESIGN: <span className="text-[#191617]">[Sound Studio]</span></p>
            <p>POST PRODUCTION: <span className="text-[#191617]">[Color Grade Studio]</span></p>
          </div>
        </div>

        {/* Related Videos */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
              MORE FILMS
            </span>
            <Link
              href="/videos"
              className="text-xs tracking-[0.25em] font-sans uppercase text-[#191617] hover:text-[#C98A90]"
            >
              VIEW ALL
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedVideos.map((rel) => (
              <Link
                key={rel.slug}
                href={`/videos/${rel.slug}`}
                className="group flex flex-col space-y-3"
              >
                <div className="relative aspect-video overflow-hidden bg-[#191617] border border-[#E8DFDC]">
                  <img
                    src={rel.thumbnail}
                    alt={rel.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex justify-between items-baseline border-b border-[#E8DFDC] pb-2">
                  <div>
                    <span className="text-[9px] tracking-[0.25em] font-sans uppercase text-[#C98A90] block">
                      {rel.category}
                    </span>
                    <h4 className="font-editorial-serif text-2xl text-[#191617] group-hover:text-[#C98A90] transition-colors">
                      {rel.title}
                    </h4>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#7A7273] group-hover:text-[#191617]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
