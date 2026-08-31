"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems, GalleryItem } from "@/data/gallery";

const categories = ["ALL", "EDITORIAL", "FASHION", "BEAUTY", "PORTRAIT", "RUNWAY"] as const;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "ALL"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category.toUpperCase() === activeCategory
        );

  const handleOpen = (idx: number) => {
    setSelectedIndex(idx);
    document.body.style.overflow = "hidden";
  };

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredItems.length - 1
    );
  }, [selectedIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev! < filteredItems.length - 1 ? prev! + 1 : 0
    );
  }, [selectedIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  return (
    <div className="pt-32 pb-24 md:pb-36 bg-[#FAF8F5]">
      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Page Header */}
        <div className="border-b border-[#E8DFDC] pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
              CURATED ARCHIVE
            </span>
            <h1 className="font-editorial-serif text-5xl sm:text-7xl lg:text-8xl text-[#191617] font-light mt-3 tracking-wide">
              Comatozze <span className="italic">Gallery</span>
            </h1>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 pt-4">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] tracking-[0.25em] font-sans uppercase px-4 py-2 border transition-all duration-200 ${
                    active
                      ? "bg-[#191617] text-[#FAF8F5] border-[#191617]"
                      : "bg-transparent text-[#191617] border-[#E8DFDC] hover:border-[#191617]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Masonry/Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const aspectClass =
              item.aspect === "wide"
                ? "aspect-[16/10]"
                : item.aspect === "square"
                ? "aspect-square"
                : "aspect-[3/4]";

            return (
              <figure
                key={item.id}
                onClick={() => handleOpen(idx)}
                className="group relative cursor-pointer overflow-hidden bg-[#F7EFEF] border border-[#E8DFDC]"
              >
                <div className={`relative w-full ${aspectClass}`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#191617]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="text-right">
                      <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-[#FAF8F5] px-2 py-1 bg-[#191617]/60 backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>
                    <div>
                      <figcaption className="font-editorial-serif text-2xl text-[#FAF8F5]">
                        {item.title}
                      </figcaption>
                      <p className="text-xs text-[#FAF8F5]/80 font-sans mt-0.5">
                        {item.year}
                      </p>
                    </div>
                  </div>
                </div>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Premium Fullscreen Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F5]/98 md:bg-[#FAF8F5]/95 backdrop-blur-xl p-4 sm:p-8 md:p-12 select-none"
        >
          {/* Top Bar: Counter & Close */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 border-b border-[#E8DFDC] pb-4">
            <span className="font-editorial-serif text-base tracking-widest text-[#191617]">
              {(selectedIndex + 1).toString().padStart(2, "0")}{" "}
              <span className="text-xs text-[#C98A90] font-sans">
                / {filteredItems.length.toString().padStart(2, "0")}
              </span>
            </span>
            <button
              onClick={handleClose}
              className="p-2 text-[#191617] hover:text-[#C98A90] transition-colors focus:outline-none"
              aria-label="Close lightbox"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 p-3 text-[#191617] hover:text-[#C98A90] transition-colors z-10 focus:outline-none"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          {/* Active Image Stage */}
          <div className="relative max-w-4xl max-h-[75vh] w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full max-h-[70vh]">
              <Image
                src={filteredItems[selectedIndex].src}
                alt={filteredItems[selectedIndex].alt}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 p-3 text-[#191617] hover:text-[#C98A90] transition-colors z-10 focus:outline-none"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          {/* Bottom Caption */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-baseline border-t border-[#E8DFDC] pt-4 text-xs font-sans text-[#7A7273]">
            <span className="text-[#191617] font-medium tracking-wide">
              {filteredItems[selectedIndex].title}
            </span>
            <span>
              {filteredItems[selectedIndex].category} · {filteredItems[selectedIndex].year}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
