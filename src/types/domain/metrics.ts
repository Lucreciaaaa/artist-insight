export type TrackMetric = {
  id: string;
  artistName: string;
  title: string; // song title
  trackRank: number;
  playCount: number; // total streams recorded for this specific track
  relativePopularity: number; // [calculated] 0–1, compared to artist's top track
};

export type ArtistMetrics = {
  audience: {
    listeners: number; // total unique audience
    plays: number; // total streaming volume
    engagement: number; // [calculated] average plays per unique listener
  };
  topTracks: TrackMetric[]; // top-performing songs
};
