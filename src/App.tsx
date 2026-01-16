import Artist from './components/artist/ArtistSidebar';
import InsightManager from './components/insight/InsightManager';

export default function App() {
  return (
    <div className="flex flex-col lg:flex-row h-screen ">
      <InsightManager />
      <Artist />
    </div>
  );
}
