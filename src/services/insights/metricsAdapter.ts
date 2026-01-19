/* Metrics displayed in the sidebar */

import type { ArtistMetrics } from '../../types/domain/metrics';
import type { KeyMetric } from '../../types/ui/metrics';

export function buildKeyMetrics(metrics: ArtistMetrics): KeyMetric[] {
  const topTrack = metrics.topTracks[0];

  return [
    {
      id: 'listeners',
      label: 'Listeners',
      value: metrics.audience.listeners?.toLocaleString() ?? '—',
    },
    {
      id: 'plays',
      label: 'Plays',
      value: metrics.audience.plays?.toLocaleString() ?? '—',
    },
    {
      id: 'engagement',
      label: 'Engagement',
      value:
        metrics.audience.engagement != null
          ? `${(metrics.audience.engagement * 100).toFixed(1)}%`
          : '—',
    },
    {
      id: 'top-track',
      label: 'Top track',
      value: topTrack?.title ?? '—',
    },
    {
      id: 'top-track-share',
      label: 'Top track share',
      value: topTrack
        ? `${Math.round(topTrack.relativePopularity * 100)}%`
        : '—',
    },
  ];
}
