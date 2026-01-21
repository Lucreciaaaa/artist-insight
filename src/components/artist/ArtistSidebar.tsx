// components
import ArtistProfile from './ArtistProfile';
import ArtistSearch from './ArtistSearch';
import MetricsList from './metrics/MetricsList';

// types
import type { ArtistIdentity } from '../../types/domain/artist';
import type { KeyMetric } from '../../types/ui/metrics';
import type { ArtistSidebarState } from '../../types/ui/artist/sidebar';
import EmptyState from '../ui/EmptyState';

type ArtistSidebarProps = {
  artistQuery: string;
  onArtistQueryChange: (value: string) => void;
  onSearchSubmit: () => void;
  artist: ArtistIdentity | null;
  metrics: KeyMetric[];
  error?: string | null;
};

const ArtistSidebar = ({
  artistQuery,
  onArtistQueryChange,
  onSearchSubmit,
  artist,
  metrics,
  error,
}: ArtistSidebarProps) => {
  const sidebarState: ArtistSidebarState = error
    ? 'error'
    : !artist
      ? 'idle'
      : metrics.length === 0
        ? 'empty'
        : 'ready';

  switch (sidebarState) {
    case 'error':
      return (
        <aside className="flex flex-col w-full bg-[#121212] lg:w-120 lg:shrink-0">
          <div className="p-4 space-y-6">
            <ArtistSearch
              value={artistQuery}
              onChange={onArtistQueryChange}
              onSubmit={onSearchSubmit}
            />
            <EmptyState message={error ?? 'Something went wrong'} />
          </div>
        </aside>
      );

    case 'idle':
      return (
        <aside className="flex flex-col w-full bg-[#121212]  lg:w-120 lg:shrink-0">
          <div className="p-4 space-y-6">
            <EmptyState message="Search for an artist to see metrics" />
            <ArtistSearch
              value={artistQuery}
              onChange={onArtistQueryChange}
              onSubmit={onSearchSubmit}
            />
          </div>
        </aside>
      );

    case 'empty':
      return (
        <aside className="flex flex-col w-full bg-[#121212]  lg:w-120 lg:shrink-0">
          <div className="p-4 space-y-6">
            <ArtistProfile artist={artist} />
            <ArtistSearch
              value={artistQuery}
              onChange={onArtistQueryChange}
              onSubmit={onSearchSubmit}
            />
            <EmptyState message="No metrics available for this artist" />
          </div>
        </aside>
      );

    case 'ready':
      return (
        <aside className="flex flex-col w-full bg-[#121212]  lg:w-120 lg:shrink-0">
          <div className="p-4 space-y-6">
            <ArtistProfile artist={artist} />
            <ArtistSearch
              value={artistQuery}
              onChange={onArtistQueryChange}
              onSubmit={onSearchSubmit}
            />
            <MetricsList metrics={metrics} />
          </div>
        </aside>
      );
  }
};

export default ArtistSidebar;
