import { useState } from 'react';

//types
import type { ArtistIdentity } from '../types/domain/artist';
import type { ArtistMetrics } from '../types/domain/metrics';
import {
  type ArtistInfoResponse,
  type TopTrackResponse,
} from '../services/lastfm/mapper';

import { mapArtistInfo, mapTopTracks } from '../services/lastfm/mapper';

type UseArtistSearchResult = {
  artist: ArtistIdentity | null;
  metrics: ArtistMetrics | null;
  search: (query: string) => Promise<void>;
};

export function useArtistSearch(): UseArtistSearchResult {
  const [artist, setArtist] = useState<ArtistIdentity | null>(null);
  const [metrics, setMetrics] = useState<ArtistMetrics | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) return;

    try {
      // Artist info fetch
      const artistRes = await fetch(
        `http://localhost:4000/api/lastfm/artist/${encodeURIComponent(query)}`
      );
      if (!artistRes.ok) throw new Error('Artist fetch failed');

      const artistData: ArtistInfoResponse = await artistRes.json();
      const { identity, audience } = mapArtistInfo(artistData);

      // Top tracks fetch
      const tracksRes = await fetch(
        `http://localhost:4000/api/lastfm/artist/${encodeURIComponent(
          query
        )}/top-tracks`
      );
      if (!tracksRes.ok) throw new Error('Tracks fetch failed');

      const tracksData: TopTrackResponse = await tracksRes.json();
      const topTracks = mapTopTracks(tracksData);

      // Deezer image fetch
      let deezerImage: string | null = null;
      try {
        const deezerRes = await fetch(
          `http://localhost:4000/api/deezer/artist?q=${encodeURIComponent(query)}`
        );
        if (deezerRes.ok) {
          const deezerData = await deezerRes.json();
          deezerImage = deezerData.data?.[0]?.picture ?? null;
        }
      } catch (err) {
        console.warn('Deezer fetch failed', err);
      }

      // Metrics calculation (top tracks, engagement)
      const totalPlays = topTracks.reduce((sum, t) => sum + t.playCount, 0);

      const engagement =
        audience.listeners > 0 ? totalPlays / audience.listeners : 0;

      console.log('Deezer image URL:', deezerImage);
      console.log('Fallback Last.fm URL:', identity.imageUrl);

      setArtist({
        ...identity,
        imageUrl: deezerImage ?? identity.imageUrl,
      });
      setMetrics({
        audience: {
          listeners: audience.listeners,
          plays: totalPlays,
          engagement,
        },
        topTracks,
      });
    } catch (error) {
      console.error(error);
      setArtist(null);
      setMetrics(null);
    }
  };

  return { artist, metrics, search };
}
