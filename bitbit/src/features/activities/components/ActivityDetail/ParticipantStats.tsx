import { type FC } from "react";
import { Card, CardContent } from "@/components/ui";
import type { Activity } from "@/shared/types";

interface ParticipantStatsProps {
  activity: Activity;
}

const ParticipantStats: FC<ParticipantStatsProps> = ({ activity }) => {
  const participationRate = Math.round(
    (activity.currentParticipants / activity.maxParticipants) * 100
  );
  const progressWidth = `${participationRate}%`;

  // 模拟性别和年龄分布数据
  const genderStats = {
    male: Math.floor(activity.currentParticipants * 0.6),
    female: Math.ceil(activity.currentParticipants * 0.4),
  };

  const ageStats = {
    young: Math.floor(activity.currentParticipants * 0.3), // 18-25岁
    middle: Math.ceil(activity.currentParticipants * 0.7), // 26-35岁
  };

  return (
    <Card className="bg-gray-50 border-0">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">参与情况</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 参与统计 */}
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-green-500">
                {activity.currentParticipants}
              </span>
              <span className="text-gray-600">
                / {activity.maxParticipants}人
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-3">已报名参与</p>

            {/* 进度条 */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: progressWidth }}
              />
            </div>
            <p className="text-sm text-gray-600">{participationRate}% 完成</p>
          </div>

          {/* 性别分布 */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-3">
              性别分布
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">
                  男 {genderStats.male}人
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                <span className="text-sm text-gray-600">
                  女 {genderStats.female}人
                </span>
              </div>
            </div>
          </div>

          {/* 年龄分布 */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-3">
              年龄分布
            </h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                18-25岁: {ageStats.young}人
              </p>
              <p className="text-sm text-gray-600">
                26-35岁: {ageStats.middle}人
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticipantStats;
