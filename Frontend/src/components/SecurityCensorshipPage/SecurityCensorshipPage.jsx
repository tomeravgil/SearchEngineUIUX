import React, { useState } from 'react';
import SettingsCard from '../ui/settings-card';

const SecurityCensorshipPage = () => {
  const [explicitContentFilter, setExplicitContentFilter] = useState(false);
  const [maliciousDetection, setMaliciousDetection] = useState(false);
  const [noAds, setNoAds] = useState(false);

  return (
    <div className="space-y-4">
      <SettingsCard label="Filter Explicit Content" mode={explicitContentFilter} modeChangeFunction={() => setExplicitContentFilter(!explicitContentFilter)} />
      <SettingsCard label="Enable Malicious Content Detection" mode={maliciousDetection} modeChangeFunction={() => setMaliciousDetection(!maliciousDetection)} />
      <SettingsCard label="Block Ads/Sponsored Content" mode={noAds} modeChangeFunction={() => setNoAds(!noAds)} />
    </div>
  );
};

export default SecurityCensorshipPage;
