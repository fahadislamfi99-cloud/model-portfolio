export interface Project {
  slug: string;
  title: string;
  client: string;
  category: "Editorial" | "Fashion" | "Commercial" | "Beauty" | "Runway";
  year: string;
  image: string;
  aspectRatio: "portrait" | "landscape" | "square";
  description: string;
  featured: boolean;
  credits: {
    creativeDirection: string;
    photography: string;
    styling: string;
    hairMakeup: string;
    location: string;
  };
  gallery: string[];
}

export const workProjects: Project[] = [
  {
    slug: "summer-escape",
    title: "Summer Escape",
    client: "[Luxury Resort & Swimwear]",
    category: "Fashion",
    year: "2024",
    image: "/images/model/comatozze-pool-sunset-1.png",
    aspectRatio: "landscape",
    description:
      "Golden hour poolside campaign featuring clean lines, relaxed luxury swimwear, and warm amber light reflections.",
    featured: true,
    credits: {
      creativeDirection: "[Creative Director]",
      photography: "[Lead Photographer]",
      styling: "[Fashion Stylist]",
      hairMakeup: "[Beauty Lead]",
      location: "[Mediterranean Coast]",
    },
    gallery: [
      "/images/model/comatozze-pool-sunset-1.png",
      "/images/model/comatozze-pool-sunset-2.png",
      "/images/model/comatozze-pool-sunset-3.png",
    ],
  },
  {
    slug: "lumiere-nocturne",
    title: "Editorial Muse",
    client: "[High Fashion Editorial]",
    category: "Editorial",
    year: "2024",
    image: "/images/model/comatozze-balcony-dusk.jpg",
    aspectRatio: "portrait",
    description:
      "Twilight balcony editorial capturing modern sensual silhouettes and delicate lace detailing against an urban backdrop.",
    featured: true,
    credits: {
      creativeDirection: "[Studio Direction]",
      photography: "[Editorial Photographer]",
      styling: "[Editorial Stylist]",
      hairMakeup: "[Hair & Makeup Artist]",
      location: "[Milan, Italy]",
    },
    gallery: [
      "/images/model/image-5-lace-bodysuit.jpg",
      "/images/model/image-6-lace-bodysuit.jpg",
      "/images/model/image-7-lace-bodysuit.jpg",
    ],
  },
  {
    slug: "rose-monochrome",
    title: "Golden Hour Tennis",
    client: "[Athletic Couture & Streetwear]",
    category: "Fashion",
    year: "2024",
    image: "/images/model/comatozze-tennis-court-1.webp",
    aspectRatio: "portrait",
    description:
      "Playful luxury sportswear collection captured on blue court turf under bright Mediterranean sunlight.",
    featured: true,
    credits: {
      creativeDirection: "[Art Department]",
      photography: "[Sports & Fashion Photographer]",
      styling: "[Wardrobe Direction]",
      hairMakeup: "[Beauty Specialist]",
      location: "[Monaco]",
    },
    gallery: [
      "/images/model/comatozze-tennis-court-1.webp",
      "/images/model/comatozze-tennis-court-2.webp",
      "/images/model/comatozze-tennis-court-3.webp",
      "/images/model/comatozze-tennis-court-4.webp",
    ],
  },
  {
    slug: "atelier-movement",
    title: "Urban Elegance",
    client: "[Contemporary Street Capsule]",
    category: "Commercial",
    year: "2023",
    image: "/images/model/comatozze-denim-urban.jpg",
    aspectRatio: "portrait",
    description:
      "Effortless urban styling showcasing casual luxury, high-waisted denim, and natural outdoor natural light.",
    featured: true,
    credits: {
      creativeDirection: "[Design Studio]",
      photography: "[Motion & Stills Director]",
      styling: "[Studio Stylist]",
      hairMakeup: "[Editorial Grooming]",
      location: "[Paris, France]",
    },
    gallery: [
      "/images/model/comatozze-denim-urban.jpg",
      "/images/model/comatozze-park-burgundy.jpg",
      "/images/model/comatozze-white-tank-couch.jpg",
    ],
  },
];
