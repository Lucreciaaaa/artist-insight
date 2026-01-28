import { useState } from 'react';
import { generateArtistInsightsPrompt } from '../constants/prompts';
import type { ArtistIdentity } from '../types/domain/artist';
import { ArtistMetrics } from '../types/domain/metrics';

type LLMResponse = {
  result: string;
};

const BACKEND_URL = 'http://localhost:4000';

export function useLLM() {
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [errorInsight, setErrorInsight] = useState<string | null>(null);

  const resetInsight = () => {
    setLoadingInsight(false);
    setResult(null);
    setErrorInsight(null);
  };

  const generate = async (
    artist: ArtistIdentity,
    metrics: ArtistMetrics,
    extraPrompt?: string
  ) => {
    setLoadingInsight(true);
    setErrorInsight(null);

    try {
      const prompt =
        generateArtistInsightsPrompt(artist, metrics) +
        (extraPrompt ? `\n${extraPrompt}` : '');

      const res = await fetch(`${BACKEND_URL}/api/llm/insights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error('LLM request failed');

      const data: LLMResponse = await res.json();
      setResult(data.result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      setErrorInsight(errorMessage);
      setResult(null);
    } finally {
      setLoadingInsight(false);
    }
  };

  // injecting the result into the hook
  const hydrate = (savedResult: string) => {
    setResult(savedResult);
  };

  return {
    generate,
    result,
    loadingInsight,
    errorInsight,
    resetInsight,
    hydrate,
  };
}
