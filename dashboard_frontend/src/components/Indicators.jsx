import React from "react";

/**
 * Traffic Light Component
 * Shows progress status using colored indicators (Red/Yellow/Green)
 * - Red: 0-50% completion
 * - Yellow: 51-80% completion
 * - Green: 81-100% completion
 */
const TrafficLight = ({
  completed,
  target,
  size = "md",
  showPercentage = true,
  className = "",
}) => {
  /**
   * Calculate completion percentage
   */
  const percentage = target > 0 ? Math.min((completed / target) * 100, 100) : 0;

  /**
   * Determine traffic light color based on completion percentage
   */
  const getTrafficLightColor = () => {
    if (percentage >= 81) return "green";
    if (percentage >= 51) return "yellow";
    return "red";
  };

  /**
   * Get size classes for different traffic light sizes
   */
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-3 h-3";
      case "lg":
        return "w-6 h-6";
      case "xl":
        return "w-8 h-8";
      default:
        return "w-4 h-4";
    }
  };

  /**
   * Get color classes for traffic light states
   */
  const getColorClasses = (color) => {
    const baseClasses = "rounded-full border-2 transition-all duration-300";

    switch (color) {
      case "green":
        return `${baseClasses} bg-green-500 border-green-600 shadow-green-200 shadow-md`;
      case "yellow":
        return `${baseClasses} bg-yellow-500 border-yellow-600 shadow-yellow-200 shadow-md`;
      case "red":
        return `${baseClasses} bg-red-500 border-red-600 shadow-red-200 shadow-md`;
      default:
        return `${baseClasses} bg-gray-300 border-gray-400`;
    }
  };

  const activeColor = getTrafficLightColor();
  const sizeClasses = getSizeClasses();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Traffic Light Indicator */}
      <div className="flex items-center gap-1">
        <div
          className={`${sizeClasses} ${getColorClasses(
            activeColor === "red" ? "red" : ""
          )} 
          ${activeColor === "red" ? "opacity-100" : "opacity-30"}`}
        />
        <div
          className={`${sizeClasses} ${getColorClasses(
            activeColor === "yellow" ? "yellow" : ""
          )} 
          ${activeColor === "yellow" ? "opacity-100" : "opacity-30"}`}
        />
        <div
          className={`${sizeClasses} ${getColorClasses(
            activeColor === "green" ? "green" : ""
          )} 
          ${activeColor === "green" ? "opacity-100" : "opacity-30"}`}
        />
      </div>

      {/* Percentage Display */}
      {showPercentage && (
        <span
          className={`font-medium ${
            activeColor === "green"
              ? "text-green-600"
              : activeColor === "yellow"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {Math.round(percentage)}%
        </span>
      )}

      {/* Progress Details */}
      <span className="text-xs text-gray-500">
        ({completed}/{target})
      </span>
    </div>
  );
};

export default TrafficLight;
