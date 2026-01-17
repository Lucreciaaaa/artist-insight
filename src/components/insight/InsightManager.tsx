import { useState } from 'react';

import type { InsightStatus } from '../../types/insight/status';

import InsightHeader from './InsightHeader';
import InsightContent from './InsightContent';

const InsightManager = () => {
  const [status, setStatus] = useState<InsightStatus>('empty');
  const [data, setData] = useState<string | null>(null);

  const generateInsight = async () => {
    setStatus('loading');
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setData('Performance analysis generated !! ');
      setStatus('success');
    } catch (error) {
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

      {status === 'success' && <InsightContent content={data} />}

      {status === 'error' && (
        <InsightContent content="Failed generating analysis" />
      )}
    </div>
  );
};

export default InsightManager;
