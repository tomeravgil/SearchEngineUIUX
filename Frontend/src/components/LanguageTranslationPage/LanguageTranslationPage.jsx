import React, { useState } from 'react';
import SettingsCard from '../ui/settings-card';

const LanguageTranslationPage = () => {
  const [queryTranslation, setQueryTranslation] = useState(false);
  const [languageRanking, setLanguageRanking] = useState(false);

  return (
    <div className="space-y-4">
      <SettingsCard label="Enable Query Translation" mode={queryTranslation} modeChangeFunction={() => setQueryTranslation(!queryTranslation)} />
      <SettingsCard label="Rank Based on Query Language" mode={languageRanking} modeChangeFunction={() => setLanguageRanking(!languageRanking)} />
    </div>
  );
};

export default LanguageTranslationPage;
