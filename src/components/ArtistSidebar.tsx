const ArtistSidebar = () => {
  return (
    <aside
      className="
        flex flex-col
        w-full
        border-t border-gray-800
        bg-[#121212]
        lg:h-full lg:w-96 lg:shrink-0
        lg:border-t-0 lg:border-l
        lg:overflow-y-auto
      "
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Artist details */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
              alt="Artist avatar"
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded object-cover"
            />

            <div className="flex-1 min-w-0">
              <h2 className="text-gray-100 text-xs sm:text-sm lg:text-lg truncate">
                The Midnight
              </h2>
              <span className="inline-block mt-1 px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded border border-gray-700">
                Synthwave
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              id="artist-name"
              name="artist-name"
              type="text"
              placeholder="Search artist"
              className="
                w-full h-8
                rounded-md
                bg-[#0a0a0a]
                border border-gray-800
                pl-9 pr-3
                text-xs sm:text-sm
                text-gray-200
                placeholder:text-gray-600
                focus:outline-none focus:ring-1 focus:ring-gray-700
              "
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ArtistSidebar;
