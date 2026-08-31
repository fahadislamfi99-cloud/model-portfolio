import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function AboutPreview() {
  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#EFE8E6]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-8">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.3em] text-[#D85E78] font-sans font-semibold uppercase mb-2 block">
                ABOUT HER
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl text-[#1A1718] font-normal leading-tight mb-4">
                About Comatozze
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#5C5556] leading-relaxed mb-6">
                Also known as Uma North. Self-produced independent creator, model, and performer originally from Podolsk, Russia. Known for cozy, candid productions, authentic chemistry, and a distinctive creative spirit (&ldquo;Cute face, wild mind&rdquo;).
              </p>
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] font-sans font-semibold uppercase text-[#D85E78] hover:text-[#C24B65] transition-colors"
              >
                <span>READ FULL STORY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Right 3 Portrait Images */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ScrollReveal delay={100}>
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2EAE8]">
                <Image
                  src="/images/model/image-5-lace-bodysuit.jpg"
                  alt="Comatozze in black lace bodysuit"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2EAE8]">
                <Image
                  src="/images/model/comatozze-saree-gold.jpg"
                  alt="Comatozze in emerald gold saree"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2EAE8]">
                <Image
                  src="/images/model/comatozze-face-closeup.jpg"
                  alt="Comatozze face portrait"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
