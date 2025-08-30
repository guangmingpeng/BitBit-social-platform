import { type FC } from "react";
import { Card, CardContent, Tag } from "@/components/ui";
import type { Activity } from "@/shared/types";

interface ActivityBasicInfoProps {
  activity: Activity;
}

const ActivityBasicInfo: FC<ActivityBasicInfoProps> = ({ activity }) => {
  const categoryConfig = {
    music: { variant: "music" as const, label: "音乐", emoji: "🎵" },
    food: { variant: "food" as const, label: "美食", emoji: "🍽️" },
    learning: { variant: "learning" as const, label: "学习", emoji: "📚" },
    reading: { variant: "reading" as const, label: "阅读", emoji: "📖" },
  };

  return (
    <div className="space-y-6">
      {/* 活动标题区 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {activity.title}
        </h1>
        <Tag
          variant={categoryConfig[activity.category].variant}
          size="md"
          className="mb-4"
        >
          {categoryConfig[activity.category].label}
        </Tag>
      </div>

      {/* 基本信息卡片 */}
      <Card className="bg-gray-50 border-0">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <span>📅</span>
                <span className="text-sm">活动时间</span>
              </div>
              <div className="font-medium text-gray-900 text-sm leading-relaxed">
                <div>{activity.date}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {activity.time}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <span>⏰</span>
                <span className="text-sm">报名截止</span>
              </div>
              <div className="font-medium text-gray-900 text-sm">
                {activity.registrationDeadline
                  ? new Date(activity.registrationDeadline).toLocaleString(
                      "zh-CN",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  : "暂未设置"}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <span>👥</span>
                <span className="text-sm">人数限制</span>
              </div>
              <div className="font-medium text-gray-900">
                {activity.maxParticipants}人 (已报名
                {activity.currentParticipants}人)
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <span>📍</span>
                <span className="text-sm">地点</span>
              </div>
              <div className="font-medium text-gray-900">
                {activity.location}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <span>💰</span>
                <span className="text-sm">费用</span>
              </div>
              <div className="font-medium text-gray-900">
                {activity.isFree ? "免费" : `¥${activity.price}/人`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityBasicInfo;
