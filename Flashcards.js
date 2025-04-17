import React, { useState } from 'react';
import { workplaceVocabulary } from '../../data/vocabulary';
import { translations } from '../../data/translations';

const Flashcards = ({ language }) => {
  const t = translations[language] || translations.en;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === workplaceVocabulary.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? workplaceVocabulary.length - 1 : prevIndex - 1
    );
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  const currentCard = workplaceVocabulary[currentIndex];

  return (
    <div className="flashcards-container">
      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={toggleFlip}>
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <h3>{currentCard.term}</h3>
              </div>
              <div className="flashcard-back">
                <h4>{currentCard.term}</h4>
                <p><strong>Definition:</strong> {currentCard.definition}</p>
                <p><strong>Example:</strong> {currentCard.example}</p>
                {language === 'es' && <p><strong>Spanish:</strong> {currentCard.spanish}</p>}
                {language === 'fr' && <p><strong>French:</strong> {currentCard.french}</p>}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <p className="small text-muted">{t.clickToFlip}</p>
          </div>
          
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-primary" onClick={handlePrevious}>
              <i className="fas fa-chevron-left"></i> {t.previous}
            </button>
            <span className="align-self-center">
              {currentIndex + 1} / {workplaceVocabulary.length}
            </span>
            <button className="btn btn-outline-primary" onClick={handleNext}>
              {t.next} <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
