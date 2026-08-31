import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comatozze Videos — Latest & New Modeling Videos",
  description:
    "Watch the latest fashion films, widescreen cinematic features, and vertical motion studies starring Comatozze.",
  alternates: {
    canonical: "https://comatozze.com/videos",
  },
  openGraph: {
    title: "Comatozze Videos — Latest & New Modeling Videos",
    description:
      "Watch the latest fashion films, widescreen cinematic features, and vertical motion studies starring Comatozze.",
    url: "https://comatozze.com/videos",
    images: ["/images/model/comatozze-pool-sunset-1.png"],
  },
};

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
