import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false); // State to handle fade-out animation
  const searchQuery = location.state?.query || '';

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  // Function to handle fade-out before navigating
  const fadeOutAndNavigate = (path, state = {}) => {
    setIsFadingOut(true); // Trigger fade-out animation
    setTimeout(() => {
      navigate(path, { state });
    }, 300); // Delay to allow fade-out effect to complete
  };

  const handleSettingsClick = () => {
    fadeOutAndNavigate('/settings');
  };

  const handleRPIClick = () => {
    fadeOutAndNavigate('/');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fadeOutAndNavigate('/search', { state: { query: searchTerm } });
    }
  };

  return (
    <div className={`search-results-page ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
      <div className="top-bar">
        <div className="settings-icon" onClick={handleSettingsClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>

        <div className="container mx-auto w-1/2 flex flex-row pt-5">
          <span className="rpi-label" onClick={handleRPIClick}>
            RPI
          </span>

          <div className="w-11/12 border p-3 rounded-full flex flex-row items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

            <input
              type="text"
              className="w-full h-full focus:outline-none bg-transparent"
              placeholder="Search..."
              defaultValue={searchQuery}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto w-1/2 flex flex-col space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="group border-2 border-gray-200 bg-gray-50 rounded-lg mx-3 p-4 shadow-xs transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
            <a href="#" className="text-red-900 transition duration-500 ease-in-out group-hover:text-red-500">
              <div className="flex flex-col">
                <span className="text-[10px] font-thin">exampleof{searchQuery}{index + 1}.com</span>
                <span className="text-[10px] font-thin text-gray-400">https://www.exampleof{searchQuery}{index + 1}.com</span>
              </div>
              <h3 className="font-bold">Result Title {index + 1} for {searchQuery}</h3>
            </a>
            <p className="text-sm">This is a description for result {index + 1}. It provides a brief summary of the content.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
