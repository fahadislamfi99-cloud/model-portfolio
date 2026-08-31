import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
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
  metadataBase: new URL("https://comatozze.neonweb.xyz"),
  title: {
    default: "Comatozze — Official Model Portfolio, Photos & Videos",
    template: "%s | Comatozze",
  },
  description:
    "Explore Comatozze's official model portfolio, latest videos, editorial photos, career highlights, modeling work and verified social profiles.",
  keywords: [
    "Comatozze",
    "Comatozze model",
    "Comatozze profile",
    "Comatozze biography",
    "Comatozze portfolio",
    "Comatozze latest video",
    "Comatozze new video",
    "Comatozze latest photos",
    "Comatozze Instagram",
    "Comatozze videos",
    "Comatozze gallery",
    "Uma North",
    "Uma North model",
  ],
  authors: [{ name: "Comatozze", url: "https://comatozze.neonweb.xyz" }],
  creator: "Comatozze",
  alternates: {
    canonical: "https://comatozze.neonweb.xyz",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://comatozze.neonweb.xyz",
    title: "Comatozze — Official Model Portfolio, Photos & Videos",
    description:
      "Explore Comatozze's official model portfolio, latest videos, editorial photos, career highlights, modeling work and verified social profiles.",
    siteName: "Comatozze",
    images: [
      {
        url: "/images/model/comatozze-hero-poolside.jpg",
        width: 1200,
        height: 1600,
        alt: "Comatozze official model portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comatozze — Official Model Portfolio, Photos & Videos",
    description:
      "Explore Comatozze's official model portfolio, latest videos, editorial photos, career highlights, modeling work and verified social profiles.",
    images: ["/images/model/comatozze-hero-poolside.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "MaeD821bEDTG4zdAERGgoJk67h6eyQvPmbd92HRw3mo",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-PZMH9J70LT";

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Comatozze",
    alternateName: ["Uma North", "UmaNorth"],
    jobTitle: "Model & Content Creator",
    image: "https://comatozze.neonweb.xyz/images/model/comatozze-hero-poolside.jpg",
    description:
      "Comatozze is an independent model and content creator known for editorial fashion, atmospheric films, and natural feminine confidence.",
    url: "https://comatozze.neonweb.xyz",
    sameAs: [
      "https://fansly.com/comatozze",
      "https://instagram.com/umaanorth",
      "https://t.me/comatozze_new",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Comatozze",
    url: "https://comatozze.neonweb.xyz",
    description:
      "Official website and model portfolio of Comatozze, featuring editorial photos, latest videos, career biography, and verified platform hubs.",
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${greatVibes.variable} antialiased selection:bg-[#EED7DA] selection:text-[#191617]`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-[#191617] font-sans flex flex-col">
        <Preloader />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
