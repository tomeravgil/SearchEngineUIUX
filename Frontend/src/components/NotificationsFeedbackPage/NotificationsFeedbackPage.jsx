import React, { useState } from 'react';
import SettingsCard from '../ui/settings-card';
const NotificationsFeedbackPage = () => {
  const [periodicFeedback, setPeriodicFeedback] = useState(false);
  const [viewUsageStats, setViewUsageStats] = useState(false);

  return (
    <div className="space-y-4">
      <SettingsCard label="Enable Periodic Feedback" mode={periodicFeedback} modeChangeFunction={() => setPeriodicFeedback(!periodicFeedback)} />
      <SettingsCard label="View Usage Insights" mode={viewUsageStats} modeChangeFunction={() => setViewUsageStats(!viewUsageStats)} />
    </div>
  );
};

export default NotificationsFeedbackPage;
