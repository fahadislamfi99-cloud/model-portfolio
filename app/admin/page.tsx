"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Image as ImageIcon,
  Video,
  Upload,
  Trash2,
  Edit2,
  Plus,
  LogOut,
  ExternalLink,
  Loader2,
  CheckCircle,
  AlertCircle,
  Play,
  Layers,
} from "lucide-react";

interface PhotoItem {
  _id: string;
  title: string;
  url: string;
  section: string;
  category: string;
  aspect: string;
  altText: string;
  order: number;
}

interface VideoDoc {
  _id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
  format: "reel" | "widescreen";
  duration: string;
  telegramUrl: string;
  description: string;
  order: number;
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<"photos" | "videos">("photos");

  // Photos State
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  // Videos State
  const [videos, setVideos] = useState<VideoDoc[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  // Upload/Form States
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New Photo Modal
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoForm, setPhotoForm] = useState({
    title: "",
    section: "Gallery",
    category: "Fashion",
    aspect: "tall",
    altText: "",
    file: null as File | null,
    previewUrl: "",
    order: 0,
  });

  // New/Edit Video Modal
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoForm, setVideoForm] = useState({
    id: "",
    title: "",
    category: "FASHION REEL",
    format: "reel" as "reel" | "widescreen",
    duration: "15:42",
    telegramUrl: "https://t.me/comatozze_new",
    description: "",
    videoFile: null as File | null,
    thumbnailFile: null as File | null,
    existingVideoUrl: "",
    existingThumbnail: "",
    order: 0,
  });

  // Deleting State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch data
  const fetchPhotos = async () => {
    setLoadingPhotos(true);
    try {
      const res = await fetch("/api/admin/photos");
      const data = await res.json();
      if (data.success) setPhotos(data.photos);
    } catch {
      showToast("error", "Failed to load photos from MongoDB");
    } finally {
      setLoadingPhotos(false);
    }
  };

  const fetchVideos = async () => {
    setLoadingVideos(true);
    try {
      const res = await fetch("/api/admin/videos");
      const data = await res.json();
      if (data.success) setVideos(data.videos);
    } catch {
      showToast("error", "Failed to load videos from MongoDB");
    } finally {
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
    fetchVideos();
  }, []);

  // Logout
  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  // Upload progress state
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  // Direct signed Cloudinary upload with real-time percentage progress
  const uploadFile = async (
    file: File,
    type: "photos" | "videos" | "thumbnails",
    label = "file"
  ) => {
    setUploadStatus(`Signing ${label}...`);
    setUploadProgress(0);

    try {
      const folder = `comatozze/${type}`;
      const signRes = await fetch("/api/admin/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      const signData = await signRes.json();
      if (!signRes.ok || !signData.signature) {
        throw new Error(signData.error || "Failed to generate upload signature");
      }

      const isVideo = type === "videos" || file.type.startsWith("video/");
      const resourceType = isVideo ? "video" : "image";
      const uploadUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/${resourceType}/upload`;

      const directForm = new FormData();
      directForm.append("file", file);
      directForm.append("api_key", signData.apiKey);
      directForm.append("timestamp", String(signData.timestamp));
      directForm.append("signature", signData.signature);
      directForm.append("folder", signData.folder);

      setUploadStatus(`Uploading ${label} to Cloudinary...`);

      // Upload with real-time progress via XMLHttpRequest
      return await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", uploadUrl);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percent);
          }
        };

        xhr.onload = () => {
          try {
            const data = JSON.parse(xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
              setUploadProgress(100);
              resolve(data.secure_url);
            } else {
              reject(new Error(data.error?.message || `Upload failed with status ${xhr.status}`));
            }
          } catch {
            reject(new Error("Failed to parse Cloudinary response"));
          }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.send(directForm);
      });
    } catch (directErr: unknown) {
      console.warn("Direct upload error, attempting standard fallback:", directErr);
      setUploadStatus(`Uploading ${label} via fallback...`);
      const fd = new FormData();
      fd.append("file", file);
      fd.append("type", type);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "File upload failed");
      return data.url as string;
    }
  };

  // Save Photo
  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoForm.file && !photoForm.previewUrl) {
      showToast("error", "Please choose a photo file to upload");
      return;
    }

    setUploading(true);
    try {
      let finalUrl = photoForm.previewUrl;
      if (photoForm.file) {
        finalUrl = await uploadFile(photoForm.file, "photos", "photo");
      }

      setUploadStatus("Saving photo to database...");

      const res = await fetch("/api/admin/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: photoForm.title || "Comatozze Look",
          url: finalUrl,
          section: photoForm.section,
          category: photoForm.category,
          aspect: photoForm.aspect,
          altText: photoForm.altText || photoForm.title,
          order: photoForm.order,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save photo");

      showToast("success", "Photo uploaded and saved to MongoDB!");
      setShowPhotoModal(false);
      setPhotoForm({
        title: "",
        section: "Gallery",
        category: "Fashion",
        aspect: "tall",
        altText: "",
        file: null,
        previewUrl: "",
        order: 0,
      });
      fetchPhotos();
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Delete Photo
  const handleDeletePhoto = async (id: string) => {
    if (!confirm("Are you sure you want to remove this photo?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/photos?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("success", "Photo deleted successfully");
      fetchPhotos();
    } catch {
      showToast("error", "Could not delete photo");
    } finally {
      setDeletingId(null);
    }
  };

  // Save Video
  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.id && !videoForm.videoFile && !videoForm.existingVideoUrl) {
      showToast("error", "Please choose a video file to upload");
      return;
    }

    setUploading(true);
    try {
      let finalVideoUrl = videoForm.existingVideoUrl;
      let finalThumbnail = videoForm.existingThumbnail || "/images/model/comatozze-pool-sunset-1.png";

      if (videoForm.videoFile) {
        finalVideoUrl = await uploadFile(videoForm.videoFile, "videos", "video file");
      }

      if (videoForm.thumbnailFile) {
        finalThumbnail = await uploadFile(videoForm.thumbnailFile, "thumbnails", "thumbnail image");
      }

      setUploadStatus("Saving video metadata to database...");

      const method = videoForm.id ? "PUT" : "POST";
      const payload = {
        ...(videoForm.id ? { id: videoForm.id } : {}),
        title: videoForm.title || "Comatozze Video Feature",
        videoUrl: finalVideoUrl,
        thumbnail: finalThumbnail,
        category: videoForm.category,
        format: videoForm.format,
        duration: videoForm.duration || (videoForm.format === "widescreen" ? "15:42" : "00:30"),
        telegramUrl: videoForm.telegramUrl || "https://t.me/comatozze_new",
        description: videoForm.description,
        order: videoForm.order,
      };

      const res = await fetch("/api/admin/videos", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save video");

      showToast("success", videoForm.id ? "Video updated!" : "Video uploaded and published!");
      setShowVideoModal(false);
      setVideoForm({
        id: "",
        title: "",
        category: "FASHION REEL",
        format: "reel",
        duration: "15:42",
        telegramUrl: "https://t.me/comatozze_new",
        description: "",
        videoFile: null,
        thumbnailFile: null,
        existingVideoUrl: "",
        existingThumbnail: "",
        order: 0,
      });
      fetchVideos();
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "Video action failed");
    } finally {
      setUploading(false);
    }
  };

  // Delete Video
  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/videos?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("success", "Video removed successfully");
      fetchVideos();
    } catch {
      showToast("error", "Could not delete video");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1718]">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center space-x-2 px-5 py-3 rounded shadow-lg text-xs font-sans transition-all duration-300 ${
            toast.type === "success"
              ? "bg-[#1A1718] text-white border border-[#D85E78]"
              : "bg-rose-600 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-4 h-4 text-[#D85E78]" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#EFE8E6] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" target="_blank" className="flex flex-col items-start">
            <span className="font-editorial-serif text-2xl tracking-[0.16em]">COMATOZZE</span>
            <span className="text-[8px] tracking-[0.3em] uppercase text-[#D85E78] font-sans -mt-0.5">
              ADMIN CONTROL
            </span>
          </Link>
          <span className="hidden sm:inline-block px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-sans rounded-full">
            MongoDB Connected
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center space-x-1 text-xs font-sans text-[#7A7273] hover:text-[#1A1718] px-3 py-2 border border-[#EFE8E6] rounded"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-1.5 text-xs font-sans text-white bg-[#1A1718] hover:bg-[#D85E78] px-4 py-2 rounded transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Navigation Tabs & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE8E6] pb-6 mb-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setTab("photos")}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded font-sans text-xs tracking-wider uppercase font-semibold transition-all ${
                tab === "photos"
                  ? "bg-[#1A1718] text-white shadow-sm"
                  : "bg-white text-[#7A7273] border border-[#EFE8E6] hover:text-[#1A1718]"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photos ({photos.length})</span>
            </button>

            <button
              onClick={() => setTab("videos")}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded font-sans text-xs tracking-wider uppercase font-semibold transition-all ${
                tab === "videos"
                  ? "bg-[#1A1718] text-white shadow-sm"
                  : "bg-white text-[#7A7273] border border-[#EFE8E6] hover:text-[#1A1718]"
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Videos & Reels ({videos.length})</span>
            </button>
          </div>

          <div>
            {tab === "photos" ? (
              <button
                onClick={() => setShowPhotoModal(true)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#D85E78] hover:bg-[#C24B65] text-white text-xs tracking-wider font-sans uppercase font-semibold rounded shadow transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Photo</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setVideoForm({
                    id: "",
                    title: "",
                    category: "FASHION REEL",
                    format: "reel",
                    duration: "15:42",
                    telegramUrl: "https://t.me/comatozze_new",
                    description: "",
                    videoFile: null,
                    thumbnailFile: null,
                    existingVideoUrl: "",
                    existingThumbnail: "",
                    order: 0,
                  });
                  setShowVideoModal(true);
                }}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#D85E78] hover:bg-[#C24B65] text-white text-xs tracking-wider font-sans uppercase font-semibold rounded shadow transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Video / Reel</span>
              </button>
            )}
          </div>
        </div>

        {/* PHOTOS TAB */}
        {tab === "photos" && (
          <div>
            {loadingPhotos ? (
              <div className="py-20 text-center flex flex-col items-center justify-center text-[#7A7273]">
                <Loader2 className="w-8 h-8 animate-spin text-[#D85E78] mb-3" />
                <p className="font-sans text-xs uppercase tracking-widest">Loading Photos from MongoDB...</p>
              </div>
            ) : photos.length === 0 ? (
              <div className="py-16 text-center bg-white border border-[#EFE8E6] rounded p-8">
                <p className="text-sm font-sans text-[#7A7273] mb-4">No photos found in database.</p>
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="px-5 py-2 bg-[#D85E78] text-white text-xs uppercase tracking-wider rounded"
                >
                  Upload First Photo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {photos.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border border-[#EFE8E6] rounded overflow-hidden shadow-xs group flex flex-col justify-between"
                  >
                    <div className="relative aspect-[3/4] w-full bg-[#1A1718] overflow-hidden">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-[9px] font-sans text-white uppercase rounded">
                        {item.section}
                      </div>
                    </div>

                    <div className="p-3">
                      <h4 className="font-editorial-serif text-sm font-semibold truncate text-[#1A1718]">
                        {item.title}
                      </h4>
                      <p className="text-[10px] font-sans text-[#7A7273] truncate mt-0.5">
                        {item.category} · {item.aspect}
                      </p>

                      <div className="mt-3 pt-2 border-t border-[#EFE8E6] flex items-center justify-between">
                        <span className="text-[9px] font-sans text-[#A09899]">
                          Order: {item.order}
                        </span>
                        <button
                          disabled={deletingId === item._id}
                          onClick={() => handleDeletePhoto(item._id)}
                          className="p-1 text-rose-600 hover:text-rose-800 transition-colors disabled:opacity-50"
                          title="Delete photo"
                        >
                          {deletingId === item._id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIDEOS TAB */}
        {tab === "videos" && (
          <div>
            {loadingVideos ? (
              <div className="py-20 text-center flex flex-col items-center justify-center text-[#7A7273]">
                <Loader2 className="w-8 h-8 animate-spin text-[#D85E78] mb-3" />
                <p className="font-sans text-xs uppercase tracking-widest">Loading Videos from MongoDB...</p>
              </div>
            ) : videos.length === 0 ? (
              <div className="py-16 text-center bg-white border border-[#EFE8E6] rounded p-8">
                <p className="text-sm font-sans text-[#7A7273] mb-4">No videos found in database.</p>
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="px-5 py-2 bg-[#D85E78] text-white text-xs uppercase tracking-wider rounded"
                >
                  Add First Video
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((vid) => (
                  <div
                    key={vid._id}
                    className="bg-white border border-[#EFE8E6] rounded overflow-hidden shadow-xs flex flex-col justify-between"
                  >
                    <div
                      className={`relative w-full bg-[#1A1718] overflow-hidden ${
                        vid.format === "reel" ? "aspect-[9/16] max-h-80 mx-auto" : "aspect-video"
                      }`}
                    >
                      <Image
                        src={vid.thumbnail}
                        alt={vid.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 text-white font-sans text-[10px] rounded">
                        {vid.duration}
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#D85E78] text-white font-sans text-[9px] uppercase tracking-wider rounded">
                        {vid.format}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-black/50 border border-white/80 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <span className="text-[9px] tracking-wider uppercase font-sans text-[#D85E78] font-semibold block mb-1">
                        {vid.category}
                      </span>
                      <h4 className="font-editorial-serif text-lg text-[#1A1718] leading-snug">
                        {vid.title}
                      </h4>
                      <p className="text-xs font-sans text-[#7A7273] mt-1 line-clamp-2">
                        {vid.description}
                      </p>

                      <div className="mt-3 pt-3 border-t border-[#EFE8E6] flex items-center justify-between text-xs">
                        <a
                          href={vid.telegramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-sans text-[#229ED9] hover:underline flex items-center space-x-1"
                        >
                          <span>Telegram Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setVideoForm({
                                id: vid._id,
                                title: vid.title,
                                category: vid.category,
                                format: vid.format,
                                duration: vid.duration,
                                telegramUrl: vid.telegramUrl,
                                description: vid.description,
                                videoFile: null,
                                thumbnailFile: null,
                                existingVideoUrl: vid.videoUrl,
                                existingThumbnail: vid.thumbnail,
                                order: vid.order,
                              });
                              setShowVideoModal(true);
                            }}
                            className="p-1 text-slate-600 hover:text-[#1A1718]"
                            title="Edit details"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={deletingId === vid._id}
                            onClick={() => handleDeleteVideo(vid._id)}
                            className="p-1 text-rose-600 hover:text-rose-800 transition-colors disabled:opacity-50"
                            title="Delete video"
                          >
                            {deletingId === vid._id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* PHOTO UPLOAD MODAL */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded shadow-2xl border border-[#EFE8E6]">
            <h3 className="font-editorial-serif text-2xl text-[#1A1718] mb-4">
              Upload New Photo
            </h3>

            <form onSubmit={handleSavePhoto} className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans uppercase tracking-wider text-[#7A7273] mb-1">
                  Photo File *
                </label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null;
                    setPhotoForm({
                      ...photoForm,
                      file: f,
                      previewUrl: f ? URL.createObjectURL(f) : "",
                    });
                  }}
                  className="w-full text-xs font-sans file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:bg-[#1A1718] file:text-white hover:file:bg-[#D85E78]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-wider text-[#7A7273] mb-1">
                  Title / Look Name
                </label>
                <input
                  type="text"
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  placeholder="e.g. Balcony Evening Portrait"
                  className="w-full bg-[#FAF8F5] border border-[#EFE8E6] p-2 text-xs font-sans rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-wider text-[#7A7273] mb-1">
                    Section Placement
                  </label>
                  <select
                    value={photoForm.section}
                    onChange={(e) => setPhotoForm({ ...photoForm, section: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#EFE8E6] p-2 text-xs font-sans rounded"
                  >
                    <option value="Hero">Hero (Top Feature)</option>
                    <option value="About">About Her Section</option>
                    <option value="Selected Work">Selected Work Cards</option>
                    <option value="Gallery Strip">Gallery Preview Strip</option>
                    <option value="Gallery">Main Gallery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-wider text-[#7A7273] mb-1">
                    Category
                  </label>
                  <select
                    value={photoForm.category}
                    onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#EFE8E6] p-2 text-xs font-sans rounded"
                  >
                    <option value="Fashion">Fashion</option>
                    <option value="Editorial">Editorial</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              {/* Upload Progress Display */}
              {uploading && (
                <div className="bg-[#FAF8F5] border border-[#EFE8E6] rounded p-3 space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] font-sans">
                    <span className="text-[#5C5556] truncate pr-2">{uploadStatus || "Uploading file..."}</span>
                    <span className="font-semibold text-[#D85E78]">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#EFE8E6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D85E78] transition-all duration-150 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#EFE8E6]">
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(false)}
                  disabled={uploading}
                  className="px-4 py-2 text-xs font-sans text-[#7A7273] hover:text-[#1A1718] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2.5 bg-[#D85E78] hover:bg-[#C24B65] text-white text-xs font-sans uppercase tracking-wider font-semibold rounded disabled:opacity-50 flex items-center space-x-1.5 shadow-sm"
                >
                  {uploading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{uploading ? `Uploading (${uploadProgress}%)` : "Save Photo"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white max-w-xl w-full p-6 sm:p-8 rounded shadow-2xl border border-[#EFE8E6] my-8">
            <h3 className="font-editorial-serif text-2xl text-[#1A1718] mb-4">
              {videoForm.id ? "Edit Video Details" : "Add Video / Reel"}
            </h3>

            <form onSubmit={handleSaveVideo} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-wider text-[#7A7273] mb-1">
                    Format
                  </label>
                  <select
                    value={videoForm.format}
                    onChange={(e) =>
                      setVideoForm({
                        ...videoForm,
                        format: e.target.value as "reel" | "widescreen",
                        duration: e.target.value === "widescreen" ? "15:42" : "00:30",
                      })
                    }
                    className="w-full bg-[#FAF8F5] border border-[#EFE8E6] p-2 text-xs font-sans rounded"
                  >
                    <option value="reel">Short Reel (9:16)</option>
                    <option value="widescreen">Widescreen Feature (16:9)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-wider text-[#7A7273] mb-1">
                    Display Duration (Fake Duration)
                  </label>
                  <input
                    type="text"
                    required
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    placeholder="e.g. 15:42 or 21:18"
                    className="w-full bg-[#FAF8F5] border border-[#EFE8E6] p-2 text-xs font-sans rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-wider text-[#7A7273] mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  placeholder="e.g. Comatozze Sunset Poolside Film"
                  className="w-full bg-[#FAF8F5] border border-[#EFE8E6] p-2 text-xs font-sans rounded"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-wider text-[#7A7273] mb-1">
                  Video MP4 File {!videoForm.id && "*"}
                </label>
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={(e) =>
                    setVideoForm({ ...videoForm, videoFile: e.target.files?.[0] || null })
                  }
                  className="w-full text-xs font-sans file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:bg-[#1A1718] file:text-white hover:file:bg-[#D85E78]"
                />
                {videoForm.existingVideoUrl && (
                  <p className="text-[10px] text-[#7A7273] mt-1 truncate">
                    Current: {videoForm.existingVideoUrl}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-wider text-[#7A7273] mb-1">
                  Custom Video Thumbnail (Cover Image)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setVideoForm({ ...videoForm, thumbnailFile: e.target.files?.[0] || null })
                  }
                  className="w-full text-xs font-sans file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:bg-[#1A1718] file:text-white hover:file:bg-[#D85E78]"
                />
                {videoForm.existingThumbnail && (
                  <p className="text-[10px] text-[#7A7273] mt-1 truncate">
                    Current Thumbnail: {videoForm.existingThumbnail}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-wider text-[#7A7273] mb-1">
                  Telegram Full Video Destination URL
                </label>
                <input
                  type="url"
                  required
                  value={videoForm.telegramUrl}
                  onChange={(e) => setVideoForm({ ...videoForm, telegramUrl: e.target.value })}
                  placeholder="https://t.me/comatozze_new"
                  className="w-full bg-[#FAF8F5] border border-[#EFE8E6] p-2 text-xs font-sans rounded"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-wider text-[#7A7273] mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  placeholder="Atmospheric video description..."
                  className="w-full bg-[#FAF8F5] border border-[#EFE8E6] p-2 text-xs font-sans rounded"
                />
              </div>

              {/* Upload Progress Display */}
              {uploading && (
                <div className="bg-[#FAF8F5] border border-[#EFE8E6] rounded p-3 space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] font-sans">
                    <span className="text-[#5C5556] truncate pr-2">{uploadStatus || "Uploading video..."}</span>
                    <span className="font-semibold text-[#D85E78]">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#EFE8E6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D85E78] transition-all duration-150 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#EFE8E6]">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  disabled={uploading}
                  className="px-4 py-2 text-xs font-sans text-[#7A7273] hover:text-[#1A1718] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2.5 bg-[#D85E78] hover:bg-[#C24B65] text-white text-xs font-sans uppercase tracking-wider font-semibold rounded disabled:opacity-50 flex items-center space-x-1.5 shadow-sm"
                >
                  {uploading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{uploading ? `Uploading (${uploadProgress}%)` : "Save Video"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
