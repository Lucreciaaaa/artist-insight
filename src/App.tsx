import Main from './components/main/Main';
import ArtistSidebar from './components/ArtistSidebar';

export default function App() {
  return (
    <div className="flex flex-col lg:flex-row h-screen ">
      <Main />
      <ArtistSidebar />
    </div>
  );
}
