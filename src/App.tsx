import React, { useState } from 'react';
import HRDashboard from './components/HRDashboard';
import AdminPanel, { SurveyResponse } from './components/AdminPanel';
import Policies from './components/Policies';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'admin' | 'policies'>('dashboard');
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponse[][]>([]);

  const handleSurveyComplete = (responses: SurveyResponse[]) => {
    setSurveyResponses(prev => [...prev, responses]);
    // Removed alert so custom thank you dialog is shown
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* View Toggle Button removed */}

      {currentView === 'dashboard' && (
        <HRDashboard onSurveyComplete={(responses) => handleSurveyComplete(responses as SurveyResponse[])} setCurrentView={setCurrentView} />
      )}
      {currentView === 'admin' && <AdminPanel responses={surveyResponses} />}
      {currentView === 'policies' && <Policies />}
    </div>
  );
}

export default App;