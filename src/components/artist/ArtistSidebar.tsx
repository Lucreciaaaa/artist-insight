import ArtistProfile from './ArtistProfile';
import ArtistSearch from './ArtistSearch';
import MetricsList from './metrics/MetricsList';

const ArtistSidebar = () => {
  return (
    <aside
      className="
        flex flex-col
        w-full
        border-t border-gray-800
        bg-[#121212]
        lg:h-full lg:w-96 lg:shrink-0
        lg:border-t-0 lg:border-l
        lg:overflow-y-auto
      "
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
        <div>
          <ArtistProfile />
          <ArtistSearch />
        </div>
        <MetricsList />
      </div>
    </aside>
  );
};

export default ArtistSidebar;
