import { ReviewLoading } from './ReviewLoading';
import { ReviewEmptyState } from './ReviewEmptyState';
import { ReviewContent } from './ReviewContent';

export const ReviewPanel = ({ isLoading, review }) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-green-400">AI Review</h1>
        <p className="text-gray-400 text-sm">Code analysis and suggestions</p>
      </div>

      <div className="flex-1 bg-gray-800 rounded-lg p-4 border border-gray-700 overflow-hidden">
        {isLoading ? (
          <ReviewLoading />
        ) : review ? (
          <ReviewContent review={review} />
        ) : (
          <ReviewEmptyState />
        )}
      </div>
    </div>
  );
};