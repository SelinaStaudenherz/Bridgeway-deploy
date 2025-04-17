import React from 'react';
import { translations } from '../../data/translations';

const JobMatchingForm = ({
  currentStep,
  formData,
  handleInputChange,
  handleNext,
  handlePrevious,
  findJobMatches,
  language
}) => {
  const t = translations[language] || translations.en;

  // Validate if the current step is complete
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.languageProficiency !== '';
      case 2:
        return formData.jobExperience !== '';
      case 3:
        return formData.availability !== '';
      case 4:
        return formData.preferredIndustry !== '';
      default:
        return false;
    }
  };

  return (
    <div className="job-matching-form">
      {/* Progress Steps */}
      <div className="progress-container mb-4">
        <div className="progress" style={{ height: '8px' }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${(currentStep / 4) * 100}%` }}
            aria-valuenow={currentStep}
            aria-valuemin="0"
            aria-valuemax="4"
          ></div>
        </div>
        <div className="d-flex justify-content-between">
          <span className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</span>
          <span className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</span>
          <span className={`step ${currentStep >= 3 ? 'active' : ''}`}>3</span>
          <span className={`step ${currentStep >= 4 ? 'active' : ''}`}>4</span>
        </div>
      </div>

      {/* Step 1: Language Proficiency */}
      {currentStep === 1 && (
        <div className="step-content">
          <h3 className="mb-3">{t.languageProficiency}</h3>
          <p className="text-muted mb-4">{t.selectLanguageProficiency}</p>
          
          <div className="form-group">
            <div className="form-check mb-2">
              <input
                type="radio"
                id="beginner"
                name="languageProficiency"
                value="beginner"
                className="form-check-input"
                checked={formData.languageProficiency === 'beginner'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="beginner">{t.beginner}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="intermediate"
                name="languageProficiency"
                value="intermediate"
                className="form-check-input"
                checked={formData.languageProficiency === 'intermediate'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="intermediate">{t.intermediate}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="advanced"
                name="languageProficiency"
                value="advanced"
                className="form-check-input"
                checked={formData.languageProficiency === 'advanced'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="advanced">{t.advanced}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="fluent"
                name="languageProficiency"
                value="fluent"
                className="form-check-input"
                checked={formData.languageProficiency === 'fluent'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="fluent">{t.fluent}</label>
            </div>
          </div>
          
          <div className="d-flex justify-content-end mt-4">
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!isStepComplete()}
            >
              {t.next}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Job Experience */}
      {currentStep === 2 && (
        <div className="step-content">
          <h3 className="mb-3">{t.jobExperience}</h3>
          <p className="text-muted mb-4">{t.experienceYears}</p>
          
          <div className="form-group">
            <div className="form-check mb-2">
              <input
                type="radio"
                id="noExperience"
                name="jobExperience"
                value="no experience"
                className="form-check-input"
                checked={formData.jobExperience === 'no experience'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="noExperience">{t.noExperience}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="lessThanYear"
                name="jobExperience"
                value="less than 1 year"
                className="form-check-input"
                checked={formData.jobExperience === 'less than 1 year'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="lessThanYear">{t.lessThanYear}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="oneToThree"
                name="jobExperience"
                value="1-3 years"
                className="form-check-input"
                checked={formData.jobExperience === '1-3 years'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="oneToThree">{t.oneToThree}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="threeToFive"
                name="jobExperience"
                value="3-5 years"
                className="form-check-input"
                checked={formData.jobExperience === '3-5 years'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="threeToFive">{t.threeToFive}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="fivePlus"
                name="jobExperience"
                value="5+ years"
                className="form-check-input"
                checked={formData.jobExperience === '5+ years'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="fivePlus">{t.fivePlus}</label>
            </div>
          </div>
          
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-secondary" onClick={handlePrevious}>
              {t.previous}
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!isStepComplete()}
            >
              {t.next}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Availability */}
      {currentStep === 3 && (
        <div className="step-content">
          <h3 className="mb-3">{t.availability}</h3>
          <p className="text-muted mb-4">{t.selectAvailability}</p>
          
          <div className="form-group">
            <div className="form-check mb-2">
              <input
                type="radio"
                id="fullTime"
                name="availability"
                value="full-time"
                className="form-check-input"
                checked={formData.availability === 'full-time'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="fullTime">{t.fullTime}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="partTime"
                name="availability"
                value="part-time"
                className="form-check-input"
                checked={formData.availability === 'part-time'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="partTime">{t.partTime}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="contract"
                name="availability"
                value="contract"
                className="form-check-input"
                checked={formData.availability === 'contract'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="contract">{t.contract}</label>
            </div>
          </div>
          
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-secondary" onClick={handlePrevious}>
              {t.previous}
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!isStepComplete()}
            >
              {t.next}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Preferred Industry */}
      {currentStep === 4 && (
        <div className="step-content">
          <h3 className="mb-3">{t.preferredIndustry}</h3>
          <p className="text-muted mb-4">{t.selectIndustry}</p>
          
          <div className="form-group">
            <div className="form-check mb-2">
              <input
                type="radio"
                id="technology"
                name="preferredIndustry"
                value="technology"
                className="form-check-input"
                checked={formData.preferredIndustry === 'technology'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="technology">{t.technology}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="healthcare"
                name="preferredIndustry"
                value="healthcare"
                className="form-check-input"
                checked={formData.preferredIndustry === 'healthcare'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="healthcare">{t.healthcare}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="hospitality"
                name="preferredIndustry"
                value="hospitality"
                className="form-check-input"
                checked={formData.preferredIndustry === 'hospitality'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="hospitality">{t.hospitality}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="retail"
                name="preferredIndustry"
                value="retail"
                className="form-check-input"
                checked={formData.preferredIndustry === 'retail'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="retail">{t.retail}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="manufacturing"
                name="preferredIndustry"
                value="manufacturing"
                className="form-check-input"
                checked={formData.preferredIndustry === 'manufacturing'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="manufacturing">{t.manufacturing}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="construction"
                name="preferredIndustry"
                value="construction"
                className="form-check-input"
                checked={formData.preferredIndustry === 'construction'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="construction">{t.construction}</label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="education"
                name="preferredIndustry"
                value="education"
                className="form-check-input"
                checked={formData.preferredIndustry === 'education'}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="education">{t.education}</label>
            </div>
          </div>
          
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-secondary" onClick={handlePrevious}>
              {t.previous}
            </button>
            <button
              className="btn btn-primary"
              onClick={findJobMatches}
              disabled={!isStepComplete()}
            >
              {t.findMatches}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobMatchingForm;
