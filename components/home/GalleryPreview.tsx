import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const galleryStills = [
  { src: "/images/model/comatozze-tennis-court-2.webp", alt: "Comatozze tennis aesthetic" },
  { src: "/images/model/comatozze-balcony-dusk.jpg", alt: "Comatozze balcony sunset" },
  { src: "/images/model/comatozze-white-tank-couch.jpg", alt: "Comatozze white top lounge portrait" },
  { src: "/images/model/image-7-lace-bodysuit.jpg", alt: "Comatozze balcony bodysuit look" },
  { src: "/images/model/comatozze-pool-sunset-3.png", alt: "Comatozze poolside sunset" },
  { src: "/images/model/comatozze-saree-gold.jpg", alt: "Comatozze emerald saree portrait" },
];

export function GalleryPreview() {
  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#EFE8E6]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-[#D85E78] font-sans font-semibold uppercase block mb-1">
              GALLERY PREVIEW
            </span>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center space-x-1 text-[10px] tracking-[0.2em] font-sans font-semibold uppercase text-[#D85E78] hover:text-[#C24B65]"
          >
            <span>VIEW FULL GALLERY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Images in Horizontal Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {galleryStills.map((img, idx) => (
            <Link
              key={idx}
              href="/gallery"
              className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2EAE8] group block"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
