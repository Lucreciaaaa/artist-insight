import { useState } from 'react';
import type { InsightStatus } from '../../types/ui/insight/status';
import InsightHeader from './InsightHeader';
import InsightContent from './InsightContent';
import type { ArtistIdentity } from '../../types/domain/artist';
import {
  mapArtistInfo,
  type ArtistInfoResponse,
} from '../../services/lastfm/mapper';

const InsightManager = () => {
  const [status, setStatus] = useState<InsightStatus>('empty');
  const [artist, setArtist] = useState<ArtistIdentity | null>(null);

  const generateInsight = async () => {
    setStatus('loading');

    try {
      // local backend to load data
      const response = await fetch(
        'http://localhost:4000/api/lastfm/artist/Cher'
      );
      if (!response.ok) throw new Error('Failed to fetch artist');

      const data: ArtistInfoResponse = await response.json();

      const { identity } = mapArtistInfo(data);

      setArtist(identity);
      setStatus('success');
    } catch (error) {
      console.error('Insight generation failed:', error);
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col grow min-w-0 bg-black h-full">
      <InsightHeader
        onGenerateInsight={generateInsight}
        isLoading={status === 'loading'}
      />

      {status === 'empty' && (
        <InsightContent content="Click 'Generate Insight' to receive an AI-powered analysis of this artist's performance, including key drivers, risks, and opportunities." />
      )}

      {status === 'loading' && (
        <InsightContent content="Generating insight ..." />
      )}

      {status === 'success' && artist && (
        <InsightContent content={`Artist name: ${artist.name}`} />
      )}

      {status === 'error' && (
        <InsightContent content="Failed generating analysis" />
      )}
    </div>
  );
};

export default InsightManager;
