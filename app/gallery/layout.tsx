import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comatozze Photos — Latest Model & Editorial Gallery",
  description:
    "Curated photo archive and high-resolution modeling gallery featuring Comatozze across editorial, beauty, and fashion looks.",
  alternates: {
    canonical: "https://comatozze.com/gallery",
  },
  openGraph: {
    title: "Comatozze Photos — Latest Model & Editorial Gallery",
    description:
      "Curated photo archive and high-resolution modeling gallery featuring Comatozze across editorial, beauty, and fashion looks.",
    url: "https://comatozze.com/gallery",
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
