import React, { useState } from 'react';
import QuotaDetails from './components/QuotaDetails';
import SurveyList from './components/SurveyList';
import './App.css';

function App() {
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  const handleSurveySelect = (survey) => {
    setSelectedSurvey(survey);
  };

  const handleBackToList = () => {
    setSelectedSurvey(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Survey Management Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor running surveys and track quota progress
          </p>
        </div>

        {!selectedSurvey ? (
          <SurveyList onSurveySelect={handleSurveySelect} />
        ) : (
          <QuotaDetails 
            survey={selectedSurvey} 
            onBack={handleBackToList}
          />
        )}
      </div>
    </div>
  );
}

export default App;