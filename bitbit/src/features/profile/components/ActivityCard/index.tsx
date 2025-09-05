import React from "react";
import type { Activity } from "../../types";

interface ActivityCardProps {
  activity: Activity;
  onViewDetails?: () => void;
  onEdit?: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onViewDetails,
  onEdit,
}) => {
  const getStatusDisplay = () => {
    switch (activity.status) {
      case "registered":
        return {
          text: "已报名",
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
        };
      case "organized":
        return {
          text: "已组织",
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
        };
      case "ended":
      case "completed":
        return {
          text: "活动已结束",
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
        };
      default:
        return {
          text: "未知",
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
        };
    }
  };

  const status = getStatusDisplay();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex gap-4 p-6">
        {/* 活动图片 */}
        <div className="w-64 h-36 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 overflow-hidden">
          {activity.image ? (
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-3xl">🎭</span>
            </div>
          )}
        </div>

        {/* 活动信息 */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {activity.title}
            </h3>
            {activity.daysLeft !== undefined && (
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {activity.daysLeft > 0 ? `${activity.daysLeft}天后` : "今天"}
              </span>
            )}
          </div>

          <div className="inline-flex items-center mb-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${activity.categoryColor}`}
            >
              {activity.category}
            </span>
          </div>

          <p className="text-gray-900 font-medium mb-2">
            {activity.date} {activity.time} | {activity.location}
          </p>

          <p className="text-gray-600 text-sm mb-4 flex-1">
            {activity.description}
          </p>

          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-2 rounded-full text-sm ${status.bgColor} ${status.textColor}`}
            >
              {status.text}
            </span>

            {activity.status === "organized" ? (
              <button
                onClick={onEdit}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                编辑活动
              </button>
            ) : (
              <button
                onClick={onViewDetails}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                查看详情
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
