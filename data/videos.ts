export interface VideoItem {
  slug: string;
  title: string;
  category: string;
  year: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  client: string;
  director: string;
  description: string;
}

export const videosData: VideoItem[] = [
  {
    slug: "editorial-motion",
    title: "Editorial Motion & Poise",
    category: "FASHION REEL",
    year: "2024",
    duration: "00:30",
    thumbnail: "/images/model/comatozze-saree-gold.jpg",
    videoUrl: "/videos/comatozze-reel-1.mp4",
    client: "[Luxury Fashion Editorial]",
    director: "[Director Name]",
    description:
      "A cinematic vertical motion study capturing fluid grace, statuesque poses, and light play in couture attire."
  },
  {
    slug: "golden-hour-atmosphere",
    title: "Golden Hour Atmosphere",
    category: "SUMMER REEL",
    year: "2024",
    duration: "00:24",
    thumbnail: "/images/model/comatozze-pool-sunset-2.png",
    videoUrl: "/videos/comatozze-reel-2.mp4",
    client: "[Resort & Swimwear Collection]",
    director: "[Film Director]",
    description:
      "Golden reflections and relaxed elegance captured beside serene waters during twilight."
  },
  {
    slug: "behind-the-scenes",
    title: "Behind The Scenes & Styling",
    category: "BTS REEL",
    year: "2023",
    duration: "00:45",
    thumbnail: "/images/model/image-6-lace-bodysuit.jpg",
    videoUrl: "/videos/comatozze-reel-3.mp4",
    client: "[Atelier Collective]",
    director: "[Visual Artist]",
    description:
      "Intimate behind-the-scenes moments showcasing hair, makeup, wardrobe calibration, and on-set focus."
  }
];
