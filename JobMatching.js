import React, { useState } from 'react';
import { jobs } from '../../data/jobs';
import { translations } from '../../data/translations';
import JobMatchingForm from './JobMatchingForm';
import JobList from './JobList';
import JobBrowse from './JobBrowse';

const JobMatching = ({ language }) => {
  const t = translations[language] || translations.en;
  const [activeTab, setActiveTab] = useState('browse'); // Default to browse tab
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    languageProficiency: '',
    jobExperience: '',
    availability: '',
    preferredIndustry: ''
  });
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const findJobMatches = () => {
    // Map experience level to filter values
    const experienceLevelMap = {
      'no experience': 'no experience',
      'less than 1 year': '0-1 year',
      '1-3 years': '1-3 years',
      '3-5 years': '3-5 years',
      '5+ years': '5+ years'
    };

    // Filter jobs based on user criteria
    const filtered = jobs.filter(job => {
      // Language check
      const languageMatch = !formData.languageProficiency || 
        ['beginner', 'intermediate'].includes(job.languageRequirement) || 
        (job.languageRequirement === 'advanced' && formData.languageProficiency === 'advanced') ||
        (job.languageRequirement === 'advanced' && formData.languageProficiency === 'fluent') ||
        (job.languageRequirement === 'fluent' && formData.languageProficiency === 'fluent');
      
      // Experience check
      const experienceMatch = !formData.jobExperience || 
        job.experienceLevel === experienceLevelMap[formData.jobExperience] ||
        (job.experienceLevel === 'no experience' && formData.jobExperience !== 'no experience');
      
      // Availability check
      const availabilityMatch = !formData.availability || 
        job.availability === formData.availability;
      
      // Industry check
      const industryMatch = !formData.preferredIndustry || 
        job.industry === formData.preferredIndustry;
      
      return languageMatch && experienceMatch && availabilityMatch && industryMatch;
    });

    setMatchedJobs(filtered);
    setShowResults(true);
  };

  const resetSearch = () => {
    setFormData({
      languageProficiency: '',
      jobExperience: '',
      availability: '',
      preferredIndustry: ''
    });
    setCurrentStep(1);
    setShowResults(false);
  };

  return (
    <div className="job-matching-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <h2 className="text-center mb-4">{t.jobMatchingHeading}</h2>
            
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'browse' ? 'active' : ''}`}
                  onClick={() => setActiveTab('browse')}
                >
                  {t.browseJobs}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'match' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('match');
                    setShowResults(false);
                  }}
                >
                  {t.matchJobs}
                </button>
              </li>
            </ul>
            
            {activeTab === 'browse' ? (
              <JobBrowse language={language} />
            ) : !showResults ? (
              <div className="form-container">
                <JobMatchingForm 
                  currentStep={currentStep}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                  findJobMatches={findJobMatches}
                  language={language}
                />
              </div>
            ) : (
              <div className="results-container">
                <JobList 
                  jobs={matchedJobs} 
                  resetSearch={resetSearch}
                  language={language} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatching;
