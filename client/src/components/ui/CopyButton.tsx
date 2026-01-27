import { useState } from 'react';

type CopyButtonProps = {
  targetText: string;
};

const CopyButton = ({ targetText }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(targetText); // step clipboard
      setCopied(true); // change icon & text
      setTimeout(() => setCopied(false), 2000); // revert after 2s
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center
       gap-2 px-2.5 py-2
       sm:px-3.5 sm:py-2.5 border
        border-gray-700 rounded-lg
         hover:bg-gray-900
          transition-colors text-sm
           text-gray-400 shrink-0"
    >
      <span className="flex items-center">
        {copied ? (
          <>
            {/* Success icon */}
            <svg
              className="w-4 h-4 me-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z" />
            </svg>
            <span className="text-xs">Copied</span>
          </>
        ) : (
          <>
            {/* Default icon */}
            <svg
              className="w-4 h-4 me-2.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z" />
            </svg>
            <span className="text-xs sm:inline">Copy insight</span>
          </>
        )}
      </span>
    </button>
  );
};

export default CopyButton;
