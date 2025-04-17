import React from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../../data/translations';
import { FaBriefcase, FaFileAlt, FaLanguage, FaBook, FaBalanceScale } from 'react-icons/fa';

const Home = ({ language }) => {
  const t = translations[language] || translations.en;

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">{t.welcomeTitle}</h1>
          <p className="lead mb-4">{t.welcomeSubtitle}</p>
          <Link to="/register" className="btn btn-primary btn-lg me-3">
            {t.getStarted}
          </Link>
          <Link to="/jobs" className="btn btn-outline-primary btn-lg">
            {t.findJobs}
          </Link>
        </div>
      </div>

      {/* Services Section */}
      <div className="container my-5">
        <h2 className="text-center mb-5">{t.featuredServices}</h2>
        <div className="row g-4">
          {/* Job Matching */}
          <div className="col-md-4">
            <div className="card feature-card h-100 p-4 text-center">
              <div className="feature-icon">
                <FaBriefcase />
              </div>
              <h3>{t.jobMatchingTitle}</h3>
              <p>{t.jobMatchingDesc}</p>
              <Link to="/jobs" className="btn btn-outline-primary mt-auto">
                {t.findJobs}
              </Link>
            </div>
          </div>

          {/* Resume Builder */}
          <div className="col-md-4">
            <div className="card feature-card h-100 p-4 text-center">
              <div className="feature-icon">
                <FaFileAlt />
              </div>
              <h3>{t.resumeBuilderTitle}</h3>
              <p>{t.resumeBuilderDesc}</p>
              <Link to="/resume" className="btn btn-outline-primary mt-auto">
                {t.resumeBuilderTitle}
              </Link>
            </div>
          </div>

          {/* Translation Tool */}
          <div className="col-md-4">
            <div className="card feature-card h-100 p-4 text-center">
              <div className="feature-icon">
                <FaLanguage />
              </div>
              <h3>{t.translateToolTitle}</h3>
              <p>{t.translateToolDesc}</p>
              <Link to="/translate" className="btn btn-outline-primary mt-auto">
                {t.translate}
              </Link>
            </div>
          </div>

          {/* Learn English */}
          <div className="col-md-6">
            <div className="card feature-card h-100 p-4 text-center">
              <div className="feature-icon">
                <FaBook />
              </div>
              <h3>{t.learningTitle}</h3>
              <p>{t.learningDesc}</p>
              <Link to="/learn" className="btn btn-outline-primary mt-auto">
                {t.learnEnglish}
              </Link>
            </div>
          </div>

          {/* Legal & Financial Help */}
          <div className="col-md-6">
            <div className="card feature-card h-100 p-4 text-center">
              <div className="feature-icon">
                <FaBalanceScale />
              </div>
              <h3>{t.legalHelpTitle}</h3>
              <p>{t.legalHelpDesc}</p>
              <Link to="/legal-help" className="btn btn-outline-primary mt-auto">
                {t.legalHelp}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
