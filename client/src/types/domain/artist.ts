/* Core Identity of a music artist */

export type ArtistIdentity = {
  id: string; // mbid if available, fallback to name
  name: string;
  imageUrl?: string; // profile image URL (from Last.fm)
  tags: string[]; // genre or community tags
};
