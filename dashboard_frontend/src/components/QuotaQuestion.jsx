import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import QuotaResponse from './QuotaResponse';

const QuotaQuestion = ({ questionKey, questionData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const responseCount = Object.keys(questionData).length;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={toggleExpanded}
        className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown size={20} className="text-gray-600" />
          ) : (
            <ChevronRight size={20} className="text-gray-600" />
          )}
          <h3 className="font-semibold text-gray-900">{questionKey}</h3>
          <span className="text-sm text-gray-500">
            ({responseCount} response{responseCount !== 1 ? 's' : ''})
          </span>
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-6 space-y-4">
          {Object.entries(questionData).map(([responseKey, responseData]) => (
            <QuotaResponse
              key={responseKey}
              responseKey={responseKey}
              responseData={responseData}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuotaQuestion;