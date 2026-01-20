import type { ArtistIdentity } from '../../types/domain/artist';
import type { ArtistMetrics, TrackMetric } from '../../types/domain/metrics';

// types
export type ArtistInfoResponse = {
  artist: {
    name: string;
    mbid?: string;
    stats: {
      listeners: number;
      plays: number;
    };
    image: {
      '#text': string; // for xml
      size: string;
    }[];
    tags?: {
      tag: { name: string }[];
    };
  };
};

export type TopTrackResponse = {
  toptracks: {
    artist: string;
    track: {
      name: string;
      playcount: string;
      mbid?: string;
      rank?: string;
    }[];
  };
};

export function mapArtistInfo(response: ArtistInfoResponse): {
  identity: ArtistIdentity;
  audience: ArtistMetrics['audience'];
} {
  const artist = response.artist;
  const imageUrl = artist.image
    .map((img) => img['#text'])
    .find((url) => url && url.length > 0);
  const listeners = Number(artist.stats.listeners);
  const plays = Number(artist.stats.plays);
  const rawTags = artist.tags?.tag.map((t) => t.name) ?? [];

  const safeListeners = Number.isFinite(listeners) ? listeners : 0;
  const safePlays = Number.isFinite(plays) ? plays : 0;
  const normalizedTags = Array.from(
    new Set(rawTags.map((tag) => tag.toLowerCase()))
  );

  return {
    identity: {
      id: artist.mbid ?? `${artist.name}`,
      name: artist.name,
      imageUrl: imageUrl,
      tags: normalizedTags,
    },
    audience: {
      listeners: safeListeners,
      plays: safePlays,
      engagement: safePlays / safeListeners,
    },
  };
}

export function mapTopTracks(response: TopTrackResponse): TrackMetric[] {
  const { toptracks } = response;

  const artistName = toptracks.artist ?? 'Unknown artist';
  const tracks = toptracks.track;

  if (!tracks.length) return [];

  // parsing & normalisation
  const parsedTracks = tracks.map((track, index) => {
    const rawPlayCount = Number(track.playcount);
    const playCount = Number.isFinite(rawPlayCount) ? rawPlayCount : 0;

    return {
      id: track.mbid || `${artistName}-${track.name}-${index}`,
      artistName,
      title: track.name,
      trackRank: index + 1,
      playCount,
      relativePopularity: 0, // calculated after
    };
  });

  // relative popularity
  const totalPlays = parsedTracks.reduce(
    (sum, track) => sum + track.playCount,
    0
  );
  const safeTotalPlays = Math.max(totalPlays, 1);
  return parsedTracks.map((track) => ({
    ...track,
    relativePopularity: track.playCount / safeTotalPlays,
  }));
}
