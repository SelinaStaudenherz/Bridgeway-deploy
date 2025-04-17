import React, { useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { translations } from '../../data/translations';

const ResumeEnhancer = React.forwardRef(({ enhancedData, language }, ref) => {
  const t = translations[language] || translations.en;
  
  if (!enhancedData) return null;
  
  return (
    <div className="enhanced-resume-preview p-4 bg-white shadow" ref={ref}>
      {/* Header / Personal Info */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">{enhancedData.name}</h1>
        <div className="contact-info">
          {enhancedData.email && (
            <div className="mb-1">{enhancedData.email}</div>
          )}
          {enhancedData.phone && (
            <div className="mb-1">{enhancedData.phone}</div>
          )}
          {enhancedData.address && (
            <div>{enhancedData.address}</div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      <div className="section mb-4">
        <h3 className="section-title border-bottom pb-2 mb-3">{t.professionalSummary}</h3>
        <p>{enhancedData.summary}</p>
      </div>

      {/* Skills Section */}
      <div className="section mb-4">
        <h3 className="section-title border-bottom pb-2 mb-3">{t.skills}</h3>
        <div className="row">
          {enhancedData.skills.map((skillGroup, index) => (
            <div key={index} className="col-md-6 mb-3">
              <div className="fw-bold mb-2">{skillGroup.category}</div>
              <ul className="mb-0">
                {skillGroup.items.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="section mb-4">
        <h3 className="section-title border-bottom pb-2 mb-3">{t.workExperience}</h3>
        {enhancedData.experience.map((exp, index) => (
          <div key={index} className="mb-3">
            <div className="d-flex justify-content-between">
              <div className="fw-bold">{exp.company}</div>
              <div>{exp.period}</div>
            </div>
            <div className="fst-italic">{exp.position}</div>
            <ul className="mt-2">
              {exp.achievements.map((achievement, idx) => (
                <li key={idx}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="section mb-4">
        <h3 className="section-title border-bottom pb-2 mb-3">{t.education}</h3>
        {enhancedData.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="fw-bold">{edu.institution}</div>
            <div className="d-flex justify-content-between">
              <div>{edu.degree}</div>
              <div>{edu.year}</div>
            </div>
            {edu.achievements && (
              <ul className="mt-2">
                {edu.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Certifications Section (if available) */}
      {enhancedData.certifications && enhancedData.certifications.length > 0 && (
        <div className="section mb-4">
          <h3 className="section-title border-bottom pb-2 mb-3">{t.certifications}</h3>
          <ul>
            {enhancedData.certifications.map((cert, index) => (
              <li key={index} className="mb-2">
                <strong>{cert.name}</strong> - {cert.issuer}, {cert.year}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default ResumeEnhancer;
