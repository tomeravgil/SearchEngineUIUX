import { React, useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage/LandingPage'
import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SettingsPage from './components/SettingsPage/SettingsPage';
import GeneralSettingsPage from './components/GeneralSettingsPage/GeneralSettingsPage';
import SearchPreferencesPage from './components/SearchPreferencesPage/SearchPreferencesPage';
import LanguageTranslationPage from './components/LanguageTranslationPage/LanguageTranslationPage';
import SecurityCensorshipPage from './components/SecurityCensorshipPage/SecurityCensorshipPage';
import NotificationsFeedbackPage from './components/NotificationsFeedbackPage/NotificationsFeedbackPage';
// import ContentDocumentTypesPage from './components/ContentDocumentTypesPage/ContentDocumentTypesPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/settings" element={<SettingsPage content={GeneralSettingsPage} title="General Settings" />} />
        <Route path="/settings/search-preferences" element={<SettingsPage content={SearchPreferencesPage} title="Search Preferences" />} />
        {/* <Route path="/settings/content-document-types" element={<SettingsPage content={ContentDocumentTypesPage} title="Content and Document Types" />} /> */}
        <Route path="/settings/language-translation" element={<SettingsPage content={LanguageTranslationPage} title="Language and Translation" />} />
        <Route path="/settings/security-censorship" element={<SettingsPage content={SecurityCensorshipPage} title="Security and Censorship" />} />
        <Route path="/settings/notifications-feedback" element={<SettingsPage content={NotificationsFeedbackPage} title="Notifications and Feedback" />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
