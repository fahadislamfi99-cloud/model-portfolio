import { getDatabase } from "@/lib/mongodb";
import { videosData } from "@/data/videos";
import { UnifiedVideo, getBaselineStats, slugify } from "@/lib/videos";

export async function getAllVideos(): Promise<UnifiedVideo[]> {
  const staticVideos: UnifiedVideo[] = videosData.map((v, idx) => {
    const isWidescreen = !v.category.toLowerCase().includes("reel");
    const stats = getBaselineStats(v.slug, isWidescreen);
    return {
      id: v.slug,
      slug: v.slug,
      title: v.title,
      category: v.category,
      year: v.year || "2026",
      duration: v.duration,
      thumbnail: v.thumbnail || "/images/model/comatozze-pool-sunset-1.png",
      videoUrl: v.videoUrl,
      format: isWidescreen ? "widescreen" : "reel",
      telegramUrl: "https://t.me/comatozze_new",
      description: v.description,
      views: stats.views,
      likes: stats.likes,
      order: idx,
    };
  });

  try {
    const db = await getDatabase();
    const dbVideos = await db
      .collection("videos")
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    if (!dbVideos || dbVideos.length === 0) {
      return staticVideos;
    }

    const formattedDb: UnifiedVideo[] = dbVideos.map((v, idx) => {
      const vidId = v._id.toString();
      const format = v.format || (v.videoUrl?.includes("reel") ? "reel" : "widescreen");
      const generatedSlug = v.slug || slugify(v.title || `video-${vidId}`);
      const stats = getBaselineStats(vidId, format === "widescreen");
      const extraLikes = typeof v.likes === "number" ? v.likes : 0;
      const extraViews = typeof v.views === "number" ? v.views : 0;

      return {
        id: vidId,
        slug: generatedSlug,
        title: v.title || "Comatozze Video Feature",
        category: v.category || (format === "widescreen" ? "WIDESCREEN FEATURE" : "FASHION REEL"),
        year: v.year || "2026",
        duration: v.duration || (format === "widescreen" ? "15:42" : "00:30"),
        thumbnail: v.thumbnail || "/images/model/comatozze-pool-sunset-1.png",
        videoUrl: v.videoUrl,
        format: format as "reel" | "widescreen",
        telegramUrl: v.telegramUrl || "https://t.me/comatozze_new",
        description: v.description || "Exclusive official video starring Comatozze.",
        views: stats.views + extraViews,
        likes: stats.likes + extraLikes,
        order: v.order !== undefined ? v.order : idx,
      };
    });

    const dbTitles = new Set(formattedDb.map((v) => v.title.toLowerCase().trim()));
    return [
      ...formattedDb,
      ...staticVideos.filter((v) => !dbTitles.has(v.title.toLowerCase().trim())),
    ];
  } catch {
    return staticVideos;
  }
}

export async function getVideoBySlugOrId(slugOrId: string): Promise<UnifiedVideo | null> {
  const all = await getAllVideos();
  const found = all.find(
    (v) =>
      v.slug.toLowerCase() === slugOrId.toLowerCase() ||
      v.id.toLowerCase() === slugOrId.toLowerCase() ||
      slugify(v.title) === slugOrId.toLowerCase()
  );
  return found || null;
}
