"use client";

import { useState, useEffect } from 'react';
import { useDarkMode } from "@/components/dark-mode-provider";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [cookiesEnabled, setCookiesEnabled] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    // Load saved settings
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedCookies = localStorage.getItem('cookiesAccepted') === 'true';
    setDarkMode(savedDarkMode);
    setCookiesEnabled(savedCookies);
  }, []);

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const handleCookieToggle = () => {
    const newCookiesEnabled = !cookiesEnabled;
    setCookiesEnabled(newCookiesEnabled);
    localStorage.setItem('cookiesAccepted', newCookiesEnabled.toString());
  };

  return (
    <div className="space-y-6 ">
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Display Settings</h3>
        <div className="flex items-center justify-between py-2">
          <span>Dark Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card text-card-foreground after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      <div className="bg-card text-card-foreground  p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Privacy Settings</h3>
        <div className="flex items-center justify-between py-2">
          <span>Enable Cookies</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={cookiesEnabled}
              onChange={handleCookieToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card text-card-foreground after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primaryRed"></div>
          </label>
        </div>
      </div>
    </div>
  );
}