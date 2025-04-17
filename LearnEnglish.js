import React, { useState } from 'react';
import { translations } from '../../data/translations';
import Flashcards from './Flashcards';
import Quiz from './Quiz';

const LearnEnglish = ({ language }) => {
  const t = translations[language] || translations.en;
  const [activeTab, setActiveTab] = useState('flashcards');

  return (
    <div className="learn-english-container">
      <div className="container">
        <h2 className="text-center mb-4">{t.learnEnglishHeading}</h2>
        
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <ul className="nav nav-tabs nav-fill mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'flashcards' ? 'active' : ''}`}
                  onClick={() => setActiveTab('flashcards')}
                >
                  Flashcards
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'quiz' ? 'active' : ''}`}
                  onClick={() => setActiveTab('quiz')}
                >
                  Quiz
                </button>
              </li>
            </ul>
            
            <div className="tab-content">
              {activeTab === 'flashcards' ? (
                <Flashcards language={language} />
              ) : (
                <Quiz language={language} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnEnglish;
