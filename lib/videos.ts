export interface UnifiedVideo {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  format: "reel" | "widescreen";
  telegramUrl: string;
  description: string;
  views: number;
  likes: number;
  order: number;
}

// Generate consistent baseline fake views and likes based on video identifier
export function getBaselineStats(identifier: string, isLongVideo: boolean) {
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    hash = (hash << 5) - hash + identifier.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  // Widescreen long videos: 18K - 65K views, 2.1K - 8.4K likes
  // Reels: 12K - 48K views, 1.4K - 5.8K likes
  const baseViews = isLongVideo
    ? 18000 + (absHash % 47000)
    : 12000 + (absHash % 36000);
  const baseLikes = Math.floor(baseViews * (0.11 + (absHash % 50) / 1000));

  return { views: baseViews, likes: baseLikes };
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
