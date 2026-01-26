import { useEffect, useState } from 'react';

// Components
import ArtistSidebar from './components/artist/ArtistSidebar';
import InsightManager from './components/insight/InsightManager';

// Hooks
import { useArtistSearch } from './hooks/useArtistSearch';
import { useLLM } from './hooks/useLLM';

// utility to build key metrics
import { buildKeyMetrics } from './services/insights/metricsAdapter';

export default function App() {
  const [artistQuery, setArtistQuery] = useState('');
  const { artist, metrics, search } = useArtistSearch();
  const { result, generate, loading, error, reset } = useLLM();

  // hydrate artistQuery from localStorage on initial load
  useEffect(() => {
    const savedQuery = localStorage.getItem('artistQuery');

    if (savedQuery) {
      // setTimeout to avoid "cascading renders" warning (linter)
      setTimeout(() => {
        setArtistQuery(savedQuery);
        search(savedQuery);
      }, 0);
    }
  }, [search]);

  // persist artistQuery to localstorage when it changes
  useEffect(() => {
    if (artistQuery) {
      localStorage.setItem('artistQuery', artistQuery);
    } else {
      localStorage.removeItem('artistQuery');
    }
  }, [artistQuery]);

  // reset LLM insight when artist changes
  useEffect(() => {
    if (artist) {
      reset();
    }
  }, [artist, reset]);

  // key metrics for sidebar display
  const keyMetrics = metrics ? buildKeyMetrics(metrics) : [];

  const handleGenerateInsight = () => {
    if (!artist || !metrics) return;
    generate(artist, metrics);
  };

  const handleClear = () => {
    setArtistQuery('');
    localStorage.removeItem('artistQuery');
    reset();
  };

  const canGenerateInsight = Boolean(artist && metrics && !loading && !result);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Insight manager panel */}
      <InsightManager
        insight={result}
        loading={loading}
        error={error}
        onGenerateInsight={handleGenerateInsight}
        canGenerate={canGenerateInsight}
        onClear={handleClear} // clear artist + insight
      />

      {/* Sidebar with artist search and metrics */}
      <ArtistSidebar
        artistQuery={artistQuery}
        onArtistQueryChange={setArtistQuery}
        onSearchSubmit={() => search(artistQuery)}
        artist={artist}
        metrics={keyMetrics}
        topTracks={metrics?.topTracks ?? []}
      />
    </div>
  );
}
