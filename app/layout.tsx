import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/motion/Preloader";
import { modelData } from "@/data/model";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://comatozze.com"),
  title: {
    default: "Comatozze — Professional Fashion & Editorial Model",
    template: "%s | Comatozze",
  },
  description:
    "Official editorial portfolio of Comatozze. International fashion model specializing in luxury campaigns, haute couture runway, and cinematic fashion films.",
  keywords: [
    "Comatozze",
    "Comatozze model",
    "Comatozze portfolio",
    "Comatozze fashion model",
    "Comatozze editorial model",
    "luxury fashion model",
    "runway model",
  ],
  authors: [{ name: "Comatozze" }],
  creator: "Comatozze",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://comatozze.com",
    title: "Comatozze — Professional Fashion & Editorial Model",
    description:
      "Official portfolio of Comatozze. International fashion model specializing in luxury campaigns, haute couture runway, and cinematic fashion films.",
    siteName: "Comatozze Model Portfolio",
    images: [
      {
        url: "/images/hero/comatozze-hero.jpg",
        width: 1200,
        height: 1600,
        alt: "Comatozze high-fashion model portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comatozze — Professional Fashion & Editorial Model",
    description:
      "Official portfolio of Comatozze. International fashion model specializing in luxury campaigns, haute couture runway, and cinematic fashion films.",
    images: ["/images/hero/comatozze-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Comatozze",
    jobTitle: "Fashion & Editorial Model",
    image: "https://comatozze.com/images/hero/comatozze-hero.jpg",
    description: modelData.statement,
    url: "https://comatozze.com",
    sameAs: [modelData.contact.instagram],
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${greatVibes.variable} antialiased selection:bg-[#EED7DA] selection:text-[#191617]`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-[#191617] font-sans flex flex-col">
        <Preloader />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
