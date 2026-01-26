import ReactMarkdown from 'react-markdown';

type MarkdownInsightProps = {
  mdContent: string;
};

export function MarkdownInsight({ mdContent }: MarkdownInsightProps) {
  if (!mdContent) return;

  return (
    <div className="w-full mt-5">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="text-xs 2xl:text-sm uppercase tracking-wider text-gray-600 mt-8 first:mt-0 mb-3 border-t border-gray-800 pt-6 first:border-t-0 first:pt-0">
              {children}
            </h2>
          ),
          p: ({ children }) => (
            <p className="text-sm 2xl:text-base leading-relaxed text-gray-300 mb-4">
              {children}
            </p>
          ),
        }}
      >
        {mdContent}
      </ReactMarkdown>
    </div>
  );
}
