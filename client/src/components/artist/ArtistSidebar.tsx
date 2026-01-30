// components
import ArtistProfile from './ArtistProfile';
import ArtistSearch from './ArtistSearch';
import MetricsList from './metrics/MetricsList';
import EmptyState from '../ui/EmptyState';
import BarChart from './charts/BarChart';

// types
import type { ArtistIdentity } from '../../types/domain/artist';
import type { KeyMetric } from '../../types/ui/metrics';
import type { ArtistSidebarState } from '../../types/ui/artist/sidebar';
import type { TrackMetric } from '../../types/domain/metrics';

import { mapTopTracksToBarChart } from '../../services/lastfm/mapper';

type ArtistSidebarProps = {
  artistQuery: string;
  onArtistQueryChange: (value: string) => void;
  onSearchSubmit: () => void;
  artist: ArtistIdentity | null;
  metrics: KeyMetric[];
  topTracks: TrackMetric[];
  loading: boolean;
  error?: string | null;
};

const ArtistSidebar = ({
  artistQuery,
  onArtistQueryChange,
  onSearchSubmit,
  artist,
  metrics,
  topTracks,
  error,
  loading,
}: ArtistSidebarProps) => {
  const sidebarState: ArtistSidebarState = error
    ? 'error'
    : loading
      ? 'loading'
      : !artist
        ? 'idle'
        : metrics.length === 0
          ? 'empty'
          : 'ready';

  const renderContent = () => {
    switch (sidebarState) {
      case 'error':
        return <EmptyState message={error ?? 'Something went wrong'} />;

      case 'idle':
        return <EmptyState message="Search for an artist to see metrics" />;

      case 'empty':
        return (
          <>
            <ArtistProfile artist={artist} />
            <EmptyState message="No metrics available for this artist" />
          </>
        );

      case 'loading':
        return <EmptyState message="Loading ..." />;

      case 'ready': {
        const sortedTracks = [...topTracks].sort(
          (a, b) => b.playCount - a.playCount
        );
        const barChartData = mapTopTracksToBarChart(sortedTracks);

        return (
          <>
            <ArtistProfile artist={artist} />
            <MetricsList metrics={metrics} />
            <BarChart
              labels={barChartData.labels}
              values={barChartData.values}
            />
          </>
        );
      }
    }
  };

  return (
    <aside
      className="flex flex-col
     bg-[#121212] 
    w-full  
    lg:w-[480px] 2xl:w-[600px]
     lg:shrink-0 
     lg:overflow-y-auto"
    >
      <div className="p-4 space-y-6">
        <ArtistSearch
          value={artistQuery}
          onChange={onArtistQueryChange}
          onSubmit={onSearchSubmit}
        />

        {renderContent()}
      </div>
    </aside>
  );
};

export default ArtistSidebar;
