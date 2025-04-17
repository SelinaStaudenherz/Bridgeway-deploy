import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { translations } from '../../data/translations';
import ResumeEnhancer from './ResumeEnhancer';

const ResumeUpload = ({ language, isPremium }) => {
  const t = translations[language] || translations.en;
  const fileInputRef = useRef(null);
  const enhancedResumeRef = useRef();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [isEnhancingResume, setIsEnhancingResume] = useState(false);
  const [enhancedResume, setEnhancedResume] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    const fileType = file.type;
    const validTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!validTypes.includes(fileType)) {
      setError('Please upload a PDF or Word document');
      setUploadedFile(null);
      setFileName('');
      return;
    }
    
    setUploadedFile(file);
    setFileName(file.name);
    setError('');
    setFeedback('');
  };

  const generateFeedback = () => {
    if (!uploadedFile) {
      setError('Please upload a resume first');
      return;
    }
    
    setIsGeneratingFeedback(true);
    setError('');
    
    // Simulate AI analysis with a timeout
    setTimeout(() => {
      // This would be an actual API call in a real application
      const mockFeedback = generateMockFeedback();
      setFeedback(mockFeedback);
      setIsGeneratingFeedback(false);
    }, 2000);
  };
  
  const enhanceResume = () => {
    if (!uploadedFile) {
      setError('Please upload a resume first');
      return;
    }
    
    setIsEnhancingResume(true);
    setError('');
    
    // Simulate resume enhancement with a timeout
    setTimeout(() => {
      // This would be an actual API call in a real application
      const enhancedData = generateEnhancedResume();
      setEnhancedResume(enhancedData);
      setIsEnhancingResume(false);
    }, 3000);
  };
  
  const handlePrint = useReactToPrint({
    content: () => enhancedResumeRef.current,
    documentTitle: `Enhanced_Resume_${new Date().toLocaleDateString()}`,
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        resolve();
      });
    },
    onAfterPrint: () => {
      console.log('Print completed');
    }
  });

  const generateEnhancedResume = () => {
    // In a real app, this would use the actual uploaded resume content
    // to generate an enhanced version based on best practices and AI analysis
    return {
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@example.com',
      phone: '(555) 123-4567',
      address: 'New York, NY',
      summary: 'Detail-oriented marketing professional with 5+ years of experience driving successful digital campaigns and increasing brand engagement. Skilled in social media management, content creation, and campaign analytics with a proven track record of exceeding engagement targets by 35% through strategic, data-driven approaches.',
      skills: [
        {
          category: 'Marketing',
          items: ['Social Media Marketing', 'Content Strategy', 'SEO/SEM', 'Email Marketing', 'Campaign Analytics']
        },
        {
          category: 'Technical',
          items: ['Google Analytics', 'Adobe Creative Suite', 'Hootsuite', 'Mailchimp', 'WordPress', 'Microsoft Office']
        }
      ],
      experience: [
        {
          company: 'Global Marketing Partners',
          position: 'Digital Marketing Specialist',
          period: 'Jan 2021 - Present',
          achievements: [
            'Increased social media engagement by 45% through implementation of strategic content calendar and targeted campaigns',
            'Managed $50,000 monthly ad budget across Google Ads and social platforms, achieving 3.2x ROI',
            'Led rebranding initiative that increased website traffic by 28% and reduced bounce rate by 15%',
            'Collaborated with cross-functional teams to develop cohesive marketing strategies for 12 major product launches'
          ]
        },
        {
          company: 'Creative Solutions Agency',
          position: 'Marketing Coordinator',
          period: 'Mar 2018 - Dec 2020',
          achievements: [
            'Coordinated marketing campaigns for 15+ clients across diverse industries',
            'Developed and managed content calendars for multiple social media platforms',
            'Analyzed campaign performance metrics and prepared monthly reports for clients',
            'Assisted in the planning and execution of 20+ client events with budgets up to $30,000'
          ]
        }
      ],
      education: [
        {
          institution: 'University of Marketing Sciences',
          degree: 'Bachelor of Business Administration, Marketing',
          year: '2018',
          achievements: ['Graduated Cum Laude', 'Marketing Student Association President']
        }
      ],
      certifications: [
        { name: 'Google Analytics Certification', issuer: 'Google', year: '2020' },
        { name: 'Digital Marketing Specialist', issuer: 'American Marketing Association', year: '2019' }
      ]
    };
  };

  const generateMockFeedback = () => {
    // In a real app, this would come from an AI analysis of the actual resume
    return `## Resume Feedback Summary

### Strengths:
- Strong educational background that aligns with the target industry
- Clear job descriptions with quantifiable achievements
- Good use of action verbs in experience descriptions

### Areas for Improvement:
- Add a professional summary section to highlight key qualifications
- Include more specific technical skills relevant to your target positions
- Quantify more achievements with specific metrics and results
- Consider adding a section for certifications or professional development

### Formatting Suggestions:
- Ensure consistent spacing and alignment throughout the document
- Use bullet points for better readability of job responsibilities
- Keep resume to 1-2 pages maximum depending on experience level
- Consider using a more modern template with better visual hierarchy

### Industry-Specific Recommendations:
- Highlight experience with relevant industry tools and technologies
- Add keywords from job descriptions you're targeting
- Consider including relevant projects or portfolio links`;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const fileType = file.type;
      const validTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (validTypes.includes(fileType)) {
        setUploadedFile(file);
        setFileName(file.name);
        setError('');
        setFeedback('');
      } else {
        setError('Please upload a PDF or Word document');
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFileName('');
    setFeedback('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="resume-upload-container">
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-light">
              <h5 className="mb-0">{t.uploadResume}</h5>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">{t.uploadInstructions}</p>
              
              {error && <div className="alert alert-danger mb-3">{error}</div>}
              
              <div 
                className="upload-area p-4 mb-3 text-center border rounded"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{ 
                  backgroundColor: '#f8f9fa',
                  border: '2px dashed #ced4da',
                  cursor: 'pointer'
                }}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
                
                {!uploadedFile ? (
                  <>
                    <i className="fas fa-cloud-upload-alt" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                    <p className="mt-3 mb-0">Drag & drop a file here or click to browse</p>
                  </>
                ) : (
                  <>
                    <i className="fas fa-file-alt" style={{ fontSize: '3rem', color: '#0d6efd' }}></i>
                    <p className="mt-3 mb-0">{fileName}</p>
                    <button 
                      className="btn btn-sm btn-outline-danger mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                    >
                      {t.remove}
                    </button>
                  </>
                )}
              </div>
              
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary"
                  onClick={generateFeedback}
                  disabled={!uploadedFile || isGeneratingFeedback}
                >
                  {isGeneratingFeedback ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {t.feedbackGenerating}
                    </>
                  ) : (
                    t.generateFeedback
                  )}
                </button>
                
                <button 
                  className="btn btn-success"
                  onClick={enhanceResume}
                  disabled={!uploadedFile || isEnhancingResume}
                >
                  {isEnhancingResume ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {t.enhancingResume}
                    </>
                  ) : (
                    t.enhanceResume
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-light">
              <h5 className="mb-0">{t.feedbackTitle}</h5>
            </div>
            <div className="card-body">
              {feedback ? (
                <div className="feedback-content" style={{ whiteSpace: 'pre-wrap' }}>
                  {feedback.split('##').map((section, index) => {
                    if (index === 0) return null;
                    
                    const lines = section.split('\n');
                    const title = lines[0];
                    const content = lines.slice(1).join('\n');
                    
                    return (
                      <div key={index} className="mb-3">
                        <h5>{title}</h5>
                        <div dangerouslySetInnerHTML={{ 
                          __html: content.replace(/- /g, '• ').replace(/\n/g, '<br/>') 
                        }} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-muted p-5">
                  {isGeneratingFeedback ? (
                    <div className="d-flex flex-column align-items-center">
                      <div className="spinner-border mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p>{t.feedbackGenerating}</p>
                    </div>
                  ) : (
                    <p>Upload your resume and generate feedback to see AI analysis here</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Resume Section */}
      {enhancedResume && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{t.enhancedResume}</h5>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={handlePrint}
                >
                  {t.downloadEnhancedResume}
                </button>
              </div>
              <div className="card-body">
                <div className="text-center mb-3">
                  <p className="text-muted">{t.enhancedResumeDescription}</p>
                </div>
                <div style={{ display: 'none' }}>
                  <ResumeEnhancer 
                    ref={enhancedResumeRef} 
                    enhancedData={enhancedResume} 
                    language={language}
                  />
                </div>
                <div className="resume-preview-wrapper border p-3">
                  <ResumeEnhancer 
                    enhancedData={enhancedResume} 
                    language={language}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
