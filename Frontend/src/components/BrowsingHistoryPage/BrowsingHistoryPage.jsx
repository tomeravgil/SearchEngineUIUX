import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BrowsingHistoryPage.module.css';

const BrowsingHistoryPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cachedDataSize = '150 MB'; 
  const recentHistory = [
    'https://example.com/page1',
    'https://example.com/page2',
    'https://example.com/page3',
  ];

  const handleRPIClick = () => {
    navigate('/');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.browsingHistoryPage}>
      <div className={styles.header}>
        <span className={styles.rpi} onClick={handleRPIClick}>RPI</span>
        <h1 className={styles.title} onClick={handleSettingsClick}>Settings</h1>
      </div>

      <h2 className={styles.subheader}>Browsing History</h2>

      <div className={styles.container}>
        <div className={styles.itemContainer}>
          <h3>Current Cached Data</h3>
          <p>{cachedDataSize}</p>
        </div>

        <div className={styles.itemContainer}>
          <h3>Clear Browsing Data</h3>
          <button onClick={toggleModal}>See Options</button>
        </div>

        <div className={`${styles.itemContainer} ${styles.historyContainer}`}>
          <h3>Recent Browsing History</h3>
          <ul className={styles.historyList}>
            {recentHistory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Clear Browsing Data Options</h3>
            <p>Select what you’d like to clear:</p>
            <ul>
              <li><button onClick={() => alert('Clearing cache...')}>Clear Cache</button></li>
              <li><button onClick={() => alert('Clearing cookies...')}>Clear Cookies</button></li>
              <li><button onClick={() => alert('Clearing history...')}>Clear History</button></li>
            </ul>
            <button className={styles.closeButton} onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowsingHistoryPage;