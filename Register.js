import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { translations } from '../../data/translations';

const Register = ({ language }) => {
  const t = translations[language] || translations.en;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // For demo purposes, simulate successful registration
    // In a real app, this would make an API call
    
    // Store user in localStorage
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      preferredLanguage: language,
      isPremium: false,
      isNewUser: true
    };
    
    localStorage.setItem('user', JSON.stringify(newUser));
    
    // Redirect to onboarding
    navigate('/onboarding');
  };

  return (
    <div className="register-container">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">{t.registerHeading}</h2>
                
                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">{t.fullName}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">{t.email}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">{t.password}</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">{t.confirmPassword}</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">{t.signUp}</button>
                  </div>
                </form>
                
                <hr />
                
                <div className="text-center">
                  <p>{t.hasAccount} <Link to="/login">{t.signIn}</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
