import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { FaCog } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleSearchClick = () => {
    navigate('/search', { state: { query: searchTerm } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleAcceptCookies = () => {
    // Code to enable cookies if necessary
    setShowCookieBanner(false);
    // Optionally save cookie consent in localStorage or a similar persistent storage
    localStorage.setItem('cookiesAccepted', 'true');
  };

  const handleDeclineCookies = () => {
    setShowCookieBanner(false);
    // Optionally save preference to disable cookies in localStorage
    localStorage.setItem('cookiesAccepted', 'false');
  };

  return (
    <div className="landing-page">
      <h1 className="header">
        <span className="rpi">RPI</span>
        <span className="search">Search</span>
      </h1>
      <div className="top-bar-container">
        <div className="search-container">
          <div className="filter-dropdown">
            <select>
              <option value="all">All</option>
              <option value="images">Images</option>
              <option value="videos">Videos</option>
              <option value="news">News</option>
            </select>
          </div>

          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="search-button" onClick={handleSearchClick}>Search</button>
        </div>
        <div className="settings-icon" onClick={handleSettingsClick}>
          <FaCog size={40} />
        </div>
      </div>

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
      <div className="cookie-banner">
        <div>
          <p>We use cookies to enhance your experience. Do you wish to accept cookies?</p>
          <div className="button-container">
            <button className="cookie-button accept" onClick={handleAcceptCookies}>Accept All</button>
            <button className="cookie-button decline" onClick={handleDeclineCookies}>Disable All</button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default LandingPage;
