const ArtistProfile = () => {
  return (
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
  );
};

export default ArtistProfile;
