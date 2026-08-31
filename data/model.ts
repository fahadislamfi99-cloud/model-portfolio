export interface ModelProfile {
  name: string;
  descriptor: string;
  label: string;
  tagline: string;
  statement: string;
  intro: string;
  bioShort: string;
  bioLong: string[];
  stats: {
    height: string;
    bust: string;
    waist: string;
    hips: string;
    hair: string;
    eyes: string;
    dress: string;
    shoe: string;
    location: string;
    languages: string;
    specialties: string[];
  };
  contact: {
    bookingEmail: string;
    pressEmail: string;
    agency: string;
    agencyLocation: string;
    instagram: string;
    instagramHandle: string;
  };
}

export const modelData: ModelProfile = {
  name: "COMATOZZE",
  descriptor: "MODEL",
  label: "MODEL · MUSE · CREATIVE",
  tagline: "Confidence is my signature.",
  statement: "A professional model bringing stories to life through expression, style and timeless beauty.",
  intro: "Editorial presence defined by sculptural elegance, architectural poise, and modern feminine confidence.",
  bioShort:
    "Comatozze is a professional model collaborating with luxury fashion houses, independent designers, and editorial publications across international fashion capitals. Her work bridges classical poise with modern sensual minimalism.",
  bioLong: [
    "Stepping into the fashion industry with a distinct perspective on modern femininity, Comatozze has carved a distinct editorial presence through high-concept campaigns, runway presentations, and cinematic fashion films.",
    "Known for her expressive range, sculptural posture, and precision in front of the lens, she works closely with creative directors, photographers, and stylists who seek an uncompromising commitment to artistic vision.",
    "Her portfolio spans high-fashion editorial spreads, fine jewelry campaigns, and contemporary ready-to-wear presentations, consistently delivering imagery that resonates with depth, elegance, and intentional restraint."
  ],
  stats: {
    height: "[Height]",
    bust: "[Bust]",
    waist: "[Waist]",
    hips: "[Hips]",
    hair: "[Hair Color]",
    eyes: "[Eye Color]",
    dress: "[Dress Size]",
    shoe: "[Shoe Size]",
    location: "[Location / Available Worldwide]",
    languages: "[Languages]",
    specialties: [
      "High Fashion Editorial",
      "Runway & Couture",
      "Luxury Commercial",
      "Fine Jewelry & Beauty",
      "Fashion Film & Motion"
    ]
  },
  contact: {
    bookingEmail: "booking@comatozze.com",
    pressEmail: "press@comatozze.com",
    agency: "[Representation / Agency]",
    agencyLocation: "[Paris / Milan / New York]",
    instagram: "https://instagram.com",
    instagramHandle: "@comatozze"
  }
};
