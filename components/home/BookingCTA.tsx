import Image from "next/image";
import Link from "next/link";

export function BookingCTA() {
  return (
    <section className="relative bg-[#F9EAEB] border-t border-[#EFE8E6] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1718] font-normal leading-[1.05] mb-4">
              Let&apos;s Create <br />
              Something Iconic
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#5C5556] leading-relaxed max-w-md mb-8">
              For bookings, collaborations and professional inquiries.
            </p>
            <Link
              href="/contact"
              className="inline-block text-[10px] tracking-[0.25em] font-sans font-semibold uppercase px-8 py-3.5 bg-[#D85E78] text-white hover:bg-[#C24B65] transition-colors"
            >
              BOOK COMATOZZE
            </Link>
          </div>

          {/* Right Model Photo */}
          <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
            <Image
              src="/images/model/comatozze-pool-sunset-2.png"
              alt="Comatozze model editorial poolside scene"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
