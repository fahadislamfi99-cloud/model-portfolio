import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all photos or filtered by section
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    const db = await getDatabase();
    const query = section ? { section } : {};
    const photos = await db
      .collection("photos")
      .find(query)
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, photos });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Database fetch error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST create new photo
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, url, section, category, aspect, altText, order } = body;

    if (!url) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    const db = await getDatabase();
    const photoDoc = {
      title: title || "Untitled Look",
      url,
      section: section || "Gallery", // 'Hero', 'About', 'Selected Work', 'Gallery Strip', 'Gallery'
      category: category || "Fashion",
      aspect: aspect || "tall", // 'tall', 'wide', 'square'
      altText: altText || "Comatozze model photo",
      order: order !== undefined ? Number(order) : 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("photos").insertOne(photoDoc);
    return NextResponse.json({ success: true, photo: { ...photoDoc, _id: result.insertedId } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Create photo error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT update photo
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Photo ID required" }, { status: 400 });
    }

    const db = await getDatabase();
    updates.updatedAt = new Date();

    const result = await db
      .collection("photos")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update photo error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE remove photo
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Photo ID required" }, { status: 400 });
    }

    const db = await getDatabase();
    await db.collection("photos").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: "Photo deleted" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Delete photo error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
