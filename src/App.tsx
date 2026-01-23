import { useState } from 'react';

// components
import ArtistSidebar from './components/artist/ArtistSidebar';
import InsightManager from './components/insight/InsightManager';

import { buildKeyMetrics } from './services/insights/metricsAdapter';

import { useArtistSearch } from './hooks/useArtistSearch';

export default function App() {
  const [artistQuery, setArtistQuery] = useState('');
  const { artist, metrics, search } = useArtistSearch();

  const keyMetrics = metrics ? buildKeyMetrics(metrics) : [];

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <InsightManager
        status="empty"
        artist={artist}
        onGenerateInsight={() => {}}
      />
      <ArtistSidebar
        artistQuery={artistQuery}
        onArtistQueryChange={setArtistQuery}
        onSearchSubmit={() => search(artistQuery)}
        artist={artist}
        metrics={keyMetrics}
        topTracks={metrics?.topTracks ?? []}
      />
    </div>
  );
}
