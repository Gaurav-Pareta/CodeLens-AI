import { languageConfig } from '../../config/languageConfig';

export const LanguageSelector = ({ language, onLanguageChange }) => {
  const handleChange = (e) => {
    const newLanguage = e.target.value;
    onLanguageChange(newLanguage, languageConfig[newLanguage].sample);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Select Language
      </label>
      <select
        value={language}
        onChange={handleChange}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Object.entries(languageConfig).map(([key, config]) => (
          <option key={key} value={key}>
            {config.name}
          </option>
        ))}
      </select>
    </div>
  );
};