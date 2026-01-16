import MainContent from './InsightContent';
import MainHeader from './InsightHeader';
const InsightManager = () => {
  return (
    <div className="flex flex-col grow min-w-0 bg-black h-full">
      <MainHeader />
      <MainContent />
    </div>
  );
};

export default InsightManager;
