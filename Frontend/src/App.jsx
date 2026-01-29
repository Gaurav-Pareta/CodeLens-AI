import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'
import "tailwindcss"

import "prismjs/components/prism-javascript"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-css"
import "highlight.js/lib/languages/xml"

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState(``)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [language, setLanguage] = useState("javascript")

  useEffect(() => { }, [])

  const languageConfig = {
    javascript: {
      name: "JavaScript",
      prismLang: "javascript",
      extension: "js",
      sample: `function sum() {\n  return 1 + 1\n}`
    },
    python: {
      name: "Python",
      prismLang: "python",
      extension: "py",
      sample: `def sum():\n    return 1 + 1`
    },
    java: {
      name: "Java",
      prismLang: "java",
      extension: "java",
      sample: `public class Main {\n    public static int sum() {\n        return 1 + 1;\n    }\n}`
    },
    c: {
      name: "C",
      prismLang: "c",
      extension: "c",
      sample: `int sum() {\n    return 1 + 1;\n}`
    },
    cpp: {
      name: "C++",
      prismLang: "cpp",
      extension: "cpp",
      sample: `int sum() {\n    return 1 + 1;\n}`
    },
    html: {
      name: "HTML",
      prismLang: "markup",
      extension: "html",
      sample: `<div>\n  <h1>Hello World</h1>\n</div>`
    }
    ,
    css: {
      name: "CSS",
      prismLang: "css",
      extension: "css",
      sample: `.container {\n  color: blue;\n}`
    }
  }

  async function reviewCode() {
    if (!code.trim()) {
      setError("Please write some code first!")
      return
    }

    setIsLoading(true)
    setError(null)
    setReview("")

    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', {
        code, language
      })
      setReview(response.data.review)
    } catch (err) {
      setError("Failed to get review. Please check your connection and try again.")
      console.error("Review error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <main className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white p-4 gap-4 overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="flex-1 flex flex-col">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-blue-400">Code Editor</h1>
            <p className="text-gray-400 text-sm">Write or paste your code here</p>
          </div>

          <div className="flex-1 bg-gray-800 rounded-lg p-2 overflow-hidden">
            <div className="h-full bg-gray-950 rounded overflow-x-auto overflow-y-auto">
              <Editor
                value={code}
                onValueChange={setCode}
                // Change this line in Editor component:
                highlight={c => prism.highlight(c, prism.languages[languageConfig[language].prismLang], languageConfig[language].prismLang)}
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


          <div className="mt-4">
            {error && (
              <div className="mb-3 p-3 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
                <div className="flex items-center">
                  <span className="mr-2">⚠</span>
                  {error}
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Language
              </label>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value)
                  setCode(languageConfig[e.target.value].sample)
                }}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
              </select>
            </div>

            <button
              onClick={reviewCode}
              disabled={isLoading || !code.trim()}
              className={`
                w-full px-6 py-3 font-medium rounded-lg 
                flex items-center justify-center gap-2
                ${isLoading
                  ? 'bg-blue-800 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }
                ${!code.trim() ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Reviewing Code...</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span>Review Code</span>
                </>
              )}
            </button>

            <div className="mt-2 text-xs text-gray-400 text-center">
              {isLoading ? "Getting AI review..." : "Ready to review"}
            </div>
          </div>
        </div>

        {/* Right Panel - Review Output */}
        <div className="flex-1 flex flex-col">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-green-400">AI Review</h1>
            <p className="text-gray-400 text-sm">Code analysis and suggestions</p>
          </div>

          <div className="flex-1 bg-gray-800 rounded-lg p-4 border border-gray-700 overflow-hidden">
            {isLoading ? (

              <div className="h-full flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-lg font-medium text-blue-300 mb-2">Reviewing your code...</h3>
                  <p className="text-gray-400">
                    Please wait while AI analyzes your code
                  </p>
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
            ) : review ? (
              // Review Content
              <div className="h-full overflow-auto">
                <div className="prose prose-invert max-w-none">
                  <Markdown
                    rehypePlugins={[rehypeHighlight]}
                  >{review}</Markdown>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
                  <p>💡 Note: AI suggestions are for guidance only.</p>
                </div>
              </div>
            ) : (
              // Empty State - Simple
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
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default App