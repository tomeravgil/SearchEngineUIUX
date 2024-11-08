import { useState, React} from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { FaCog } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSettingsClick = () => {
    navigate('/settings');
  };
  const handleSearchClick = () => {
    navigate('/search', { state: { query: searchTerm } }); //This link will have alot more stuff and the actual button will probably end up calling the backend
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
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
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="search-button" onClick={handleSearchClick}>Search</button>
        </div>
        <div className="settings-icon" onClick={handleSettingsClick}>
          <FaCog size={40} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;