import React, { useState } from 'react';
import { translations } from '../../data/translations';

const EmployerDashboard = ({ language }) => {
  const t = translations[language] || translations.en;
  const [activeTab, setActiveTab] = useState('post');
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    requirements: ''
  });
  const [applications, setApplications] = useState({});
  const [messageText, setMessageText] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle job posting
  const handlePostJob = (e) => {
    e.preventDefault();
    
    const newJob = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString(),
      applications: []
    };
    
    setJobs([...jobs, newJob]);
    
    // Reset form
    setFormData({
      title: '',
      company: '',
      location: '',
      salary: '',
      description: '',
      requirements: ''
    });
    
    // Switch to my jobs tab
    setActiveTab('jobs');
  };

  // Handle job deletion
  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  // Handle viewing job applications
  const handleViewApplications = (jobId) => {
    // Simulate fetching applications for the job
    if (!applications[jobId]) {
      // Mock data - in a real app, this would come from an API
      const mockApplications = Array(Math.floor(Math.random() * 5)).fill().map((_, i) => ({
        id: i + 1,
        name: `Applicant ${i + 1}`,
        email: `applicant${i + 1}@example.com`,
        phone: `(555) 123-456${i}`,
        experience: ['Previous Company', 'Another Company'],
        education: 'University Degree',
        message: 'I am interested in this position and believe my skills align well with your requirements.'
      }));
      
      setApplications({
        ...applications,
        [jobId]: mockApplications
      });
    }
    
    setActiveTab('applications');
  };

  // Handle contacting a candidate
  const handleContactCandidate = (applicantEmail) => {
    if (!messageText.trim()) {
      alert('Please enter a message to send');
      return;
    }
    
    // In a real app, this would send an email or message
    alert(`Message sent to ${applicantEmail}: ${messageText}`);
    setMessageText('');
  };

  return (
    <div className="employer-dashboard-container">
      <div className="container">
        <h2 className="text-center mb-4">{t.employerHeading}</h2>
        
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'post' ? 'active' : ''}`}
              onClick={() => setActiveTab('post')}
            >
              {t.postJob}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              {t.myJobs}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
              disabled={!Object.keys(applications).length}
            >
              {t.applications}
            </button>
          </li>
        </ul>
        
        {/* Post Job Tab */}
        {activeTab === 'post' && (
          <div className="tab-pane fade show active">
            <div className="form-container">
              <form onSubmit={handlePostJob}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="title" className="form-label">{t.jobTitle}</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="company" className="form-label">{t.companyName}</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="form-control"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="location" className="form-label">{t.location}</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-control"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="salary" className="form-label">{t.salary}</label>
                    <input
                      type="text"
                      id="salary"
                      name="salary"
                      className="form-control"
                      value={formData.salary}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">{t.description}</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows="4"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="requirements" className="form-label">{t.requirements}</label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    className="form-control"
                    rows="3"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    {t.postJobButton}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* My Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="tab-pane fade show active">
            {jobs.length === 0 ? (
              <div className="alert alert-info">
                {t.noJobs}
              </div>
            ) : (
              <div className="row">
                {jobs.map(job => (
                  <div className="col-md-6 mb-4" key={job.id}>
                    <div className="employer-job-card">
                      <h4>{job.title}</h4>
                      <p><strong>{t.companyName}:</strong> {job.company}</p>
                      <p><strong>{t.location}:</strong> {job.location}</p>
                      <p><strong>{t.salary}:</strong> {job.salary}</p>
                      <div className="mt-3 d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleViewApplications(job.id)}
                        >
                          {t.viewApplications}
                        </button>
                        <div>
                          <button
                            className="btn btn-sm btn-outline-secondary me-2"
                            onClick={() => {
                              setFormData({...job});
                              setActiveTab('post');
                            }}
                          >
                            {t.editJob}
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteJob(job.id)}
                          >
                            {t.deleteJob}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="tab-pane fade show active">
            {Object.keys(applications).length === 0 ? (
              <div className="alert alert-info">
                {t.noApplications}
              </div>
            ) : (
              Object.entries(applications).map(([jobId, jobApplicants]) => {
                const job = jobs.find(j => j.id === parseInt(jobId));
                return (
                  <div key={jobId} className="mb-4">
                    <h4 className="mb-3">
                      {t.applicationsFor} {job?.title || 'Job'}
                    </h4>
                    
                    {jobApplicants.length === 0 ? (
                      <div className="alert alert-info">
                        {t.noApplications}
                      </div>
                    ) : (
                      jobApplicants.map(applicant => (
                        <div key={applicant.id} className="card mb-3">
                          <div className="card-header bg-light d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">{applicant.name}</h5>
                          </div>
                          <div className="card-body">
                            <p><strong>Email:</strong> {applicant.email}</p>
                            <p><strong>Phone:</strong> {applicant.phone}</p>
                            <p><strong>Experience:</strong> {applicant.experience.join(', ')}</p>
                            <p><strong>Education:</strong> {applicant.education}</p>
                            <p><strong>Message:</strong> {applicant.message}</p>
                            
                            <div className="mt-3">
                              <div className="input-group mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Type your message here..."
                                  value={messageText}
                                  onChange={(e) => setMessageText(e.target.value)}
                                />
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={() => handleContactCandidate(applicant.email)}
                                >
                                  {t.contactCandidate}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
