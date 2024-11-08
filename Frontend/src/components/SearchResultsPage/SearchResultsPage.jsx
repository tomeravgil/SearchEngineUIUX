import { React, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchResultsPage.css';
import { FaCog } from 'react-icons/fa';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const searchQuery = location.state?.query || '';

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleRPIClick = () => {
    navigate('/');
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate('/search', {state: {query: searchTerm}});
    }
  }

  return (
    <div className="search-results-page">
      <div className="top-bar">
        <div className="settings-icon" onClick={handleSettingsClick}>
          <FaCog size={40} />
        </div>
        
        <div className="search-bar-container">
          <span className="rpi-label" onClick={handleRPIClick}>
            RPI
          </span>
          <input
            type="text"
            className="search-bar"
            defaultValue={searchQuery}
            onChange={(e) => setSearchTerm(e.target.value)} 
            onKeyDown={handleKeyDown}
            placeholder="Search..."
          />
          
        </div>
      </div>

      <div className="results-container">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="result-item">
            <h3>Result Title {index + 1} for {searchQuery}</h3>
            <p>This is a description for result {index + 1}. It provides a brief summary of the content.</p>
            <a href="#">www.exampleof{searchQuery}{index + 1}.com</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
