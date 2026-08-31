import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { modelData } from "@/data/model";
import { careerTimeline } from "@/data/career";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "About Comatozze — Fashion & Editorial Model",
  description:
    "Explore the biography, profile specifications, career milestones, and artistic philosophy of fashion model Comatozze.",
  alternates: {
    canonical: "https://comatozze.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 md:pb-36 bg-[#FAF8F5]">
      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Page Header */}
        <div className="border-b border-[#E8DFDC] pb-12 mb-16">
          <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
            BIOGRAPHY & PROFILE
          </span>
          <h1 className="font-editorial-serif text-5xl sm:text-7xl lg:text-8xl text-[#191617] font-light mt-3 tracking-wide">
            About <span className="italic">Comatozze</span>
          </h1>
        </div>

        {/* Hero Portrait & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-6">
            <ScrollReveal>
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7EFEF] border border-[#E8DFDC]">
                <Image
                  src="/images/model/image-6-lace-bodysuit.jpg"
                  alt="Comatozze portrait"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <ScrollReveal delay={100}>
              <div className="inline-flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#C98A90]" />
                <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-[#C98A90]">
                  HER STORY
                </span>
              </div>
              <h2 className="font-editorial-serif text-3xl sm:text-5xl text-[#191617] font-light leading-tight">
                Sculptural presence, quiet elegance, and modern feminine confidence.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-4 font-sans text-sm sm:text-base text-[#7A7273] leading-relaxed">
                {modelData.bioLong.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-3 text-xs tracking-[0.25em] font-sans uppercase px-6 py-3.5 bg-[#191617] text-[#FAF8F5] hover:bg-[#C98A90] transition-colors"
                >
                  <span>INQUIRE ABOUT BOOKINGS</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C98A90]" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Profile Specifications & Measurements Table */}
        <section className="border-t border-b border-[#E8DFDC] py-20 mb-24">
          <ScrollReveal>
            <div className="mb-12">
              <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
                FACTUAL PROFILE
              </span>
              <h3 className="font-editorial-serif text-3xl sm:text-5xl text-[#191617] font-light mt-1">
                Model <span className="italic">Specifications</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 text-left">
              <div className="border-l border-[#E8DFDC] pl-4">
                <span className="text-[10px] tracking-[0.25em] text-[#7A7273] uppercase block mb-1">HEIGHT</span>
                <span className="font-editorial-serif text-2xl text-[#191617]">{modelData.stats.height}</span>
              </div>
              <div className="border-l border-[#E8DFDC] pl-4">
                <span className="text-[10px] tracking-[0.25em] text-[#7A7273] uppercase block mb-1">HAIR</span>
                <span className="font-editorial-serif text-2xl text-[#191617]">{modelData.stats.hair}</span>
              </div>
              <div className="border-l border-[#E8DFDC] pl-4">
                <span className="text-[10px] tracking-[0.25em] text-[#7A7273] uppercase block mb-1">EYES</span>
                <span className="font-editorial-serif text-2xl text-[#191617]">{modelData.stats.eyes}</span>
              </div>
              <div className="border-l border-[#E8DFDC] pl-4">
                <span className="text-[10px] tracking-[0.25em] text-[#7A7273] uppercase block mb-1">DRESS</span>
                <span className="font-editorial-serif text-2xl text-[#191617]">{modelData.stats.dress}</span>
              </div>
              <div className="border-l border-[#E8DFDC] pl-4">
                <span className="text-[10px] tracking-[0.25em] text-[#7A7273] uppercase block mb-1">SHOE</span>
                <span className="font-editorial-serif text-2xl text-[#191617]">{modelData.stats.shoe}</span>
              </div>
              <div className="border-l border-[#E8DFDC] pl-4">
                <span className="text-[10px] tracking-[0.25em] text-[#7A7273] uppercase block mb-1">LOCATION</span>
                <span className="font-editorial-serif text-2xl text-[#191617]">{modelData.stats.location}</span>
              </div>
            </div>

            {/* Specialties Badges */}
            <div className="mt-12 pt-8 border-t border-[#E8DFDC] flex flex-wrap items-center gap-3">
              <span className="text-[10px] tracking-[0.25em] text-[#7A7273] uppercase mr-2">DISCIPLINES:</span>
              {modelData.stats.specialties.map((spec) => (
                <span
                  key={spec}
                  className="text-xs font-sans px-3 py-1.5 border border-[#E8DFDC] text-[#191617] bg-[#F7EFEF]/50"
                >
                  {spec}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Philosophy Spread */}
        <section className="mb-24 bg-[#F7EFEF] p-8 sm:p-16 md:p-20 border border-[#E8DFDC]">
          <ScrollReveal>
            <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
              EDITORIAL STATEMENT
            </span>
            <blockquote className="font-editorial-serif text-2xl sm:text-4xl lg:text-5xl text-[#191617] font-light leading-relaxed mt-4">
              &ldquo;The runway and the camera demand total presence. It is not about demanding attention, but commanding space through poise, discipline, and authentic stillness.&rdquo;
            </blockquote>
            <p className="mt-6 text-xs tracking-[0.25em] uppercase font-sans text-[#7A7273]">
              — COMATOZZE, MILAN 2024
            </p>
          </ScrollReveal>
        </section>

        {/* Career Timeline */}
        <section>
          <ScrollReveal>
            <div className="mb-12">
              <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
                SELECTED CHRONOLOGY
              </span>
              <h3 className="font-editorial-serif text-3xl sm:text-5xl text-[#191617] font-light mt-1">
                Career <span className="italic">Milestones</span>
              </h3>
            </div>

            <div className="space-y-0 divide-y divide-[#E8DFDC]">
              {careerTimeline.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 items-baseline hover:bg-[#F7EFEF]/40 transition-colors px-4 -mx-4"
                >
                  <div className="md:col-span-2 font-editorial-serif text-4xl text-[#191617]">
                    {item.year}
                  </div>
                  <div className="md:col-span-3 text-[10px] tracking-[0.25em] uppercase font-sans text-[#C98A90]">
                    {item.category} · {item.location}
                  </div>
                  <div className="md:col-span-7">
                    <h4 className="font-editorial-serif text-2xl text-[#191617]">{item.title}</h4>
                    <p className="text-sm font-sans text-[#7A7273] mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
