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
  const [artistQuery, setArtistQuery] = useState(() => {
    return localStorage.getItem('artistQuery') ?? '';
  });

  // hooks
  const { artist, metrics, search, loadingArtist, errorArtist, resetSearch } =
    useArtistSearch();
  const { result, generate, loadingInsight, errorInsight, resetInsight } =
    useLLM();

  // persist query
  useEffect(() => {
    if (artistQuery) {
      localStorage.setItem('artistQuery', artistQuery);
    } else {
      localStorage.removeItem('artistQuery');
    }
  }, [artistQuery]);

  // key metrics for sidebar display
  const keyMetrics = metrics ? buildKeyMetrics(metrics) : [];

  const canGenerateInsight = Boolean(
    artist &&
    metrics &&
    !loadingInsight &&
    !result &&
    artist.name.trim().toLowerCase() === artistQuery.trim().toLowerCase()
  );

  // User actions
  const handleSearchSubmit = async () => {
    const trimmedQuery = artistQuery.trim();
    if (!trimmedQuery) return;
    try {
      await search(trimmedQuery);
      resetInsight();
    } catch (e) {
      console.error('Search error :', e);
    }
  };

  const handleGenerateInsight = () => {
    if (!artist || !metrics || loadingInsight) return;
    generate(artist, metrics);
  };

  const handleClearQuery = () => setArtistQuery('');
  const handleClearInsight = () => resetInsight();
  const handleClearSearch = () => resetSearch();
  const handleClearAll = () => {
    handleClearQuery();
    handleClearInsight();
    handleClearSearch();
  };

  return (
    <div className="flex flex-col lg:flex-row h-[100dvh]">
      {/* Insight manager panel */}
      <InsightManager
        insight={result}
        loading={loadingInsight}
        error={errorInsight}
        onGenerateInsight={handleGenerateInsight}
        canGenerate={canGenerateInsight}
        onClear={handleClearAll}
      />

      {/* Sidebar with artist search and metrics */}
      <ArtistSidebar
        artistQuery={artistQuery}
        onArtistQueryChange={setArtistQuery}
        onSearchSubmit={handleSearchSubmit}
        artist={artist}
        metrics={keyMetrics}
        topTracks={metrics?.topTracks ?? []}
        loading={loadingArtist}
        error={errorArtist}
      />
    </div>
  );
}
