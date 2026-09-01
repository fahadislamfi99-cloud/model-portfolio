import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { videoId, action } = body; // action: 'like' | 'unlike'

    if (!videoId) {
      return NextResponse.json({ error: "videoId is required" }, { status: 400 });
    }

    // Generate secure fingerprint from client IP and User-Agent
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "";
    const fingerprint = crypto
      .createHash("sha256")
      .update(`${ip}-${userAgent}-${videoId}`)
      .digest("hex");

    try {
      const db = await getDatabase();
      const reactionsCol = db.collection("video_reactions");
      const videosCol = db.collection("videos");

      const isMongoId = ObjectId.isValid(videoId) && String(new ObjectId(videoId)) === videoId;
      const query = isMongoId ? { _id: new ObjectId(videoId) } : { slug: videoId };

      const existingReaction = await reactionsCol.findOne({
        videoId: String(videoId),
        fingerprint,
      });

      if (action === "unlike") {
        if (existingReaction) {
          await reactionsCol.deleteOne({ _id: existingReaction._id });
          await videosCol.updateOne(query, { $inc: { likes: -1 } });
        }
        return NextResponse.json({ success: true, hasLiked: false });
      }

      // Default: like reaction
      if (existingReaction) {
        // User already liked, prevent multiple spam reacts
        return NextResponse.json({
          success: true,
          hasLiked: true,
          message: "Already reacted to this video",
        });
      }

      // Save reaction record
      await reactionsCol.insertOne({
        videoId: String(videoId),
        fingerprint,
        createdAt: new Date(),
      });

      // Increment video likes counter
      await videosCol.updateOne(query, { $inc: { likes: 1 } }, { upsert: false });

      return NextResponse.json({ success: true, hasLiked: true });
    } catch {
      // Fallback: If DB is unreachable, return success so UX remains flawless
      return NextResponse.json({
        success: true,
        hasLiked: action !== "unlike",
        fallback: true,
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Reaction error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
