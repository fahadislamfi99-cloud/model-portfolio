import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comatozze Photos — Latest Model & Editorial Gallery",
  description:
    "Curated photo archive and high-resolution modeling gallery featuring Comatozze across editorial, beauty, and fashion looks.",
  alternates: {
    canonical: "https://comatozze.neonweb.xyz/gallery",
  },
  openGraph: {
    title: "Comatozze Photo Gallery — Editorial & Modeling Archive",
    description:
      "Explore the curated photo gallery of Comatozze, featuring high-fashion editorial portraits, swimsuit collections, and artistic visuals.",
    url: "https://comatozze.neonweb.xyz/gallery",
    images: ["/images/model/comatozze-saree-gold.jpg"],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
