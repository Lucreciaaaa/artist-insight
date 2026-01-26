type Props = {
  onGenerateInsight: () => void;
  isLoading: boolean;
  hasResult: boolean;
  disabled: boolean;
  onClear: () => void;
};

const InsightHeader = ({
  onGenerateInsight,
  isLoading,
  hasResult,
  disabled,
  onClear,
}: Props) => {
  return (
    <div className="border-b border-gray-800">
      <div className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-12 lg:py-8 ">
        <div className="mb-3 lg:mb-6">
          <h1 className="text-white text-xl sm:text-2xl lg:text-3xl mb-1 lg:mb-2">
            Performance Insight
          </h1>
          <p className="text-gray-500">AI-generated analysis</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <button
            className="w-full sm:w-auto
         px-6 py-3 rounded-lg
         transition-colors
         bg-white text-black hover:bg-gray-200
          disabled:bg-gray-800
    disabled:text-gray-600
    disabled:cursor-not-allowed
    disabled:hover:bg-gray-800"
            onClick={onGenerateInsight}
            disabled={disabled}
          >
            {isLoading
              ? 'Analyzing...'
              : hasResult
                ? 'Insight Generated'
                : 'Generate Insight'}
          </button>
          <button
            onClick={onClear}
            className="px-6 py-3 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 w-full sm:w-auto"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightHeader;
