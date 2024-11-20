// BrowsingHistoryPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BrowsingHistoryPage.module.css';
import rpiLogo from '../../../rpi_logo.jpg'; // Import the RPI logo image
import AlertDialogDemo from '../ui/alert';

const BrowsingHistoryPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cachedDataSize = '150 MB'; // Example cached data size
  const recentHistory = [
    {
      time: '12:00',
      title: 'Page1',
      link: 'https://example.com/page1',
    },
    {
      time: '12:01',
      title: 'Page2',
      link: 'https://example.com/page2',
    },
    {
      time: '12:02',
      title: 'Page3',
      link: 'https://example.com/page3',
    },
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
    <div >
      <div className={styles.container}>
        <div className="border-2 rounded-lg p-4 bg-gray-50 flex flex-row justify-between items-center">
          <h3>Current Cached Data</h3>
          <p>{cachedDataSize}</p>
        </div>

        <div className="border-2 rounded-lg p-4 bg-gray-50 flex flex-row justify-between items-center">
          <h3>Clear Browsing Data</h3>
          {/* <button onClick={toggleModal} className='bg-red-800 p-2 rounded-lg text-white'>See Options</button> */}
          <AlertDialogDemo/>
        </div>

        <div className="border-2 rounded-lg p-4 bg-gray-50 flex flex-col justify-between">
          <h3>Recent Browsing History</h3>
          <ul className="w-full space-y-2 mt-4">
            {recentHistory.map((item, index) => (
              <li key={index}>
                <div className='flex items-center space-x-4'>
                  <input type="checkbox" className="form-checkbox w-5 h-5 bg-transparent" />
                  
                  {/* Timestamp */}
                  <p className="text-gray-500 text-sm w-[36px]">{item.time}</p>

                  {/* Title and URL */}
                  <div className="flex items-center space-x-10">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.link}</p>
                  </div>
                </div>

              </li>
            ))}
          </ul>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Clear Browsing Data Options</h3>
            <p>Select what you'd like to clear:</p>
            <ul>
              <li><button onClick={() => alert('Clearing cache...')} className='bg-red-800 p-2 rounded-lg text-white'>Clear Cache</button></li>
              <li><button onClick={() => alert('Clearing cookies...')} className='bg-red-800 p-2 rounded-lg text-white'>Clear Cookies</button></li>
              <li><button onClick={() => alert('Clearing history...')} className='bg-red-800 p-2 rounded-lg text-white'>Clear History</button></li>
            </ul>
            <button className="bg-red-400 p-2 rounded-lg text-white" onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowsingHistoryPage;
