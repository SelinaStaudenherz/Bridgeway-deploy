import React, { forwardRef } from 'react';
import { translations } from '../../data/translations';

const ResumePreview = forwardRef(({ resumeData, language }, ref) => {
  const t = translations[language] || translations.en;

  return (
    <div className="resume-preview p-4 bg-white shadow" ref={ref}>
      {/* Header / Personal Info */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">{resumeData.personalInfo.name || 'Your Name'}</h1>
        <div className="contact-info">
          {resumeData.personalInfo.email && (
            <div className="mb-1">{resumeData.personalInfo.email}</div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="mb-1">{resumeData.personalInfo.phone}</div>
          )}
          {resumeData.personalInfo.address && (
            <div>{resumeData.personalInfo.address}</div>
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="section mb-4">
        <h3 className="section-title border-bottom pb-2 mb-3">{t.education}</h3>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            {edu.institution && (
              <div className="fw-bold">{edu.institution}</div>
            )}
            <div className="d-flex justify-content-between">
              {edu.degree && (
                <div>{edu.degree}</div>
              )}
              {edu.year && (
                <div>{edu.year}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Experience Section */}
      <div className="section mb-4">
        <h3 className="section-title border-bottom pb-2 mb-3">{t.workExperience}</h3>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="mb-3">
            <div className="d-flex justify-content-between">
              {exp.company && (
                <div className="fw-bold">{exp.company}</div>
              )}
              {exp.period && (
                <div>{exp.period}</div>
              )}
            </div>
            {exp.position && (
              <div className="fst-italic">{exp.position}</div>
            )}
            {exp.responsibilities && (
              <div className="mt-2">{exp.responsibilities}</div>
            )}
          </div>
        ))}
      </div>

      {/* Skills Section */}
      {resumeData.skills.length > 0 && (
        <div className="section">
          <h3 className="section-title border-bottom pb-2 mb-3">{t.skills}</h3>
          <div className="d-flex flex-wrap">
            {resumeData.skills.map((skill, index) => (
              <span key={index} className="me-3 mb-2">• {skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default ResumePreview;
