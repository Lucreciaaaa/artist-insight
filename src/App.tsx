import { useState } from 'react';

// components
import ArtistSidebar from './components/artist/ArtistSidebar';
import InsightManager from './components/insight/InsightManager';

// types
import type { ArtistIdentity } from './types/domain/artist';
import type { ArtistMetrics } from './types/domain/metrics';
import { type ArtistInfoResponse } from './services/lastfm/mapper';

import { mapArtistInfo } from './services/lastfm/mapper';
import { buildKeyMetrics } from './services/insights/metricsAdapter';

export default function App() {
  const [artistQuery, setArtistQuery] = useState(''); // User input
  // const [status, setStatus] = useState<InsightStatus>('empty'); // Generate insight
  const [artist, setArtist] = useState<ArtistIdentity | null>(null); // Artist infos (name, image, musical genre)
  const [artistMetrics, setArtistMetrics] = useState<ArtistMetrics | null>(
    null
  );

  const keyMetrics = artistMetrics ? buildKeyMetrics(artistMetrics) : [];

  // load data and update state
  const handleArtistSearch = async () => {
    if (!artistQuery.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:4000/api/lastfm/artist/${encodeURIComponent(artistQuery)}`
      );
      if (!res.ok) throw new Error();
      const data: ArtistInfoResponse = await res.json();
      const { identity, audience } = mapArtistInfo(data);

      setArtist(identity);
      setArtistMetrics({
        audience,
        topTracks: [], // TODO
      });
    } catch {
      setArtist(null);
      setArtistMetrics(null);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen ">
      <InsightManager
        status={'empty'}
        artist={artist}
        onGenerateInsight={() => {}} // TODO
      />
      <ArtistSidebar
        artistQuery={artistQuery}
        onArtistQueryChange={setArtistQuery}
        onSearchSubmit={handleArtistSearch}
        artist={artist}
        metrics={keyMetrics}
      />
    </div>
  );
}
