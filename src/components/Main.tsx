const Main = () => {
  return (
    <div className="flex flex-col grow min-w-0 bg-black h-full">
      {/* Page Header */}
      <div className="border-b border-gray-800">
        <div className="p-8 lg:p-12 w-full ">
          <h1 className="text-white text-3xl">Performance Insight</h1>
        </div>
      </div>
      {/* Content */}
      <div className="p-8 lg:p-12 w-full lg:overflow-y-auto">
        <p className="text-white">Summary</p>
      </div>
    </div>
  );
};

export default Main;
