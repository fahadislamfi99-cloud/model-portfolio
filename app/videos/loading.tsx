export default function VideosLoading() {
  return (
    <div className="pt-32 pb-24 md:pb-36 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Header Skeleton */}
        <div className="border-b border-[#E8DFDC] pb-12 mb-12 animate-pulse">
          <div className="h-3 w-44 bg-[#E8DFDC] rounded mb-3" />
          <div className="h-12 sm:h-16 w-80 sm:w-96 bg-[#E8DFDC] rounded mb-4" />
          <div className="h-4 w-72 bg-[#E8DFDC] rounded" />
        </div>

        {/* Long Videos Skeleton */}
        <div className="mb-16">
          <div className="h-6 w-56 bg-[#E8DFDC] rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col space-y-3 animate-pulse">
                <div className="aspect-video w-full bg-[#E8DFDC] rounded-sm" />
                <div className="h-6 w-3/4 bg-[#E8DFDC] rounded" />
                <div className="h-4 w-1/2 bg-[#E8DFDC] rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Reels Skeleton */}
        <div>
          <div className="h-6 w-48 bg-[#E8DFDC] rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col space-y-3 animate-pulse">
                <div className="aspect-[9/16] w-full bg-[#E8DFDC] rounded-sm" />
                <div className="h-5 w-3/4 bg-[#E8DFDC] rounded" />
                <div className="h-4 w-1/2 bg-[#E8DFDC] rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
