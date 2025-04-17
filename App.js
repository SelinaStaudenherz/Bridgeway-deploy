import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './assets/css/App.css';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import JobMatching from './components/JobMatching/JobMatching';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder';
import Translate from './components/Translate/Translate';
import LearnEnglish from './components/LearnEnglish/LearnEnglish';
import LegalHelp from './components/LegalHelp/LegalHelp';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Onboarding from './components/Authentication/Onboarding';
import EmployerDashboard from './components/Employer/EmployerDashboard';
import ProtectedRoute from './components/Authentication/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
      setLanguage(storedUser.preferredLanguage || 'en');
      setIsPremium(storedUser.isPremium || false);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setLanguage(userData.preferredLanguage || 'en');
    setIsPremium(userData.isPremium || false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setLanguage('en');
    setIsPremium(false);
    localStorage.removeItem('user');
  };

  const updateLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    if (user) {
      const updatedUser = { ...user, preferredLanguage: newLanguage };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const togglePremium = () => {
    const updatedPremium = !isPremium;
    setIsPremium(updatedPremium);
    if (user) {
      const updatedUser = { ...user, isPremium: updatedPremium };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <div className="App">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
        language={language}
        isPremium={isPremium}
        togglePremium={togglePremium}
      />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home language={language} />} />
          <Route path="/jobs" element={<JobMatching language={language} />} />
          <Route path="/resume" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ResumeBuilder language={language} isPremium={isPremium} />
            </ProtectedRoute>
          } />
          <Route path="/translate" element={<Translate language={language} isPremium={isPremium} />} />
          <Route path="/learn" element={<LearnEnglish language={language} />} />
          <Route path="/legal-help" element={<LegalHelp language={language} isPremium={isPremium} />} />
          <Route path="/login" element={
            isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} language={language} />
          } />
          <Route path="/register" element={
            isLoggedIn ? <Navigate to="/" /> : <Register language={language} />
          } />
          <Route path="/onboarding" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Onboarding user={user} updateLanguage={updateLanguage} />
            </ProtectedRoute>
          } />
          <Route path="/employer" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <EmployerDashboard language={language} />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
