import React, { useState } from 'react';
import { translations } from '../../data/translations';

const ResumeForm = ({
  resumeData,
  handlePersonalInfoChange,
  handleEducationChange,
  addEducation,
  removeEducation,
  handleExperienceChange,
  addExperience,
  removeExperience,
  handleAddSkill,
  handleRemoveSkill,
  language
}) => {
  const t = translations[language] || translations.en;
  const [newSkill, setNewSkill] = useState('');

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (newSkill.trim() !== '') {
      handleAddSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <div className="resume-form">
      {/* Personal Information */}
      <div className="section mb-4">
        <h4>{t.personalInfo}</h4>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="name" className="form-label">{t.fullName}</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={resumeData.personalInfo.name}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">{t.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={resumeData.personalInfo.email}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="phone" className="form-label">{t.phone}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              value={resumeData.personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="address" className="form-label">{t.address}</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={resumeData.personalInfo.address}
              onChange={handlePersonalInfoChange}
            />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="section mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>{t.education}</h4>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-primary"
            onClick={addEducation}
          >
            {t.addEducation}
          </button>
        </div>
        
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="education-item border p-3 mb-3 rounded">
            <div className="row">
              <div className="col-md-12 mb-2">
                <label className="form-label">{t.institution}</label>
                <input
                  type="text"
                  className="form-control"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                />
              </div>
              <div className="col-md-8 mb-2">
                <label className="form-label">{t.degree}</label>
                <input
                  type="text"
                  className="form-control"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">{t.graduationYear}</label>
                <input
                  type="text"
                  className="form-control"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(edu.id, 'year', e.target.value)}
                />
              </div>
              {resumeData.education.length > 1 && (
                <div className="col-12 text-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeEducation(edu.id)}
                  >
                    {t.remove}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div className="section mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>{t.workExperience}</h4>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-primary"
            onClick={addExperience}
          >
            {t.addExperience}
          </button>
        </div>
        
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="experience-item border p-3 mb-3 rounded">
            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="form-label">{t.companyName}</label>
                <input
                  type="text"
                  className="form-control"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-2">
                <label className="form-label">{t.jobTitle}</label>
                <input
                  type="text"
                  className="form-control"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)}
                />
              </div>
              <div className="col-md-12 mb-2">
                <label className="form-label">{t.employmentPeriod}</label>
                <input
                  type="text"
                  className="form-control"
                  value={exp.period}
                  onChange={(e) => handleExperienceChange(exp.id, 'period', e.target.value)}
                  placeholder="e.g., Jan 2020 - Present"
                />
              </div>
              <div className="col-md-12 mb-2">
                <label className="form-label">{t.responsibilities}</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={exp.responsibilities}
                  onChange={(e) => handleExperienceChange(exp.id, 'responsibilities', e.target.value)}
                ></textarea>
              </div>
              {resumeData.experience.length > 1 && (
                <div className="col-12 text-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeExperience(exp.id)}
                  >
                    {t.remove}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="section mb-4">
        <h4>{t.skills}</h4>
        <form onSubmit={handleSkillSubmit} className="mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder={t.addSkill}
            />
            <button type="submit" className="btn btn-primary">
              {t.add}
            </button>
          </div>
        </form>
        
        <div className="skills-list">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="badge bg-light text-dark me-2 mb-2 p-2">
              {skill}
              <button
                type="button"
                className="btn-close ms-2"
                style={{ fontSize: '0.6rem' }}
                onClick={() => handleRemoveSkill(skill)}
                aria-label="Remove"
              ></button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
