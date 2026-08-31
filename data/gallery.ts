export interface GalleryItem {
  id: string;
  title: string;
  category: "Editorial" | "Fashion" | "Beauty" | "Portrait" | "Runway";
  src: string;
  alt: string;
  aspect: "tall" | "wide" | "square";
  year: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g-01",
    title: "Poolside Glow",
    category: "Fashion",
    src: "/images/model/comatozze-hero-poolside.jpg",
    alt: "Comatozze poolside summer portrait",
    aspect: "tall",
    year: "2024",
  },
  {
    id: "g-02",
    title: "Lace Bodysuit Balcony Study",
    category: "Editorial",
    src: "/images/model/image-5-lace-bodysuit.jpg",
    alt: "Comatozze in black lace bodysuit",
    aspect: "tall",
    year: "2024",
  },
  {
    id: "g-03",
    title: "Golden Hour Saree",
    category: "Beauty",
    src: "/images/model/comatozze-saree-gold.jpg",
    alt: "Comatozze emerald and gold saree portrait",
    aspect: "tall",
    year: "2024",
  },
  {
    id: "g-04",
    title: "Tennis Court Activewear",
    category: "Fashion",
    src: "/images/model/comatozze-tennis-court-1.webp",
    alt: "Comatozze tennis court editorial pose",
    aspect: "tall",
    year: "2024",
  },
  {
    id: "g-05",
    title: "Sunset Swim Stills",
    category: "Editorial",
    src: "/images/model/comatozze-pool-sunset-1.png",
    alt: "Comatozze pool sunset reflection",
    aspect: "wide",
    year: "2024",
  },
  {
    id: "g-06",
    title: "Close-up Editorial Gaze",
    category: "Portrait",
    src: "/images/model/comatozze-face-closeup.jpg",
    alt: "Comatozze delicate beauty close-up",
    aspect: "tall",
    year: "2024",
  },
  {
    id: "g-07",
    title: "Burgundy Park Casual",
    category: "Fashion",
    src: "/images/model/comatozze-park-burgundy.jpg",
    alt: "Comatozze outdoor candid portrait",
    aspect: "tall",
    year: "2023",
  },
  {
    id: "g-08",
    title: "Urban Denim & Balcony",
    category: "Editorial",
    src: "/images/model/comatozze-denim-urban.jpg",
    alt: "Comatozze denim chic styling",
    aspect: "tall",
    year: "2023",
  },
  {
    id: "g-09",
    title: "Tennis Serenity",
    category: "Fashion",
    src: "/images/model/comatozze-tennis-court-2.webp",
    alt: "Comatozze tennis court sunlit portrait",
    aspect: "tall",
    year: "2024",
  },
  {
    id: "g-10",
    title: "Sofa Lounge Profile",
    category: "Beauty",
    src: "/images/model/comatozze-white-tank-couch.jpg",
    alt: "Comatozze relaxed indoor portrait",
    aspect: "tall",
    year: "2023",
  },
  {
    id: "g-11",
    title: "Balcony Lace Silhouette",
    category: "Editorial",
    src: "/images/model/image-7-lace-bodysuit.jpg",
    alt: "Comatozze architectural lingerie frame",
    aspect: "tall",
    year: "2024",
  },
  {
    id: "g-12",
    title: "Poolside Sunset Arch",
    category: "Fashion",
    src: "/images/model/comatozze-pool-sunset-3.png",
    alt: "Comatozze swimming pool sunset pose",
    aspect: "wide",
    year: "2024",
  },
];
