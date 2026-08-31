"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { workProjects } from "@/data/work";

const categories = ["ALL", "EDITORIAL", "FASHION", "COMMERCIAL", "BEAUTY", "RUNWAY"] as const;

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const filteredProjects =
    activeCategory === "ALL"
      ? workProjects
      : workProjects.filter(
          (p) => p.category.toUpperCase() === activeCategory
        );

  return (
    <div className="pt-32 pb-24 md:pb-36 bg-[#FAF8F5]">
      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Page Header */}
        <div className="border-b border-[#E8DFDC] pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
              PORTFOLIO ARCHIVE
            </span>
            <h1 className="font-editorial-serif text-5xl sm:text-7xl lg:text-8xl text-[#191617] font-light mt-3 tracking-wide">
              Selected <span className="italic">Work</span>
            </h1>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-4">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] tracking-[0.25em] font-sans uppercase px-4 py-2 border transition-all duration-200 ${
                    active
                      ? "bg-[#191617] text-[#FAF8F5] border-[#191617]"
                      : "bg-transparent text-[#191617] border-[#E8DFDC] hover:border-[#191617]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards (Editorial Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredProjects.map((project, idx) => (
            <article key={project.slug} className="group flex flex-col space-y-4">
              <Link
                href={`/work/${project.slug}`}
                className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7EFEF] border border-[#E8DFDC] block"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.category} editorial`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#191617]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4 text-[9px] tracking-[0.3em] font-sans uppercase px-2.5 py-1 bg-[#FAF8F5]/90 text-[#191617] backdrop-blur-sm">
                  0{idx + 1}
                </div>
              </Link>

              <div className="flex items-baseline justify-between pt-1 border-b border-[#E8DFDC] pb-3">
                <div>
                  <span className="text-[10px] tracking-[0.25em] font-sans uppercase text-[#C98A90] block mb-1">
                    {project.category} · {project.year}
                  </span>
                  <Link href={`/work/${project.slug}`}>
                    <h2 className="font-editorial-serif text-2xl sm:text-3xl text-[#191617] group-hover:text-[#C98A90] transition-colors">
                      {project.title}
                    </h2>
                  </Link>
                  <p className="text-xs text-[#7A7273] font-sans mt-0.5">
                    {project.client}
                  </p>
                </div>
                <Link
                  href={`/work/${project.slug}`}
                  aria-label={`View ${project.title} project details`}
                >
                  <ArrowUpRight className="w-4 h-4 text-[#7A7273] group-hover:text-[#191617] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
