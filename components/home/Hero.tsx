import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { modelData } from "@/data/model";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#FAF8F5] pt-24 pb-12 flex flex-col justify-between overflow-hidden">
      {/* Background Soft Pink Tone & Watermark */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] h-full z-0 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/images/model/comatozze-hero-poolside.jpg"
            alt="Hot Comatozze model poolside portrait"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center filter brightness-[0.98]"
          />
          {/* Subtle blush gradient on left for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent lg:via-[#FAF8F5]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent lg:hidden" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 sm:px-10 flex-1 flex flex-col justify-center py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start relative pl-8 lg:pl-12">
            {/* Left Vertical Line & Counter Numbers */}
            <div className="absolute left-0 top-1 bottom-1 flex flex-col justify-between items-center text-[10px] tracking-widest text-[#7A7273] font-sans">
              <span>01</span>
              <div className="w-[1.5px] h-20 bg-[#D85E78]/60 my-auto" />
              <span>05</span>
            </div>

            {/* Sub-label */}
            <span className="text-[10px] tracking-[0.3em] text-[#1A1718] font-sans font-medium uppercase mb-2">
              {modelData.label}
            </span>

            {/* Giant Brand Heading */}
            <h1 className="font-editorial-serif text-5xl sm:text-7xl xl:text-8xl tracking-[0.14em] font-light text-[#1A1718] leading-[0.92]">
              COMATOZZE
            </h1>

            {/* Cursive Statement */}
            <p className="font-cursive text-4xl sm:text-5xl lg:text-6xl text-[#D85E78] my-3 transform -rotate-1 font-normal tracking-wide">
              {modelData.tagline}
            </p>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-[#5C5556] leading-relaxed max-w-sm my-4">
              {modelData.statement}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link
                href="/about"
                className="text-[10px] tracking-[0.25em] font-sans font-semibold uppercase px-6 py-3 bg-[#D85E78] text-white hover:bg-[#C24B65] transition-colors"
              >
                DISCOVER HER STORY
              </Link>

              <Link
                href="/videos"
                className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] font-sans font-semibold uppercase text-[#1A1718] hover:text-[#D85E78] transition-colors"
              >
                <span>VIEW REEL</span>
                <span className="w-6 h-6 rounded-full border border-[#1A1718] flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 ml-0.5" fill="#1A1718" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pb-2">
        <span className="text-[9px] tracking-[0.3em] font-sans uppercase text-[#7A7273]">
          SCROLL
        </span>
        <span className="text-xs text-[#7A7273] mt-0.5 animate-bounce">↓</span>
      </div>
    </section>
  );
}
