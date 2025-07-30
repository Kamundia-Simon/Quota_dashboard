import React, { useState } from "react";
import QuotaDetails from "./components/QuotaDetails";
import SurveyList from "./components/SurveyList";
import "./App.css";

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
      <div className="bg-white shadow-sm boarder-b boarder-gray-200 px 6 py-4">
        <div className="flex items-cenre justify-between ">
          <div className="flex items-center space-x-4">
            <svg width="160" height="50" viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="50" height="50" rx="8" ry="8" fill="#FFD43B" />
            <text x="20" y="35" font-family="san-serif" font-size="32" font-weight="bold" fill="black">3</text>
            <text x="50" y="35" font-family="Lexend" font-size="32" fill="black">Gem</text>
            </svg>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Survey Management Dashboard
            </h1>
            <p className="text-gray-600 text-sm">
              Monitor running surveys and track quota progress
            </p>
          </div>

          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <span
              className={`${
                !selectedSurvey
                  ? "text-blue-600 font-medium"
                  : "hover:text-gray-700 cursor-pointer"
              }`}
              onClick={!selectedSurvey ? undefined : handleBackToList}
            >
              Surveys
            </span>
            {selectedSurvey && (
              <>
                <span>/</span>
                <span className="text-blue-600 font-medium">
                  {selectedSurvey.Name}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Main Content Area - Full Height */}
      <div className="h-full overflow-auto">
        <div className="p-6 h-full">
          {!selectedSurvey ? (
            <SurveyList onSurveySelect={handleSurveySelect} />
          ) : (
            <QuotaDetails survey={selectedSurvey} onBack={handleBackToList} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
