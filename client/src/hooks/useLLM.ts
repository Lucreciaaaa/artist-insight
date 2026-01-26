import { useState } from 'react';
import { generateArtistInsightsPrompt } from '../constants/prompts';
import type { ArtistIdentity } from '../types/domain/artist';
import { ArtistMetrics } from '../types/domain/metrics';

type LLMResponse = {
  result: string;
};

const BACKEND_URL = 'http://localhost:4000';

export function useLLM() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setLoading(false);
    setResult(null);
    setError(null);
  };

  const generate = async (
    artist: ArtistIdentity,
    metrics: ArtistMetrics,
    extraPrompt?: string
  ) => {
    setLoading(true);
    setError(null);

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
      setError(errorMessage);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // injecting the result into the hook
  const hydrate = (savedResult: string) => {
    setResult(savedResult);
  };

  return { generate, result, loading, error, reset, hydrate };
}
