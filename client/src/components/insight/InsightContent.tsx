import { MarkdownInsight } from './mapper/MarkdownInsight';

type Props = {
  content: string | null;
  variant: 'insight' | 'message';
};

const InsightContent = ({ content, variant }: Props) => {
  if (!content) return null;
  return (
    <div
      className={`flex flex-1 w-full lg:overflow-y-auto my-8
         lg:mb-0
    ${variant === 'message' ? 'justify-center items-center' : 'p-4 sm:px-6 lg:px-12'}`}
    >
      <div className={variant === 'message' ? 'max-w-md px-4' : 'flex h-full'}>
        {variant === 'insight' ? (
          <MarkdownInsight mdContent={content} />
        ) : (
          <p className="text-gray-500 text-center">{content}</p>
        )}
      </div>
    </div>
  );
};
export default InsightContent;
