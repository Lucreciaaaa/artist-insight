const API_BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

const API_KEY = import.meta.env.LASTFM_API_KEY;

export async function lastFmFetch<T>(
  params: Record<string, string>
): Promise<T> {
  const url = new URL(API_BASE_URL);

  Object.entries({
    ...params,
    api_key: API_KEY,
    format: 'json',
  }).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Last.fm API error');
  }

  return response.json();
}
