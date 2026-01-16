const InsightHeader = () => {
  return (
    <div className="border-b border-gray-800">
      <div className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-12 lg:py-8 ">
        <div className="mb-3 lg:mb-6">
          <h1 className="text-white text-xl sm:text-2xl lg:text-3xl mb-1 lg:mb-2">
            Performance Insight
          </h1>
          <p className="text-gray-500">AI-generated analysis</p>
        </div>
        <button
          className="w-full sm:w-auto
         text-gray-900 px-6 py-3 rounded-lg
         transition-colors bg-gray-100 hover:bg-white"
        >
          Generate Insight
        </button>
      </div>
    </div>
  );
};

export default InsightHeader;
