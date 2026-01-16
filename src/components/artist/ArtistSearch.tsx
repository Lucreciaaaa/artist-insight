const ArtistSearch = () => {
  return (
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
  );
};

export default ArtistSearch;
