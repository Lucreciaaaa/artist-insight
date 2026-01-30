import InsightHeader from './InsightHeader';
import InsightContent from './InsightContent';
import CopyButton from '../ui/CopyButton';

type InsightManagerProps = {
  insight: string | null;
  loading: boolean;
  error: string | null;
  onGenerateInsight: () => void;
  canGenerate: boolean;
  onClear: () => void;
};

const InsightManager = ({
  insight,
  loading,
  error,
  onGenerateInsight,
  canGenerate,
  onClear,
}: InsightManagerProps) => {
  const hasInsight = Boolean(insight && insight.trim().length > 0);
  const isEmpty = !loading && !error && !hasInsight;

  return (
    <div
      className="flex flex-col
                 grow
                 min-w-0
                 h-full 
               bg-black"
    >
      <InsightHeader
        onGenerateInsight={onGenerateInsight}
        isLoading={loading}
        hasResult={hasInsight}
        disabled={!canGenerate}
        onClear={onClear}
      />

      {loading && (
        <InsightContent content="Generating insight..." variant="message" />
      )}

      {error && (
        <InsightContent
          content="Failed generating analysis"
          variant="message"
        />
      )}

      {isEmpty && (
        <InsightContent
          content="Click 'Generate Insight' to receive an AI-powered analysis of this artist's performance."
          variant="message"
        />
      )}

      {hasInsight && (
        <>
          <InsightContent content={insight} variant="insight" />

          <div className="pt-6 border-t border-gray-800 px-6 mb-3 mt-5">
            <div className="flex items-center justify-between gap-6">
              <p className="text-xs text-gray-600 leading-relaxed flex-1">
                This analysis is indicative and intended to support
                decision-making.
              </p>
              <CopyButton targetText={insight || ''} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InsightManager;
