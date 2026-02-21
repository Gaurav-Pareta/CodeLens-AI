export const StatusIndicator = ({ isLoading }) => (
  <div className="mt-2 text-xs text-gray-400 text-center">
    {isLoading ? "Getting AI review..." : "Ready to review"}
  </div>
);