import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { modelData } from "@/data/model";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#FAF8F5] pt-24 pb-12 flex flex-col justify-between overflow-hidden">
      {/* Background Soft Pink Tone & Watermark */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 sm:px-10 flex-1 flex flex-col justify-center py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start relative pl-8 lg:pl-12">
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
              Comatozze
            </h1>

            {/* Contextual Entity Lead */}
            <p className="text-[11px] tracking-[0.2em] font-sans uppercase text-[#7A7273] mt-2 mb-1">
              Professional Model & Independent Creator
            </p>

            {/* Cursive Statement */}
            <p className="font-cursive text-4xl sm:text-5xl lg:text-6xl text-[#D85E78] my-2 transform -rotate-1 font-normal tracking-wide">
              {modelData.tagline}
            </p>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-[#5C5556] leading-relaxed max-w-sm my-4">
              Comatozze is a professional model featured in fashion, editorial, beauty, and commercial work — blending authentic poise with natural confidence.
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
                <span>VIEW REELS</span>
                <span className="w-6 h-6 rounded-full border border-[#1A1718] flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 ml-0.5" fill="#1A1718" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Hero Image (Crisp, High-Resolution, Perfectly Visible) */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-[3/4] sm:aspect-[4/5] overflow-hidden shadow-2xl rounded-sm border border-[#EFE8E6] bg-[#F2EAE8]">
              <Image
                src="/images/model/comatozze-hero-poolside.jpg"
                alt="Comatozze official fashion editorial portrait"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top hover:scale-102 transition-transform duration-700"
              />
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
