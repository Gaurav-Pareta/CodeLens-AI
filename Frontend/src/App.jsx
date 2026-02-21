import { useState } from 'react';
import { useCodeReview } from './hooks/useCodeReview';
import { CodeEditor } from './components/Editor/CodeEditor';
import { EditorHeader } from './components/Editor/EditorHeader';
import { LanguageSelector } from './components/Editor/LanguageSelector';
import { ReviewPanel } from './components/Review/ReviewPanel';
import { Button } from './components/Common/Button';
import { ErrorMessage } from './components/Common/ErrorMessage';
import { StatusIndicator } from './components/Common/StatusIndicator';
import { languageConfig } from './config/languageConfig';
import './App.css';

function App() {
  const [code, setCode] = useState(languageConfig.javascript.sample);
  const [language, setLanguage] = useState('javascript');
  const { review, isLoading, error, reviewCode } = useCodeReview();

  const handleLanguageChange = (newLanguage, sampleCode) => {
    setLanguage(newLanguage);
    setCode(sampleCode);
  };

  const handleReviewClick = async () => {
    await reviewCode(code, language);
  };

  return (
    <main className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white p-4 gap-4 overflow-hidden">
      {/* Left Panel - Editor */}
      <div className="flex-1 flex flex-col">
        <EditorHeader />
        
        <CodeEditor 
          code={code}
          onCodeChange={setCode}
          language={languageConfig[language].prismLang}
        />

        <div className="mt-4">
          <ErrorMessage message={error} />

          <LanguageSelector 
            language={language}
            onLanguageChange={handleLanguageChange}
          />

          <Button
            onClick={handleReviewClick}
            isLoading={isLoading}
            disabled={!code.trim()}
          />

          <StatusIndicator isLoading={isLoading} />
        </div>
      </div>

      {/* Right Panel - Review Output */}
      <ReviewPanel 
        isLoading={isLoading}
        review={review}
      />
    </main>
  );
}

export default App;