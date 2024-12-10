"use client";

import { set } from 'lodash';
import { useState, useEffect } from 'react';

export default function SearchPreferencesPage() {
  const [safeSearch, setSafeSearch] = useState(true);
  const [resultsPerPage, setResultsPerPage] = useState('8');
  const [prioRecent, setPrioRecent] = useState(true);

  useEffect(() => {
    // Load saved preferences
    const savedSafeSearch = localStorage.getItem('safeSearch') !== 'false';
    const savedPrioRecent = localStorage.getItem('prioRecent') !== 'false';
    const savedResultsPerPage = localStorage.getItem('resultsPerPage') || '8';
    
    setSafeSearch(savedSafeSearch);
    setResultsPerPage(savedResultsPerPage);
    setPrioRecent(savedPrioRecent);
  }, []);

  const handleSafeSearchToggle = () => {
    const newValue = !safeSearch;
    setSafeSearch(newValue);
    localStorage.setItem('safeSearch', newValue.toString());
  };

  const handlePrioRecentToggle = () => {
    const newValue = !prioRecent;
    setPrioRecent(newValue);
    localStorage.setItem('prioRecent', newValue.toString());
  };

  const handleResultsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResultsPerPage(e.target.value);
    localStorage.setItem('resultsPerPage', e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Search Settings</h3>
        
        <div className="flex items-center justify-between py-2">
          <span>Safe Search</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={safeSearch}
              onChange={handleSafeSearchToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card text-card-foreground after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primaryRed"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <span>Prioritize Recent Content</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={prioRecent}
              onChange={handlePrioRecentToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card text-card-foreground after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primaryRed"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-2">
          <span>Results per page</span>
          <select
            value={resultsPerPage}
            onChange={handleResultsPerPageChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primaryRed focus:border-primaryRed block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="8">8</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </div>
        
      </div>
    </div>
  );
}