import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-css";

export const CodeEditor = ({ code, onCodeChange, language }) => {
  const highlightCode = (code) => {
    return prism.highlight(
      code,
      prism.languages[language],
      language
    );
  };

  return (
    <div className="flex-1 bg-gray-800 rounded-lg p-2 overflow-hidden">
      <div className="h-full bg-gray-950 rounded overflow-x-auto overflow-y-auto">
        <Editor
          value={code}
          onValueChange={onCodeChange}
          highlight={highlightCode}
          padding={16}
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 16,
            minHeight: "100%",
            overflow: "auto",
            whiteSpace: "pre",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
};