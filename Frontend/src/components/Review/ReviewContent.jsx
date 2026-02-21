import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export const ReviewContent = ({ review }) => (
  <div className="h-full overflow-auto">
    <div className="prose prose-invert max-w-none">
      <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
      <p>💡 Note: AI suggestions are for guidance only.</p>
    </div>
  </div>
);