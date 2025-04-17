import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { translations } from '../../data/translations';

const Login = ({ onLogin, language }) => {
  const t = translations[language] || translations.en;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    // For demo purposes, simulate login success
    // In a real app, this would make an API call
    const userData = {
      id: 1,
      name: 'Demo User',
      email: formData.email,
      preferredLanguage: language,
      isPremium: false,
      isNewUser: false
    };
    
    onLogin(userData);
    
    // Check if new user to redirect to onboarding
    if (userData.isNewUser) {
      navigate('/onboarding');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">{t.loginHeading}</h2>
                
                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}
                
                <form onSubmit={handleSubmit}>
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
                  
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      className="form-check-input"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <label htmlFor="rememberMe" className="form-check-label">{t.rememberMe}</label>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">{t.signIn}</button>
                  </div>
                </form>
                
                <div className="mt-3 text-center">
                  <Link to="/forgot-password">{t.forgotPassword}</Link>
                </div>
                
                <hr />
                
                <div className="text-center">
                  <p>{t.noAccount} <Link to="/register">{t.signUp}</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
