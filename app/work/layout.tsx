import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comatozze — Modeling Work & Portfolio",
  description:
    "Explore selected fashion campaigns, runway archives, and luxury editorial modeling work by Comatozze.",
  alternates: {
    canonical: "https://comatozze.com/work",
  },
  openGraph: {
    title: "Comatozze — Modeling Work & Portfolio",
    description:
      "Explore selected fashion campaigns, runway archives, and luxury editorial modeling work by Comatozze.",
    url: "https://comatozze.com/work",
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
