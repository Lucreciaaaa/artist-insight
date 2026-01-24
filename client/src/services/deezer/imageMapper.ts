export async function fetchArtistImage(
  artistName: string
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.deezer.com/search/artist?q=${encodeURIComponent(artistName)}`
    );
    if (!res.ok) throw new Error('Deezer fetch failed');

    const data = await res.json();
    const firstArtist = data.data?.[0];
    if (firstArtist && firstArtist.picture_big) {
      return firstArtist.picture_big;
    }
    return null;
  } catch (err) {
    console.error('Error fetching Deezer artist image:', err);
    return null;
  }
}
