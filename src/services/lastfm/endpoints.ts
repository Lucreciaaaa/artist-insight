import { lastFmFetch } from './client';
import {
  mapArtistInfo,
  mapTopTracks,
  type TopTrackResponse,
  type ArtistInfoResponse,
} from './mapper';

export async function getArtistInfo(artistName: string) {
  const response = await lastFmFetch<ArtistInfoResponse>({
    method: 'artist.getInfo',
    artist: artistName,
  });

  return mapArtistInfo(response);
}

export async function getTopTracks(artistName: string) {
  const response = await lastFmFetch<TopTrackResponse>({
    method: 'artist.getTopTracks',
    artist: artistName,
    limit: '10',
  });
  return mapTopTracks(response);
}
