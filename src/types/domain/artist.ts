/* Core Identity of a music artist */

export type ArtistIdentity = {
  id: string; // mbid if available, fallback to name
  name: string;
  imageUrl: {
    // profile image URL (from Last.fm)
    small?: string;
    medium?: string;
    large?: string;
  };
  tags: string[]; // genre or community tags
};
