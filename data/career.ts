export interface CareerMilestone {
  year: string;
  title: string;
  category: string;
  description: string;
  location: string;
}

export interface CareerStat {
  value: string;
  label: string;
  note: string;
}

export const careerTimeline: CareerMilestone[] = [
  {
    year: "2026",
    title: "Global Capsule Presentation",
    category: "CAMPAIGN",
    description: "Lead model for international luxury house Spring/Summer digital showcase.",
    location: "Paris"
  },
  {
    year: "2025",
    title: "Milan Ready-to-Wear Presentations",
    category: "RUNWAY",
    description: "Walked for premier Italian ateliers across Milan Fashion Week schedule.",
    location: "Milan"
  },
  {
    year: "2024",
    title: "International Magazine Cover & Editorial",
    category: "EDITORIAL",
    description: "Ten-page solo fashion spread focusing on architectural tailoring and jewelry.",
    location: "New York"
  },
  {
    year: "2023",
    title: "Boutique Fragrance & Beauty Muse",
    category: "BEAUTY",
    description: "Global digital and print campaign for boutique artisanal perfumery.",
    location: "London"
  },
  {
    year: "2022",
    title: "European Runway Debut",
    category: "MILESTONE",
    description: "First official catwalk season for contemporary European designer collective.",
    location: "Paris"
  }
];

export const careerStats: CareerStat[] = [
  {
    value: "05+",
    label: "Years in Industry",
    note: "Professional runway & studio experience"
  },
  {
    value: "50+",
    label: "Projects Completed",
    note: "Campaigns, editorials & lookbooks"
  },
  {
    value: "12+",
    label: "Countries Worked",
    note: "Paris, Milan, New York, Tokyo, Vienna"
  },
  {
    value: "30+",
    label: "Designers & Brands",
    note: "Couture, luxury RTW & accessories"
  },
  {
    value: "15+",
    label: "Editorial Spreads",
    note: "Print & digital publications"
  }
];
