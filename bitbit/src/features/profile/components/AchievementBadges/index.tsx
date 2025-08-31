import React from "react";
import type { Achievement, LevelProgress } from "../../types";

interface AchievementBadgesProps {
  achievements: Achievement[];
  levelProgress: LevelProgress;
}

const getColorClasses = (color: string, isUnlocked: boolean) => {
  if (!isUnlocked) return "border-gray-300 bg-gray-50";

  switch (color) {
    case "yellow":
      return "border-yellow-500 bg-white";
    case "blue":
      return "border-blue-500 bg-white";
    case "pink":
      return "border-pink-500 bg-white";
    case "green":
      return "border-green-500 bg-white";
    default:
      return "border-gray-300 bg-gray-50";
  }
};

export const AchievementBadges: React.FC<AchievementBadgesProps> = ({
  achievements,
  levelProgress,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">我的成就</h3>

      <div className="flex flex-wrap gap-6 mb-8">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex flex-col items-center relative"
          >
            <div
              className={`
                w-20 h-20 rounded-full border-2 flex items-center justify-center mb-2
                ${getColorClasses(achievement.color, achievement.isUnlocked)}
              `}
            >
              <span className="text-2xl">{achievement.icon}</span>
            </div>
            {!achievement.isUnlocked && (
              <div className="absolute w-5 h-5 bg-white border border-gray-300 rounded-full flex items-center justify-center top-0 right-0">
                <span className="text-xs text-gray-500">?</span>
              </div>
            )}
            <span
              className={`text-sm font-medium text-center ${
                achievement.isUnlocked ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {achievement.title}
            </span>
          </div>
        ))}
      </div>

      {/* 等级进度 */}
      <div className="border-t border-gray-100 pt-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-base font-semibold text-gray-900">
            下一等级：Lv.{levelProgress.currentLevel + 1}
          </h4>
          <span className="text-sm font-medium text-blue-600">
            {levelProgress.currentExp}/{levelProgress.nextLevelExp}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          再获得{levelProgress.expToNext}点经验值升级
        </p>
        <div className="w-full bg-gray-100 rounded-full h-3.5">
          <div
            className="bg-blue-600 h-3.5 rounded-full transition-all duration-300"
            style={{
              width: `${
                (levelProgress.currentExp / levelProgress.nextLevelExp) * 100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
