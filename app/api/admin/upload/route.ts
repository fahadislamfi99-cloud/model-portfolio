import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string) || "photos"; // 'photos', 'videos', or 'thumbnails'

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine resource type for Cloudinary: 'video' or 'image'
    const isVideo = type === "videos" || file.type.startsWith("video/");
    const resource_type = isVideo ? "video" : "image";
    const folder = `comatozze/${type}`;

    // Upload to Cloudinary via stream
    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type,
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        }
      );

      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      duration: uploadResult.duration,
      size: uploadResult.bytes,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Cloudinary upload error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
