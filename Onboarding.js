import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { translations } from '../../data/translations';

const Onboarding = ({ user, updateLanguage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(user?.preferredLanguage || 'en');
  const t = translations[selectedLanguage] || translations.en;
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update user language preference
    updateLanguage(selectedLanguage);
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="onboarding-container">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">{t.onboardingHeading}</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <h5>{t.preferredLanguage}</h5>
                    <p className="text-muted">{t.selectLanguage}</p>
                    
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-check">
                          <input
                            type="radio"
                            id="en"
                            name="language"
                            value="en"
                            className="form-check-input"
                            checked={selectedLanguage === 'en'}
                            onChange={handleLanguageChange}
                          />
                          <label className="form-check-label" htmlFor="en">
                            English
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check">
                          <input
                            type="radio"
                            id="es"
                            name="language"
                            value="es"
                            className="form-check-input"
                            checked={selectedLanguage === 'es'}
                            onChange={handleLanguageChange}
                          />
                          <label className="form-check-label" htmlFor="es">
                            Español
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check">
                          <input
                            type="radio"
                            id="fr"
                            name="language"
                            value="fr"
                            className="form-check-input"
                            checked={selectedLanguage === 'fr'}
                            onChange={handleLanguageChange}
                          />
                          <label className="form-check-label" htmlFor="fr">
                            Français
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="mb-4" />
                  
                  <h5>{t.completeProfile}</h5>
                  <p className="text-muted">
                    {t.welcomeMessage}
                  </p>
                  
                  <div className="d-grid gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">
                      {t.savePreferences}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
