import { MetadataRoute } from "next";
import { workProjects } from "@/data/work";
import { getAllVideos } from "@/lib/videos.server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://comatozze.neonweb.xyz";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const workRoutes: MetadataRoute.Sitemap = workProjects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const allVideos = await getAllVideos();
  const videoRoutes: MetadataRoute.Sitemap = allVideos.map((v) => ({
    url: `${baseUrl}/videos/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...workRoutes, ...videoRoutes];
}
