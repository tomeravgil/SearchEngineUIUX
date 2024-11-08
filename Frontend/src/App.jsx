import { React, useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage/LandingPage'
import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SettingsPage from './components/SettingsPage/SettingsPage';
import AccessibilityPage from './components/AccessibilityPage/AccessibilityPage';
import BrowsingHistoryPage from './components/BrowsingHistoryPage/BrowsingHistoryPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchResultsPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/settings/accessibility" element={<AccessibilityPage/>}/>
        <Route path="/settings/browsing-history" element={<BrowsingHistoryPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
