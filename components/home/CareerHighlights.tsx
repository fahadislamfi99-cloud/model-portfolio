import { Crown, Camera, Globe, Star, BookOpen } from "lucide-react";

const stats = [
  {
    icon: Crown,
    value: "5+",
    label: "Years of Experience",
  },
  {
    icon: Camera,
    value: "50+",
    label: "Projects Completed",
  },
  {
    icon: Globe,
    value: "12+",
    label: "Countries Worked",
  },
  {
    icon: Star,
    value: "30+",
    label: "Brands Collaborated",
  },
  {
    icon: BookOpen,
    value: "15+",
    label: "Editorial Publications",
  },
];

export function CareerHighlights() {
  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#EFE8E6]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <span className="text-[10px] tracking-[0.3em] text-[#D85E78] font-sans font-semibold uppercase block mb-12">
          CAREER HIGHLIGHTS
        </span>

        {/* 5 Column Stats Row with Thin Pink Connecting Timeline */}
        <div className="relative">
          {/* Subtle horizontal connecting line */}
          <div className="hidden md:block absolute top-4 left-12 right-12 h-[1px] bg-[#EFE8E6] z-0" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative z-10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-start space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#D85E78] mb-1">
                    <Icon className="w-5 h-5 stroke-[1.4]" />
                  </div>
                  <span className="font-editorial-serif text-3xl sm:text-4xl text-[#1A1718] font-normal">
                    {stat.value}
                  </span>
                  <p className="text-[11px] font-sans text-[#7A7273] leading-snug">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
