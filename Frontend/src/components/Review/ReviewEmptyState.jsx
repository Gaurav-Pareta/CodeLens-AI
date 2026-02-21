export const ReviewEmptyState = () => (
  <div className="h-full flex flex-col items-center justify-center text-gray-500">
    <div className="text-4xl mb-4">📝</div>
    <h3 className="text-lg font-medium mb-2">No review yet</h3>
    <p className="text-center mb-6">
      Click "Review Code" to get AI feedback on your code
    </p>
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
      <p className="font-medium text-gray-300 mb-2">What will be reviewed:</p>
      <div className="text-sm space-y-1">
        <p className="text-gray-400">✓ Code style and formatting</p>
        <p className="text-gray-400">✓ Potential bugs and errors</p>
        <p className="text-gray-400">✓ Performance improvements</p>
        <p className="text-gray-400">✓ Best practices</p>
      </div>
    </div>
  </div>
);