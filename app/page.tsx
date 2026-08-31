import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { SelectedWork } from "@/components/home/SelectedWork";
import { LatestVideos } from "@/components/home/LatestVideos";
import { CareerHighlights } from "@/components/home/CareerHighlights";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { BookingCTA } from "@/components/home/BookingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <SelectedWork />
      <LatestVideos />
      <CareerHighlights />
      <GalleryPreview />
      <BookingCTA />
    </>
  );
}
