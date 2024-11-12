import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccessibilityPage.module.css'
import rpiLogo from '../../../rpi_logo.jpg'

const AccessibilityPage = () => {
  const navigate = useNavigate();

  const handleRPIClick = () => {
    navigate('/');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);

  return (
    <div className={styles.accessibilityPage}>

        <img
          src={rpiLogo}
          alt="RPI Logo"
          className={styles.logo}
          onClick={handleRPIClick}
        />
        
      <div className={styles.header}>
        <h1 className={styles.title} onClick={handleSettingsClick}>Settings</h1>
        <h2 className={styles.subheader}>Accessibility</h2>
      </div>
  

      <div className={styles.switches}>
        <div className={styles.switchContainer}>
          <label>Dark Mode</label>
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
          />
        </div>
        <div className={styles.switchContainer}>
          <label>High Contrast Mode</label>
          <input 
            type="checkbox" 
            checked={highContrast} 
            onChange={() => setHighContrast(!highContrast)} 
          />
        </div>
        <div className={styles.switchContainer}>
          <label>Text-to-Speech</label>
          <input 
            type="checkbox" 
            checked={textToSpeech} 
            onChange={() => setTextToSpeech(!textToSpeech)} 
          />
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;
