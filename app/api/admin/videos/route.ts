import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all videos or filtered by format ('reel' or 'widescreen')
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format"); // 'reel' or 'widescreen'

    const db = await getDatabase();
    const query = format ? { format } : {};
    const videos = await db
      .collection("videos")
      .find(query)
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, videos });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Database fetch error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST create new video
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      videoUrl,
      thumbnail,
      category,
      format,
      duration,
      telegramUrl,
      description,
      order,
    } = body;

    if (!videoUrl) {
      return NextResponse.json({ error: "Video file/URL is required" }, { status: 400 });
    }

    const db = await getDatabase();
    const videoDoc = {
      title: title || "New Video",
      videoUrl,
      thumbnail: thumbnail || "/images/model/comatozze-pool-sunset-1.png",
      category: category || (format === "widescreen" ? "WIDESCREEN FEATURE" : "FASHION REEL"),
      format: format || "widescreen", // 'reel' (9:16) or 'widescreen' (16:9)
      duration: duration || (format === "widescreen" ? "15:42" : "00:30"), // Fake or real duration
      telegramUrl: telegramUrl || "https://t.me/comatozze_new",
      description: description || "Exclusive video feature with uncut footage on Telegram.",
      order: order !== undefined ? Number(order) : 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("videos").insertOne(videoDoc);
    return NextResponse.json({ success: true, video: { ...videoDoc, _id: result.insertedId } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Create video error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT update video
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Video ID required" }, { status: 400 });
    }

    const db = await getDatabase();
    updates.updatedAt = new Date();

    const result = await db
      .collection("videos")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update video error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE remove video
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Video ID required" }, { status: 400 });
    }

    const db = await getDatabase();
    await db.collection("videos").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: "Video deleted" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Delete video error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
