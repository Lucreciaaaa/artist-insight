import type { ArtistIdentity } from '../../types/domain/artist';

type ArtistProfileProps = {
  artist: ArtistIdentity | null;
};

const ArtistProfile = ({ artist }: ArtistProfileProps) => {
  if (!artist) {
    return (
      <div className="h-14 flex items-center text-gray-500 text-sm">
        No artist selected
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 mb-6">
      <img
        src={artist.imageUrl}
        alt={`${artist.name} avatar`}
        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded object-cover"
      />

      <div className="flex-1 min-w-0">
        <h2 className="text-gray-100 text-xs sm:text-sm lg:text-lg truncate">
          {artist.name}
        </h2>

        {artist.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {artist.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded border border-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistProfile;
