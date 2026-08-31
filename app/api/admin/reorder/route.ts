import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// PUT batch reorder items (photos or videos)
export async function PUT(request: Request) {
  try {
    const { items, collection } = await request.json(); // collection: 'videos' | 'photos'

    if (!Array.isArray(items) || !collection) {
      return NextResponse.json({ error: "Invalid items or collection" }, { status: 400 });
    }

    const db = await getDatabase();
    const col = db.collection(collection);

    const bulkOps = items.map((item: { id: string; order: number }) => ({
      updateOne: {
        filter: { _id: new ObjectId(item.id) },
        update: { $set: { order: item.order, updatedAt: new Date() } },
      },
    }));

    if (bulkOps.length > 0) {
      await col.bulkWrite(bulkOps);
    }

    return NextResponse.json({ success: true, count: bulkOps.length });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Reorder error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
