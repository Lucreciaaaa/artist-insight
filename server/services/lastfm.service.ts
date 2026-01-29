import { env } from "../config/env";

export async function fetchArtistInfo(artistName: string) {
  // artist infos
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
      artistName,
    )}&api_key=${env.lastfmKey}&format=json`,
  );
  if (!response.ok) throw new Error(`Last.fm API returned ${response.status}`);
  return response.json();
}

export async function fetchTopTracks(artistName: string) {
  // artist top tracks
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(
      artistName,
    )}&api_key=${env.lastfmKey}&format=json`,
  );
  if (!response.ok) throw new Error(`Last.fm API returned ${response.status}`);
  return response.json();
}
