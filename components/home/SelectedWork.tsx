import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const workItems = [
  {
    title: "Summer Escape",
    category: "FASHION CAMPAIGN",
    year: "2024",
    image: "/images/model/comatozze-pool-sunset-1.png",
    slug: "summer-escape",
  },
  {
    title: "Editorial Muse",
    category: "EDITORIAL",
    year: "2024",
    image: "/images/model/comatozze-balcony-dusk.jpg",
    slug: "lumiere-nocturne",
  },
  {
    title: "Golden Hour",
    category: "BRAND CAMPAIGN",
    year: "2023",
    image: "/images/model/comatozze-tennis-court-1.webp",
    slug: "rose-monochrome",
  },
  {
    title: "Urban Elegance",
    category: "COMMERCIAL",
    year: "2023",
    image: "/images/model/comatozze-denim-urban.jpg",
    slug: "atelier-movement",
  },
];

export function SelectedWork() {
  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#EFE8E6]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-[#D85E78] font-sans font-semibold uppercase block mb-1">
              SELECTED WORK
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl text-[#1A1718] font-normal">
              Work Highlights
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center space-x-1 text-[10px] tracking-[0.2em] font-sans font-semibold uppercase text-[#D85E78] hover:text-[#C24B65]"
          >
            <span>VIEW ALL WORK</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {workItems.map((item) => (
            <Link
              key={item.title}
              href={`/work/${item.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2EAE8] mb-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-editorial-serif text-xl text-[#1A1718] group-hover:text-[#D85E78] transition-colors">
                {item.title}
              </h3>
              <p className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#7A7273] mt-1">
                {item.category} · {item.year}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
