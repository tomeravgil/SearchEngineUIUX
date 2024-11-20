import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SettingsPage.module.css';
import rpiLogo from '../../../rpi_logo_white.png'


const SettingsPage = ({ content: Content, title }) => {
  const navigate = useNavigate();

  const handleRPIClick = () => {
    navigate('/');
  };

  const handleSectionClick = (section) => {
    navigate(`/settings/${section}`);
  };

  return (
    <div className='flex flex-row'>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-row justify-center">
          <label htmlFor="my-drawer" className="btn top-4 left-4 bg-transparent border-none shadow-none hover:bg-transparent drawer-button lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </label>
        <div className='w-full flex flex-col'>
        <h2 className='text-2xl font-bold mt-4 ml-10'>{title}</h2>
        <div className='w-3/4 mx-auto mt-10'>
          {Content && <Content />}
        </div>
        </div>

          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-red-900 text-white min-h-full w-80 p-4 space-y-4">
              <li className='hover:bg-transparent scroll-bar'>
                <img
                  src={rpiLogo}
                  alt="RPI Logo"
                  className='w-3/4 p-4'
                  onClick={handleRPIClick}
                />
              </li>
              <li onClick={() => handleSectionClick('')}>
                <div className='flex flex-row items-center'>
                  <a>General Settings</a>
                </div>
              </li>
              <li onClick={() => handleSectionClick('search-preferences')}>
                <div className='flex flex-row items-center'>
                  <a>Search Preferences</a>
                </div>
              </li>
              <li onClick={() => handleSectionClick('content-document-types')}>
                <div className='flex flex-row items-center'>
                  <a>Content and Document Types</a>
                </div>
              </li>
              <li onClick={() => handleSectionClick('language-translation')}>
                <div className='flex flex-row items-center'>
                  <a>Language and Translation</a>
                </div>
              </li>
              <li onClick={() => handleSectionClick('security-censorship')}>
                <div className='flex flex-row items-center'>
                  <a>Security and Censorship</a>
                </div>
              </li>
              <li onClick={() => handleSectionClick('notifications-feedback')}>
                <div className='flex flex-row items-center'>
                  <a>Notifications and Feedback</a>
                </div>
              </li>

            </ul>
          </div>
        </div>
    </div>

  );
};

export default SettingsPage;
