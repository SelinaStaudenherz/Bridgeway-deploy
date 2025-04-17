import React, { useState, useEffect } from 'react';
import { jobs } from '../../data/jobs';
import { translations } from '../../data/translations';
import { Modal } from 'react-bootstrap';

const JobBrowse = ({ language }) => {
  const t = translations[language] || translations.en;
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    industry: '',
    experience: '',
    availability: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);

  useEffect(() => {
    // Initially show all jobs
    setFilteredJobs(jobs);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions({
      ...filterOptions,
      [name]: value
    });
  };

  const applyFilters = () => {
    let results = [...jobs];
    
    // Apply search term filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.requirements.toLowerCase().includes(term)
      );
    }
    
    // Apply industry filter
    if (filterOptions.industry) {
      results = results.filter(job => job.industry === filterOptions.industry);
    }
    
    // Apply experience filter
    if (filterOptions.experience) {
      results = results.filter(job => job.experienceLevel === filterOptions.experience);
    }
    
    // Apply availability filter
    if (filterOptions.availability) {
      results = results.filter(job => job.availability === filterOptions.availability);
    }
    
    setFilteredJobs(results);
  };

  const clearFilters = () => {
    setFilterOptions({
      industry: '',
      experience: '',
      availability: ''
    });
    setSearchTerm('');
    setFilteredJobs(jobs);
  };
  
  const openJobDetails = (job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };
  
  const closeJobModal = () => {
    setShowJobModal(false);
  };
  
  const applyToJob = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="job-browse-container">
      <h3 className="mb-4">{t.browseJobs}</h3>
      
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t.searchJobs}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-6 d-grid d-md-flex justify-content-md-end">
                <button type="submit" className="btn btn-primary me-md-2">{t.search}</button>
                <button type="button" className="btn btn-outline-secondary" onClick={clearFilters}>
                  {t.clearFilters}
                </button>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-4 mb-3">
                <select
                  name="industry"
                  className="form-select"
                  value={filterOptions.industry}
                  onChange={handleFilterChange}
                >
                  <option value="">{t.selectIndustry}</option>
                  <option value="technology">{t.technology}</option>
                  <option value="healthcare">{t.healthcare}</option>
                  <option value="hospitality">{t.hospitality}</option>
                  <option value="retail">{t.retail}</option>
                  <option value="manufacturing">{t.manufacturing}</option>
                  <option value="construction">{t.construction}</option>
                  <option value="education">{t.education}</option>
                </select>
              </div>
              
              <div className="col-md-4 mb-3">
                <select
                  name="experience"
                  className="form-select"
                  value={filterOptions.experience}
                  onChange={handleFilterChange}
                >
                  <option value="">{t.selectExperience}</option>
                  <option value="no experience">{t.noExperience}</option>
                  <option value="0-1 year">{t.lessThanYear}</option>
                  <option value="1-3 years">{t.oneToThree}</option>
                  <option value="3-5 years">{t.threeToFive}</option>
                  <option value="5+ years">{t.fivePlus}</option>
                </select>
              </div>
              
              <div className="col-md-4 mb-3">
                <select
                  name="availability"
                  className="form-select"
                  value={filterOptions.availability}
                  onChange={handleFilterChange}
                >
                  <option value="">{t.selectAvailability}</option>
                  <option value="full-time">{t.fullTime}</option>
                  <option value="part-time">{t.partTime}</option>
                  <option value="contract">{t.contract}</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div className="row">
        {filteredJobs.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">{t.noJobsFound}</div>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div className="col-md-6 mb-4" key={job.id}>
              <div className="card h-100">
                <div className="card-header bg-light">
                  <h5 className="mb-0">{job.title}</h5>
                </div>
                <div className="card-body">
                  <p className="mb-2">
                    <strong>{t.companyName}:</strong> {job.company}
                  </p>
                  <p className="mb-2">
                    <strong>{t.location}:</strong> {job.location}
                  </p>
                  <p className="mb-2">
                    <strong>{t.salary}:</strong> {job.salary}
                  </p>
                  <p className="mb-2">
                    <strong>{t.experienceLevel}:</strong> {job.experienceLevel}
                  </p>
                  <p className="mb-2">
                    <strong>{t.requirements}:</strong> {job.requirements}
                  </p>
                  <p className="mb-0">{job.description.length > 150 ? job.description.substring(0, 150) + '...' : job.description}</p>
                </div>
                <div className="card-footer bg-white d-flex gap-2">
                  <button className="btn btn-outline-primary flex-grow-1" onClick={() => openJobDetails(job)}>
                    {t.viewDetails}
                  </button>
                  <button className="btn btn-primary flex-grow-1" onClick={() => applyToJob(job.applicationUrl)}>
                    {t.applyNow}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Job Details Modal */}
      <Modal show={showJobModal} onHide={closeJobModal} size="lg">
        {selectedJob && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedJob.title} - {selectedJob.company}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">
                <h5>{t.jobDetails}</h5>
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>{t.location}:</strong> {selectedJob.location}</p>
                    <p><strong>{t.salary}:</strong> {selectedJob.salary}</p>
                    <p><strong>{t.experienceLevel}:</strong> {selectedJob.experienceLevel}</p>
                    <p><strong>{t.availability}:</strong> {selectedJob.availability}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>{t.industry}:</strong> {selectedJob.industry}</p>
                    <p><strong>{t.languageRequirement}:</strong> {selectedJob.languageRequirement}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h5>{t.jobDescription}</h5>
                <p>{selectedJob.description}</p>
              </div>
              
              <div className="mb-4">
                <h5>{t.requirements}</h5>
                <p>{selectedJob.requirements}</p>
              </div>
              
              <div className="mb-4">
                <h5>{t.benefits}</h5>
                <p>{selectedJob.benefits}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={closeJobModal}>
                {t.close}
              </button>
              <button className="btn btn-primary" onClick={() => applyToJob(selectedJob.applicationUrl)}>
                {t.applyNow}
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default JobBrowse;
