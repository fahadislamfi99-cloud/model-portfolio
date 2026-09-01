import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { LongVideoSection } from "@/components/home/LongVideoSection";
import { LatestVideos } from "@/components/home/LatestVideos";
import { CareerHighlights } from "@/components/home/CareerHighlights";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { BookingCTA } from "@/components/home/BookingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      {/* Long Video Section placed before Reels as requested */}
      <LongVideoSection />
      <LatestVideos />
      <CareerHighlights />
      <GalleryPreview />
      <BookingCTA />
    </>
  );
}
