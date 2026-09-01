export default function VideoPlayerLoading() {
  return (
    <div className="pt-32 pb-24 md:pb-36 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Back Link Skeleton */}
        <div className="h-4 w-36 bg-[#E8DFDC] rounded mb-8 animate-pulse" />

        {/* Title Header Skeleton */}
        <div className="border-b border-[#E8DFDC] pb-8 mb-10 animate-pulse">
          <div className="h-4 w-48 bg-[#E8DFDC] rounded mb-3" />
          <div className="h-12 sm:h-16 w-3/4 max-w-2xl bg-[#E8DFDC] rounded mb-4" />
          <div className="h-8 w-64 bg-[#E8DFDC] rounded-full" />
        </div>

        {/* Large Player Box Skeleton */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-5xl aspect-video bg-[#E8DFDC] rounded-xl shadow-lg animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-[#C98A90] border-t-transparent animate-spin" />
          </div>
        </div>

        {/* Telegram Banner Skeleton */}
        <div className="h-28 w-full bg-[#E8DFDC] rounded-xl mb-12 animate-pulse" />
      </div>
    </div>
  );
}
