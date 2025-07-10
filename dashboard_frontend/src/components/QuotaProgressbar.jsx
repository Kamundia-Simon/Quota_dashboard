import React from "react";

/**
 * Quota Progress Bar Component
 * - Shows progress bar for individual quotas
 * - Red portion when exceeding 100% (over min target)
 * - Handles min target vs max target logic
 * - Shows percentage completion
 */
const QuotaProgressBar = ({
  completed,
  minTarget,
  maxTarget,
  className = "",
  showPercentage = true,
}) => {
  // Calculate completion percentage based on min target
  const completionPercentage =
    minTarget > 0 ? (completed / minTarget) * 100 : 0;
  const isOverTarget = completionPercentage > 100;

  // For display: cap the green portion at 100%
  const greenPercentage = Math.min(completionPercentage, 100);

  // Red portion: everything over 100%
  const redPercentage = Math.max(completionPercentage - 100, 0);

  // Calculate how much red to show (cap at reasonable display limit)
  const maxDisplayPercentage = 150; // Show up to 150% total width
  const displayRedPercentage = Math.min(
    redPercentage,
    maxDisplayPercentage - 100
  );

  // Determine progress bar color for the main portion
  const getProgressColor = () => {
    if (completionPercentage >= 100) return "bg-green-500";
    if (completionPercentage >= 80) return "bg-blue-500";
    if (completionPercentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        {showPercentage && (
          <span
            className={`text-sm font-medium ${
              isOverTarget ? "text-red-600" : "text-gray-600"
            }`}
          >
            {Math.round(completionPercentage)}%
          </span>
        )}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 relative overflow-hidden">
        {/* Main progress bar (up to 100%) */}
        <div
          className={`h-full ${getProgressColor()} transition-all duration-500`}
          style={{ width: `${greenPercentage}%` }}
        />

        {/* Over-target portion (red) - only show if over target */}
        {isOverTarget && (
          <div
            className="absolute top-0 h-full bg-red-500 transition-all duration-500"
            style={{
              left: `${greenPercentage}%`,
              width: `${displayRedPercentage}%`,
            }}
          />
        )}

        {/* Target markers */}
        {minTarget > 0 && (
          <div
            className="absolute top-0 h-full w-0.5 bg-green-800 z-10"
            style={{ left: "100%" }}
            title={`Min Target: ${minTarget}`}
          />
        )}

        {maxTarget > minTarget && (
          <div
            className="absolute top-0 h-full w-0.5 bg-purple-600 z-10"
            style={{
              left: `${Math.min(
                (maxTarget / minTarget) * 100,
                maxDisplayPercentage
              )}%`,
            }}
            title={`Max Target: ${maxTarget}`}
          />
        )}
      </div>

      {/* Status indicators */}
      <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
        <span>
          {completed.toLocaleString()} / {minTarget.toLocaleString()}
          {maxTarget > minTarget && ` (max: ${maxTarget.toLocaleString()})`}
        </span>

        {isOverTarget && (
          <span className="text-red-600 font-medium">
            Over Target by {Math.round(redPercentage)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default QuotaProgressBar;
