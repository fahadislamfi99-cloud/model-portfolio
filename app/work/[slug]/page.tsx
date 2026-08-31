import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { workProjects } from "@/data/work";

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return workProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Comatozze Model Work`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Comatozze`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailProps) {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const related = workProjects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="pt-32 pb-24 md:pb-36 bg-[#FAF8F5]">
      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Back Link */}
        <Link
          href="/work"
          className="inline-flex items-center space-x-2 text-xs tracking-[0.25em] font-sans uppercase text-[#7A7273] hover:text-[#191617] mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO PORTFOLIO</span>
        </Link>

        {/* Project Header */}
        <div className="border-b border-[#E8DFDC] pb-12 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
              {project.category} · {project.year}
            </span>
            <h1 className="font-editorial-serif text-5xl sm:text-7xl lg:text-8xl text-[#191617] font-light mt-3 tracking-wide">
              {project.title}
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#7A7273] mt-6 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Credits Box */}
          <div className="lg:col-span-4 border-l border-[#E8DFDC] pl-6 lg:pl-10 space-y-3 text-xs font-sans">
            <div>
              <span className="text-[10px] tracking-[0.2em] text-[#7A7273] uppercase block">CLIENT</span>
              <span className="text-[#191617] font-medium">{project.client}</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] text-[#7A7273] uppercase block">PHOTOGRAPHY</span>
              <span className="text-[#191617]">{project.credits.photography}</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] text-[#7A7273] uppercase block">STYLING</span>
              <span className="text-[#191617]">{project.credits.styling}</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] text-[#7A7273] uppercase block">LOCATION</span>
              <span className="text-[#191617]">{project.credits.location}</span>
            </div>
          </div>
        </div>

        {/* Primary Hero Campaign Photograph */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F7EFEF] border border-[#E8DFDC] mb-16">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Supporting Editorial Gallery Spread */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-24">
            <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium block mb-8">
              CAMPAIGN SPREAD & STILLS
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] overflow-hidden bg-[#F7EFEF] border border-[#E8DFDC]"
                >
                  <Image
                    src={img}
                    alt={`${project.title} editorial frame ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        <div className="border-t border-[#E8DFDC] pt-16">
          <div className="flex justify-between items-center mb-10">
            <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
              MORE CAMPAIGNS
            </span>
            <Link
              href="/work"
              className="text-xs tracking-[0.25em] font-sans uppercase text-[#191617] hover:text-[#C98A90]"
            >
              VIEW ALL
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/work/${rel.slug}`}
                className="group flex flex-col space-y-3"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F7EFEF] border border-[#E8DFDC]">
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-baseline border-b border-[#E8DFDC] pb-2">
                  <h3 className="font-editorial-serif text-2xl text-[#191617] group-hover:text-[#C98A90] transition-colors">
                    {rel.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#7A7273] group-hover:text-[#191617]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
