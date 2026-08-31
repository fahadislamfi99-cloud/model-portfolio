import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comatozze — Modeling Work & Portfolio",
  description:
    "Explore selected fashion campaigns, runway archives, and luxury editorial modeling work by Comatozze.",
  alternates: {
    canonical: "https://comatozze.neonweb.xyz/work",
  },
  openGraph: {
    title: "Comatozze Modeling Campaigns — Selected Commercial Work",
    description:
      "Selected editorial features, runway appearances, and brand partnerships with Comatozze.",
    url: "https://comatozze.neonweb.xyz/work",
    images: ["/images/model/comatozze-hero-poolside.jpg"],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
