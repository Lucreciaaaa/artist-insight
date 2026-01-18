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
  metrics: Pick<ArtistMetrics, 'audience'>;
} {
  const artist = response.artist;
  const imageUrl =
    artist.image.find((img) => img.size === 'large')?.['#text'] ?? '';

  return {
    identity: {
      id: artist.mbid ?? `${artist.name}`,
      name: artist.name,
      imageUrl,
      tags: artist.tags?.tag.map((t) => t.name) ?? [],
    },
    metrics: {
      audience: {
        listeners: Number(artist.stats.listeners),
        plays: Number(artist.stats.plays),
        engagement: Number(artist.stats.plays) / Number(artist.stats.listeners),
      },
    },
  };
}

export function mapTopTracks(response: TopTrackResponse): TrackMetric[] {
  const { toptracks } = response;

  const artistName = toptracks.artist ?? 'Unknown artist';
  const tracks = toptracks.track;

  if (!tracks.length) return [];

  const topPlayCount = Number(tracks[0].playcount);

  return tracks.map((track) => {
    const playCount = Number(track.playcount);
    const rank = track.rank ?? '0';

    return {
      id: track.mbid ?? `${artistName}-${track.name}-${rank}`,
      artistName,
      title: track.name,
      trackRank: Number(rank),
      playCount,
      relativePopularity: playCount / topPlayCount,
    };
  });
}
