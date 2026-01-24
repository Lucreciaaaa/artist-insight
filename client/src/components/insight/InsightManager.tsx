import type { InsightStatus } from '../../types/ui/insight/status';
import InsightHeader from './InsightHeader';
import InsightContent from './InsightContent';
import type { ArtistIdentity } from '../../types/domain/artist';

type InsightManagerProps = {
  status: InsightStatus;
  artist: ArtistIdentity | null;
  onGenerateInsight: () => void;
};

const InsightManager = ({
  status,
  artist,
  onGenerateInsight,
}: InsightManagerProps) => {
  return (
    <div className="flex flex-col grow min-w-0 bg-black h-full">
      <InsightHeader
        onGenerateInsight={onGenerateInsight}
        isLoading={status === 'loading'}
      />

      {status === 'empty' && (
        <InsightContent content="Click 'Generate Insight' to receive an AI-powered analysis of this artist's performance." />
      )}

      {status === 'loading' && (
        <InsightContent content="Generating insight..." />
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
