import React from "react";
import {
  getStatusColor,
  getOverTargetColor,
  getProgressPercentage,
} from "../utils/helpers";

const QuotaResponse = ({ responseKey, responseData, isSubQuota = false }) => {
  const progressPercentage = getProgressPercentage(
    responseData.Completed,
    responseData.MinTarget
  );
  const hasSubQuotas =
    responseData.SubQuotas && Object.keys(responseData.SubQuotas).length > 0;

  return (
    <div
      className={`border rounded-lg p-4 ${
        isSubQuota ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h4
          className={`font-medium ${
            isSubQuota ? "text-gray-700" : "text-gray-900"
          }`}
        >
          {responseKey}
        </h4>
        <div className="flex gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              responseData.Status
            )}`}
          >
            {responseData.Status}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getOverTargetColor(
              responseData.AllowOverTarget
            )}`}
          >
            {responseData.AllowOverTarget}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {responseData.Completed}
          </div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {responseData.MinTarget}
          </div>
          <div className="text-sm text-gray-500">Min Target</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {responseData.MaxTarget}
          </div>
          <div className="text-sm text-gray-500">Max Target</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {responseData.ToDo}
          </div>
          <div className="text-sm text-gray-500">To Do</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {hasSubQuotas && (
        <div className="mt-4">
          <h5 className="font-medium text-gray-700 mb-3">Sub-Quotas</h5>
          <div className="space-y-3">
            {Object.entries(responseData.SubQuotas).map(
              ([subQuestionKey, subQuestionData]) => (
                <div
                  key={subQuestionKey}
                  className="border-l-4 border-blue-200 pl-4"
                >
                  <h6 className="font-medium text-gray-600 mb-2">
                    {subQuestionKey}
                  </h6>
                  <div className="space-y-2">
                    {Object.entries(subQuestionData).map(
                      ([subResponseKey, subResponseData]) => (
                        <QuotaResponse
                          key={subResponseKey}
                          responseKey={subResponseKey}
                          responseData={subResponseData}
                          isSubQuota={true}
                        />
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotaResponse;
