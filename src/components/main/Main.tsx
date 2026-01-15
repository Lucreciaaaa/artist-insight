import MainContent from './MainContent';
import MainHeader from './MainHeader';

const Main = () => {
  return (
    <div className="flex flex-col grow min-w-0 bg-black h-full">
      <MainHeader />
      <MainContent />
    </div>
  );
};

export default Main;
