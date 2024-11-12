import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SettingsPage.module.css';
import rpiLogo from '../../../rpi_logo.jpg'


const SettingsPage = () => {
  const navigate = useNavigate();

  const handleRPIClick = () => {
    navigate('/');
  };

  const handleSectionClick = (section) => {
    navigate(`/settings/${section}`);
  };

  return (
    <div className={styles.settingspage}>
    <img
          src={rpiLogo}
          alt="RPI Logo"
          className={styles.logo}
          onClick={handleRPIClick}
        />
      <div className={styles.headerSettings}>
        <h1 className={styles.title}>Settings</h1>
      </div>
      
      <div className={styles.settingssections}>
        <div className={styles.section} onClick={() => handleSectionClick('accessibility')}>
          Accessibility
        </div>
        <div className={styles.section} onClick={() => handleSectionClick('performance')}>
          Performance
        </div>
        <div className={styles.section} onClick={() => handleSectionClick('privacy')}>
          Privacy
        </div>
        <div className={styles.section} onClick={() => handleSectionClick('browsing-history')}>
          Browsing History
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
