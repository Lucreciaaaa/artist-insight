export async function fetchArtistImage(query: string) {
  // artist images
  const response = await fetch(
    `https://api.deezer.com/search/artist?q=${encodeURIComponent(query)}`,
  );
  if (!response.ok) throw new Error(`Deezer API returned ${response.status}`);
  return response.json();
}
