import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { translations } from '../data/translations';

const Navbar = ({ isLoggedIn, onLogout, language, isPremium, togglePremium }) => {
  const t = translations[language] || translations.en;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Bridgeway
          {isPremium && <span className="premium-badge ms-2">{t.premium}</span>}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">{t.home}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jobs">{t.findJobs}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/resume">{t.resumeBuilder}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/translate">{t.translate}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/learn">{t.learnEnglish}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/legal-help">{t.legalHelp}</NavLink>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/employer">{t.employerDashboard}</NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">{t.login}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">{t.register}</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button 
                    className="btn btn-sm btn-outline-secondary me-2" 
                    onClick={togglePremium}
                  >
                    {isPremium ? t.downgradeAccount : t.upgradeAccount}
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link" 
                    onClick={onLogout}
                  >
                    {t.logout}
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
