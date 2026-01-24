type EmptyStateProps = {
  message: string;
};

const EmptyState = ({ message }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-9 text-center text-gray-500 gap-1">
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-gray-600"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <circle cx="12" cy="16" r="0.5" />
    </svg>

    <span className="text-sm">{message}</span>
  </div>
);

export default EmptyState;
