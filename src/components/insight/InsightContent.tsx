type Props = {
  content: string | null;
};

const InsightContent = ({ content }: Props) => {
  return (
    <div className="flex-1 p-4 sm:px-6 lg:px-12 w-full lg:overflow-y-auto">
      <div className="flex h-full justify-center items-center">
        <p className="text-gray-500 text-center max-w-md">{content}</p>
      </div>
    </div>
  );
};
export default InsightContent;
