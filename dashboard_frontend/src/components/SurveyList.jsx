import React, { useState } from 'react';
import { Search, Users, Refresh } from 'lucide-react';
import SurveyCard from './SurveyCard';
import { useSurveys } from '../hooks/useSurveys';

const SurveyList = ({ onSurveySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { surveys, loading, error, refetch } = useSurveys();

  const filteredSurveys = surveys.filter(survey =>
    survey.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.Description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-red-600 mb-4">
          <p className="text-lg font-medium">Error loading surveys</p>
          <p className="text-sm">{error}</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search surveys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            <Refresh size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Surveys List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Users size={20} />
            Running Surveys ({filteredSurveys.length})
          </h2>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse p-4 border rounded-lg">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredSurveys.length === 0 ? (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'No surveys found matching your search' : 'No running surveys available'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSurveys.map((survey) => (
                <SurveyCard
                  key={survey.SurveyID}
                  survey={survey}
                  onSelect={() => onSurveySelect(survey)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyList;