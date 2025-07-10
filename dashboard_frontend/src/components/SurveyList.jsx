import React, { useState } from "react";
import { Search, Users, RefreshCcw, Filter } from "lucide-react";
import SurveyCard from "./SurveyCard";
import SurveyTable from "./SurveyTable";
import ViewToggle from "./ToggleView";
import { useSurveys } from "../hooks/useSurveys";

/**
 * Survey List Component
 * - Displays running surveys in grid or table view
 * - Includes search, filter, and refresh functionality
 * - Responsive design with view toggle options
 * - Default view is list/table
 */
const SurveyList = ({ onSurveySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("list"); // Default to list view
  const [sortBy, setSortBy] = useState("name"); // 'name', 'completed', 'date'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  const { surveys, loading, error, refetch } = useSurveys();

  /**
   * Filter surveys based on search term
   */
  const filteredSurveys = surveys.filter(
    (survey) =>
      survey.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.Description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Sort surveys based on selected criteria
   */
  const sortedSurveys = [...filteredSurveys].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case "completed":
        aValue = a.Completed;
        bValue = b.Completed;
        break;
      case "date":
        aValue = new Date(a.DateModified || a.DateCreated);
        bValue = new Date(b.DateModified || b.DateCreated);
        break;
      case "name":
      default:
        aValue = a.Name.toLowerCase();
        bValue = b.Name.toLowerCase();
        break;
    }

    if (sortOrder === "desc") {
      return aValue < bValue ? 1 : -1;
    }
    return aValue > bValue ? 1 : -1;
  });

  /**
   * Handle refresh button click
   */
  const handleRefresh = () => {
    refetch();
  };

  /**
   * Handle view change between grid and list
   */
  const handleViewChange = (newView) => {
    setView(newView);
  };

  /**
   * Handle sort change
   */
  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md">
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
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search, Filter, and View Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex-shrink-0">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
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

          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="completed">Sort by Completed</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>

          {/* View Toggle */}
          <ViewToggle view={view} onViewChange={handleViewChange} />

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Survey Statistics - Removed traffic light indicator */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Users size={20} />
              Running Surveys ({sortedSurveys.length})
            </h2>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {surveys
                .reduce((sum, survey) => sum + survey.Completed, 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Completed</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-full overflow-auto">
          {loading ? (
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(view === "grid" ? 6 : 5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    {view === "grid" ? (
                      <div className="p-4 border rounded-lg">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ) : (
                      <div className="h-12 bg-gray-200 rounded"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : sortedSurveys.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">
                  {searchTerm
                    ? "No surveys found matching your search"
                    : "No running surveys available"}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-2 text-blue-600 hover:text-blue-700"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>
          ) : view === "grid" ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedSurveys.map((survey) => (
                  <SurveyCard
                    key={survey.SurveyID}
                    survey={survey}
                    onSelect={() => onSurveySelect(survey)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <SurveyTable
              surveys={sortedSurveys}
              onSurveySelect={onSurveySelect}
              onSort={handleSortChange}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyList;
