import React from 'react';
import { translations } from '../../data/translations';

const JobList = ({ jobs, resetSearch, language }) => {
  const t = translations[language] || translations.en;

  return (
    <div className="job-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>{t.jobMatches}</h3>
        <button className="btn btn-outline-primary" onClick={resetSearch}>
          {t.newSearch}
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="alert alert-info">
          {t.noJobsFound}
        </div>
      ) : (
        <div className="row">
          {jobs.map((job) => (
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
                    <strong>{t.requirements}:</strong> {job.requirements}
                  </p>
                  <p className="mb-0">{job.description}</p>
                </div>
                <div className="card-footer bg-white">
                  <button className="btn btn-primary w-100">
                    {t.applyNow}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
