import React from "react";
import type { Activity } from "../../types";

interface CompactActivityCardProps {
  activity: Activity;
  onViewDetails?: () => void;
  onEdit?: () => void;
  onNotify?: () => void; // 新增通知功能
}

export const CompactActivityCard: React.FC<CompactActivityCardProps> = ({
  activity,
  onViewDetails,
  onNotify,
}) => {
  const getStatusDisplay = () => {
    switch (activity.status) {
      case "registered":
        return {
          text: "已报名",
          bgColor: "bg-blue-50",
          textColor: "text-blue-600",
        };
      case "organized":
        return {
          text: "已组织",
          bgColor: "bg-green-50",
          textColor: "text-green-600",
        };
      case "ended":
      case "completed":
        return {
          text: "活动已结束",
          bgColor: "bg-gray-50",
          textColor: "text-gray-500",
        };
      default:
        return {
          text: "未知",
          bgColor: "bg-gray-50",
          textColor: "text-gray-500",
        };
    }
  };

  const status = getStatusDisplay();
  const isOrganized = activity.status === "organized";
  const isEnded =
    activity.status === "ended" || activity.status === "completed";

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 p-4">
      <div className="flex gap-3">
        {/* 紧凑的活动图片 */}
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 overflow-hidden">
          {activity.image ? (
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-lg">🎭</span>
            </div>
          )}
        </div>

        {/* 活动信息 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
              {activity.title}
            </h3>
            {activity.daysLeft !== undefined && (
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                {activity.daysLeft > 0 ? `${activity.daysLeft}天后` : "今天"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${activity.categoryColor}`}
            >
              {activity.category}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-xs ${status.bgColor} ${status.textColor}`}
            >
              {status.text}
            </span>
          </div>

          <p className="text-xs text-gray-600 mb-2">
            {activity.date} {activity.time} | {activity.location}
          </p>

          <div className="flex items-center gap-2">
            {isOrganized && !isEnded ? (
              <>
                <button
                  onClick={onNotify}
                  className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                >
                  发布通知
                </button>
                <button
                  onClick={onViewDetails}
                  className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-md hover:bg-gray-50 transition-colors"
                >
                  查看详情
                </button>
              </>
            ) : (
              <button
                onClick={onViewDetails}
                className="px-3 py-1 border border-blue-600 text-blue-600 text-xs rounded-md hover:bg-blue-50 transition-colors"
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
