export const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="mb-3 p-3 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
      <div className="flex items-center">
        <span className="mr-2">⚠</span>
        {message}
      </div>
    </div>
  );
};