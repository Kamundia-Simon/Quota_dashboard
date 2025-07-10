import React from "react";
import {
  ChevronUp,
  ChevronDown,
  Calendar,
  Users,
  Target,
  Eye,
} from "lucide-react";
import TrafficLight from "./Indicators";

/**
 * Survey Table Component
 * - Displays surveys in a table format
 * - Includes sorting functionality
 * - Shows traffic light indicators for survey progress
 * - Responsive design with clickable rows
 */
const SurveyTable = ({
  surveys,
  onSurveySelect,
  onSort,
  sortBy,
  sortOrder,
}) => {
  /**
   * Handle column header click for sorting
   */
  const handleSort = (column) => {
    onSort(column);
  };

  /**
   * Render sort icon based on current sort state
   */
  const renderSortIcon = (column) => {
    if (sortBy !== column) {
      return <ChevronUp size={16} className="text-gray-300" />;
    }
    return sortOrder === "asc" ? (
      <ChevronUp size={16} className="text-blue-600" />
    ) : (
      <ChevronDown size={16} className="text-blue-600" />
    );
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /**
   * Calculate completion percentage
   */
  const getCompletionPercentage = (completed, target) => {
    if (!target || target === 0) return 0;
    return Math.round((completed / target) * 100);
  };

  /**
   * Calculate gender quota completion for traffic light
   */
  const getGenderQuotaCompletion = (survey) => {
    if (!survey.Quotas || !Array.isArray(survey.Quotas))
      return { completed: 0, target: 0 };

    const genderQuotas = survey.Quotas.filter(
      (quota) => quota.Name && quota.Name.toLowerCase().includes("gender")
    );

    if (genderQuotas.length === 0) return { completed: 0, target: 0 };

    const totalCompleted = genderQuotas.reduce(
      (sum, quota) => sum + (quota.Completed || 0),
      0
    );
    const totalTarget = genderQuotas.reduce(
      (sum, quota) => sum + (quota.Target || 0),
      0
    );

    return { completed: totalCompleted, target: totalTarget };
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left p-4 font-medium text-gray-900">
              <button
                onClick={() => handleSort("name")}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                Survey Name
                {renderSortIcon("name")}
              </button>
            </th>
            <th className="text-left p-4 font-medium text-gray-900">
              Description
            </th>
            <th className="text-left p-4 font-medium text-gray-900">
              <button
                onClick={() => handleSort("completed")}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <Users size={16} />
                Completed
                {renderSortIcon("completed")}
              </button>
            </th>
            <th className="text-left p-4 font-medium text-gray-900">
              <Target size={16} className="inline mr-2" />
              Target
            </th>
            <th className="text-left p-4 font-medium text-gray-900">
              Progress
            </th>
            <th className="text-left p-4 font-medium text-gray-900">
              <button
                onClick={() => handleSort("date")}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <Calendar size={16} />
                Modified
                {renderSortIcon("date")}
              </button>
            </th>
            <th className="text-left p-4 font-medium text-gray-900">Status</th>
            <th className="text-center p-4 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {surveys.map((survey) => (
            <tr
              key={survey.SurveyID}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onSurveySelect(survey)}
            >
              <td className="p-4">
                <div className="font-medium text-gray-900 truncate max-w-xs">
                  {survey.Name}
                </div>
              </td>
              <td className="p-4">
                <div className="text-gray-600 text-sm truncate max-w-xs">
                  {survey.Description || "No description"}
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">
                    {survey.Completed?.toLocaleString() || 0}
                  </span>
                </div>
              </td>
              <td className="p-4">
                <span className="text-gray-600">
                  {survey.Target?.toLocaleString() || "N/A"}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {(() => {
                    const genderQuota = getGenderQuotaCompletion(survey);
                    return (
                      <>
                        <TrafficLight
                          completed={genderQuota.completed}
                          target={genderQuota.target}
                          size="sm"
                          showPercentage={false}
                        />
                        <span className="text-sm text-gray-600">
                          {getCompletionPercentage(
                            genderQuota.completed,
                            genderQuota.target
                          )}
                          %
                        </span>
                      </>
                    );
                  })()}
                </div>
              </td>
              <td className="p-4">
                <span className="text-sm text-gray-600">
                  {formatDate(survey.DateModified || survey.DateCreated)}
                </span>
              </td>
              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    survey.Status === "Active"
                      ? "bg-green-100 text-green-800"
                      : survey.Status === "Paused"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {survey.Status || "Active"}
                </span>
              </td>
              <td className="p-4 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSurveySelect(survey);
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="View Survey"
                >
                  <Eye size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurveyTable;
