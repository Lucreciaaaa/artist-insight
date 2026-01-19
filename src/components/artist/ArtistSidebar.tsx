import type { ArtistIdentity } from '../../types/domain/artist';
import type { KeyMetric } from '../../types/ui/metrics';
import ArtistProfile from './ArtistProfile';
import ArtistSearch from './ArtistSearch';
import MetricsList from './metrics/MetricsList';

type ArtistSidebarProps = {
  artistQuery: string;
  onArtistQueryChange: (value: string) => void;
  onSearchSubmit: () => void;
  artist: ArtistIdentity | null;
  metrics: KeyMetric[];
};

const ArtistSidebar = ({
  artistQuery,
  onArtistQueryChange,
  onSearchSubmit,
  artist,
  metrics,
}: ArtistSidebarProps) => {
  return (
    <aside className="flex flex-col w-full bg-[#121212] lg:w-96 lg:shrink-0">
      <div className="p-4 space-y-6">
        <div>
          <ArtistProfile artist={artist} />
          <ArtistSearch
            value={artistQuery}
            onChange={onArtistQueryChange}
            onSubmit={onSearchSubmit}
          />
        </div>

        <MetricsList metrics={metrics} />
      </div>
    </aside>
  );
};

export default ArtistSidebar;
