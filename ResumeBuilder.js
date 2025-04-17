import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { translations } from '../../data/translations';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import ResumeUpload from './ResumeUpload';

const ResumeBuilder = ({ language, isPremium }) => {
  const t = translations[language] || translations.en;
  const resumeRef = useRef();
  const [activeTab, setActiveTab] = useState('builder');
  
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    education: [
      { id: 1, institution: '', degree: '', year: '' }
    ],
    experience: [
      { id: 1, company: '', position: '', period: '', responsibilities: '' }
    ],
    skills: []
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value
      }
    });
  };

  const handleEducationChange = (id, field, value) => {
    const updatedEducation = resumeData.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setResumeData({
      ...resumeData,
      education: updatedEducation
    });
  };

  const addEducation = () => {
    const newId = resumeData.education.length > 0 
      ? Math.max(...resumeData.education.map(edu => edu.id)) + 1 
      : 1;
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { id: newId, institution: '', degree: '', year: '' }]
    });
  };

  const removeEducation = (id) => {
    if (resumeData.education.length > 1) {
      setResumeData({
        ...resumeData,
        education: resumeData.education.filter(edu => edu.id !== id)
      });
    }
  };

  const handleExperienceChange = (id, field, value) => {
    const updatedExperience = resumeData.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setResumeData({
      ...resumeData,
      experience: updatedExperience
    });
  };

  const addExperience = () => {
    const newId = resumeData.experience.length > 0 
      ? Math.max(...resumeData.experience.map(exp => exp.id)) + 1 
      : 1;
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { id: newId, company: '', position: '', period: '', responsibilities: '' }]
    });
  };

  const removeExperience = (id) => {
    if (resumeData.experience.length > 1) {
      setResumeData({
        ...resumeData,
        experience: resumeData.experience.filter(exp => exp.id !== id)
      });
    }
  };

  const handleAddSkill = (skill) => {
    if (skill.trim() !== '' && !resumeData.skills.includes(skill)) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, skill]
      });
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `${resumeData.personalInfo.name || 'Resume'}_${new Date().toLocaleDateString()}`,
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        resolve();
      });
    },
    onAfterPrint: () => {
      console.log('Print completed');
    }
  });

  return (
    <div className="resume-builder-container">
      <div className="container">
        <h2 className="text-center mb-4">{t.resumeBuilderHeading}</h2>
        
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'builder' ? 'active' : ''}`}
              onClick={() => setActiveTab('builder')}
            >
              {t.resumeBuilderTitle}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              {t.uploadResume}
            </button>
          </li>
        </ul>

        {activeTab === 'builder' ? (
          <div className="row">
            <div className="col-lg-6">
              <div className="form-container">
                <ResumeForm 
                  resumeData={resumeData}
                  handlePersonalInfoChange={handlePersonalInfoChange}
                  handleEducationChange={handleEducationChange}
                  addEducation={addEducation}
                  removeEducation={removeEducation}
                  handleExperienceChange={handleExperienceChange}
                  addExperience={addExperience}
                  removeExperience={removeExperience}
                  handleAddSkill={handleAddSkill}
                  handleRemoveSkill={handleRemoveSkill}
                  language={language}
                />
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="preview-container">
                <h3 className="mb-3">{t.livePreview}</h3>
                
                <div className="mb-3">
                  <button 
                    className="btn btn-primary" 
                    onClick={handlePrint}
                    disabled={!isPremium && 
                      (resumeData.personalInfo.name === '' || 
                       resumeData.personalInfo.email === '')}
                  >
                    {t.downloadResume}
                  </button>
                  {!isPremium && (
                    <div className="mt-2 text-muted small">
                      {t.premiumFeature}
                    </div>
                  )}
                </div>
                
                <div className="resume-preview-wrapper">
                  <ResumePreview 
                    resumeData={resumeData} 
                    ref={resumeRef}
                    language={language}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ResumeUpload language={language} isPremium={isPremium} />
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
