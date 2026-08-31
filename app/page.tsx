import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { LatestVideos } from "@/components/home/LatestVideos";
import { LongVideoSection } from "@/components/home/LongVideoSection";
import { CareerHighlights } from "@/components/home/CareerHighlights";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { BookingCTA } from "@/components/home/BookingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <LatestVideos />
      <LongVideoSection />
      <CareerHighlights />
      <GalleryPreview />
      <BookingCTA />
    </>
  );
}

