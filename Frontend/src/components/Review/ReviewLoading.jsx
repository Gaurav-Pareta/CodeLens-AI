export const ReviewLoading = () => (
  <div className="h-full flex flex-col items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <h3 className="text-lg font-medium text-blue-300 mb-2">Reviewing your code...</h3>
      <p className="text-gray-400">Please wait while AI analyzes your code</p>
      <div className="mt-4 text-gray-500">
        <p>Checking for:</p>
        <ul className="text-sm mt-2 space-y-1">
          <li>• Code quality issues</li>
          <li>• Best practices</li>
          <li>• Optimization opportunities</li>
        </ul>
      </div>
    </div>
  </div>
);