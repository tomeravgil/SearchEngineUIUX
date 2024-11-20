import React, { useState } from 'react';
import SettingsCard from '../ui/settings-card';

const SearchPreferencesPage = () => {
  const [recentContent, setRecentContent] = useState(false);
  const [snippetHighlight, setSnippetHighlight] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);

  return (
    <div className="space-y-4">
      <SettingsCard label="Prioritize Recent Content" mode={recentContent} modeChangeFunction={() => setRecentContent(!recentContent)} />
      <SettingsCard label="Highlight Relevant Terms" mode={snippetHighlight} modeChangeFunction={() => setSnippetHighlight(!snippetHighlight)} />
      <SettingsCard label="Show Contextual Snippets" mode={showSnippets} modeChangeFunction={() => setShowSnippets(!showSnippets)} />
    </div>
  );
};

export default SearchPreferencesPage;
