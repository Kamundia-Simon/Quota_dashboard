import React from "react";
import { Grid, List } from "lucide-react";

/**
 * View Toggle Component
 * Allows users to switch between grid/card view and list/table view
 * - Grid view: Card-based layout with visual emphasis
 * - List view: Table-like layout with compact information
 */
const ViewToggle = ({ view, onViewChange, className = "" }) => {
  return (
    <div
      className={`flex items-center bg-gray-100 rounded-lg p-1 ${className}`}
    >
      {/* Grid View Button */}
      <button
        onClick={() => onViewChange("grid")}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
          view === "grid"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        title="Grid View"
      >
        <Grid size={16} />
        <span className="text-sm font-medium hidden sm:inline">Grid</span>
      </button>

      {/* List View Button */}
      <button
        onClick={() => onViewChange("list")}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
          view === "list"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        title="List View"
      >
        <List size={16} />
        <span className="text-sm font-medium hidden sm:inline">List</span>
      </button>
    </div>
  );
};

export default ViewToggle;
