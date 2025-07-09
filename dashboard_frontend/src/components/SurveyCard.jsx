import React from 'react';
import { Calendar, Clock, Users, ChevronRight } from 'lucide-react';
import { formatDate } from '../utils/helpers';

const SurveyCard = ({ survey, onSelect }) => {
  return (
    <div 
      className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group"
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {survey.Name}
        </h3>
        <ChevronRight 
          size={20} 
          className="text-gray-400 group-hover:text-blue-600 transition-colors" 
        />
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {survey.Description}
      </p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-blue-600">
          <Users size={16} />
          <span className="font-medium">{survey.Completed}</span>
          <span className="text-gray-500 text-sm">completed</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>Created: {formatDate(survey.DateCreated)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>Modified: {formatDate(survey.DateModified)}</span>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;