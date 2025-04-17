import React, { useState, useEffect } from 'react';
import { quizQuestions } from '../../data/vocabulary';
import { translations } from '../../data/translations';

const Quiz = ({ language }) => {
  const t = translations[language] || translations.en;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    // Shuffle questions when component mounts
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random()).slice(0, 5);
    setShuffledQuestions(shuffled);
  }, []);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleOptionSelect = (option) => {
    if (selectedOption !== null) return; // Prevent changing answer after selection
    
    setSelectedOption(option);
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {!quizStarted ? (
        <div className="text-center">
          <h3 className="mb-4">{t.quizHeading}</h3>
          <p className="mb-4">{t.quizInstructions}</p>
          <button className="btn btn-primary btn-lg" onClick={startQuiz}>
            {t.startQuiz}
          </button>
        </div>
      ) : !quizCompleted ? (
        <div className="quiz-question-container">
          <div className="mb-4">
            <h3>
              {t.question} {currentQuestionIndex + 1} / {shuffledQuestions.length}
            </h3>
            <div className="progress mb-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%` }}
                aria-valuenow={currentQuestionIndex + 1}
                aria-valuemin="0"
                aria-valuemax={shuffledQuestions.length}
              ></div>
            </div>
            <h4 className="mb-4">{currentQuestion?.question}</h4>
          </div>

          <div className="mb-4">
            {currentQuestion?.options.map((option, index) => (
              <div
                key={index}
                className={`card mb-2 option-card ${
                  selectedOption === option
                    ? isCorrect
                      ? 'bg-success text-white'
                      : 'bg-danger text-white'
                    : ''
                }`}
                onClick={() => handleOptionSelect(option)}
                style={{ cursor: selectedOption === null ? 'pointer' : 'default' }}
              >
                <div className="card-body py-2">
                  {option}
                </div>
              </div>
            ))}
          </div>

          {selectedOption !== null && (
            <div className={`alert ${isCorrect ? 'alert-success' : 'alert-danger'}`}>
              {isCorrect ? t.correctAnswer : t.wrongAnswer}
              {!isCorrect && <div>{t.correctAnswerWas}: {currentQuestion?.correctAnswer}</div>}
            </div>
          )}

          <div className="text-center mt-4">
            <button
              className="btn btn-primary"
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              {currentQuestionIndex < shuffledQuestions.length - 1 ? t.nextQuestion : t.finishQuiz}
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-results text-center">
          <h3 className="mb-4">{t.yourScore}</h3>
          <div className="score-display mb-4">
            <div className="display-4">
              {score} / {shuffledQuestions.length}
            </div>
            <div className="mt-2">
              {Math.round((score / shuffledQuestions.length) * 100)}%
            </div>
          </div>
          <button className="btn btn-primary" onClick={startQuiz}>
            {t.tryAgain}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
