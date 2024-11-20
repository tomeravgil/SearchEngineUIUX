import React, { useState } from 'react';
import SettingsCard from '../ui/settings-card';

const ContentDocumentTypesPage = () => {
  const [supportPDF, setSupportPDF] = useState(false);
  const [imageSearch, setImageSearch] = useState(false);
  const [exactMatchSearch, setExactMatchSearch] = useState(false);

  return (
    <div className="space-y-4">
      <SettingsCard label="Support PDF Documents" mode={supportPDF} modeChangeFunction={() => setSupportPDF(!supportPDF)} />
      <SettingsCard label="Enable Image Search" mode={imageSearch} modeChangeFunction={() => setImageSearch(!imageSearch)} />
      <SettingsCard label="Enable Exact Match Search" mode={exactMatchSearch} modeChangeFunction={() => setExactMatchSearch(!exactMatchSearch)} />
    </div>
  );
};

export default ContentDocumentTypesPage;
