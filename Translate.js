import React, { useState } from 'react';
import axios from 'axios';
import { translations } from '../../data/translations';

const Translate = ({ language, isPremium }) => {
  const t = translations[language] || translations.en;
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const API_KEY = 'AIzaSyCBq12Z4J4M5HtZ84OEIoLdlJKxn9sUO2I';

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    // Check for premium limitations
    if (!isPremium && inputText.length > 100) {
      setError(t.translationLimit);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const encodedText = encodeURIComponent(inputText);
      const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&q=${encodedText}&target=${targetLanguage}`;
      
      // Add source language if not set to auto
      const urlWithSource = sourceLanguage !== 'auto' ? `${url}&source=${sourceLanguage}` : url;
      
      const response = await axios.get(urlWithSource);
      
      if (response.data && response.data.data && response.data.data.translations) {
        setTranslatedText(response.data.data.translations[0].translatedText);
      } else {
        setError('Translation failed. Please try again.');
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const languageOptions = [
    { code: 'auto', name: 'Auto-detect' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'th', name: 'Thai' },
    { code: 'pl', name: 'Polish' },
    { code: 'uk', name: 'Ukrainian' }
  ];

  return (
    <div className="translate-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h2 className="text-center mb-4">{t.translateHeading}</h2>
            
            <div className="card mb-4">
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="inputText" className="form-label">{t.translateText}</label>
                  <textarea
                    id="inputText"
                    className="form-control"
                    rows="5"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t.translateText}
                  ></textarea>
                  {!isPremium && (
                    <small className="text-muted">
                      {`${inputText.length}/100 ${t.characters}`}
                    </small>
                  )}
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="sourceLanguage" className="form-label">{t.sourceLanguage}</label>
                    <select
                      id="sourceLanguage"
                      className="form-select"
                      value={sourceLanguage}
                      onChange={(e) => setSourceLanguage(e.target.value)}
                    >
                      {languageOptions.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="targetLanguage" className="form-label">{t.targetLanguage}</label>
                    <select
                      id="targetLanguage"
                      className="form-select"
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                    >
                      {languageOptions.filter(lang => lang.code !== 'auto').map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button
                  className="btn btn-primary w-100"
                  onClick={handleTranslate}
                  disabled={isLoading || !inputText.trim()}
                >
                  {isLoading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="ms-2">Translating...</span>
                    </span>
                  ) : (
                    t.translateButton
                  )}
                </button>
                
                {!isPremium && (
                  <div className="mt-2 small text-muted">
                    {t.premiumFeature}
                  </div>
                )}
                
                {error && (
                  <div className="alert alert-danger mt-3">{error}</div>
                )}
              </div>
            </div>
            
            {translatedText && (
              <div className="card">
                <div className="card-header bg-light">
                  <h5 className="mb-0">{t.translationResult}</h5>
                </div>
                <div className="card-body">
                  <p className="mb-0">{translatedText}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translate;
