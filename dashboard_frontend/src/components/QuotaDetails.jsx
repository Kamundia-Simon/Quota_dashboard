import React from 'react';
import { ArrowLeft, Target, AlertCircle } from 'lucide-react';
import QuotaQuestion from './QuotaQuestion';
import { useQuota } from '../hooks/useQuota';

const QuotaDetails = ({ survey, onBack }) => {
  const { quotaData, loading, error } = useQuota(survey.SurveyID);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Surveys
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-red-600 mb-4">
            <AlertCircle size={48} className="mx-auto mb-2" />
            <p className="text-lg font-medium">Error loading quota data</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Surveys
        </button>
      </div>

      {/* Survey Info */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Target size={24} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">{survey.Name}</h2>
        </div>
        <p className="text-gray-600 mb-4">{survey.Description}</p>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <span>Survey ID: {survey.SurveyID}</span>
          <span>Completed: {survey.Completed}</span>
        </div>
      </div>

      {/* Quota Details */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Quota Details</h3>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : !quotaData || Object.keys(quotaData).length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No quota data available for this survey</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(quotaData).map(([questionKey, questionData]) => (
                <QuotaQuestion
                  key={questionKey}
                  questionKey={questionKey}
                  questionData={questionData}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotaDetails;