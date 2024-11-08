import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsPage.css';

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleRPIClick = () => {
    navigate('/');
  };

  const handleSectionClick = (section) => {
    navigate(`/settings/${section}`);
  };

  return (
    <div className="settings-page">
    <span className="rpiSettings" onClick={handleRPIClick}>RPI</span>
      <div className="headerSettings">
        <h1 className="title">Settings</h1>
      </div>
      
      <div className="settings-sections">
        <div className="section" onClick={() => handleSectionClick('accessibility')}>
          Accessibility
        </div>
        <div className="section" onClick={() => handleSectionClick('performance')}>
          Performance
        </div>
        <div className="section" onClick={() => handleSectionClick('privacy')}>
          Privacy
        </div>
        <div className="section" onClick={() => handleSectionClick('browsing-history')}>
          Browsing History
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
