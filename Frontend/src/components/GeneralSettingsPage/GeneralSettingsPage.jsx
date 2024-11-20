import React, { useState } from 'react';
import SettingsCard from '../ui/settings-card';

const GeneralSettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [safeMode, setSafeMode] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);

  return (
    <div className="space-y-4">
      <SettingsCard label="Dark Mode" mode={darkMode} modeChangeFunction={() => setDarkMode(!darkMode)} />
      <SettingsCard label="Safe Mode" mode={safeMode} modeChangeFunction={() => setSafeMode(!safeMode)} />
      <SettingsCard label="Privacy Mode" mode={privacyMode} modeChangeFunction={() => setPrivacyMode(!privacyMode)} />
    </div>
  );
};

export default GeneralSettingsPage;

