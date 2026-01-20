/* Metrics displayed in the sidebar */

import type { ArtistMetrics } from '../../types/domain/metrics';
import type { KeyMetric } from '../../types/ui/metrics';

const formatNumber = (value: number) =>
  Number.isFinite(value) ? value.toLocaleString() : '—';

export function buildKeyMetrics(metrics: ArtistMetrics): KeyMetric[] {
  const topTrack = metrics.topTracks[0];

  return [
    {
      id: 'listeners',
      label: 'Listeners',
      value: formatNumber(metrics.audience.listeners),
    },
    {
      id: 'plays',
      label: 'Plays',
      value: formatNumber(metrics.audience.plays),
    },
    {
      id: 'engagement',
      label: 'Audience Loyalty',
      value:
        metrics.audience.engagement != null
          ? `~${Math.round(metrics.audience.engagement)} plays / listener`
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
