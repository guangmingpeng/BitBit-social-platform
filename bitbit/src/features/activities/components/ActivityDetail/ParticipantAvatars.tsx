import { type FC, useState } from "react";
import { Button, Card, CardContent } from "@/components/ui";
import ParticipantCard from "./ParticipantCard";
import type { Activity } from "@/shared/types";

interface Participant {
  id: string;
  name: string;
  fullName?: string;
  avatar?: string;
  color: string;
  age?: number;
  profession?: string;
  location?: string;
  activitiesCount?: number;
  organizedCount?: number;
  tags?: string[];
  isFollowed?: boolean;
  isOrganizer?: boolean;
  isOnline?: boolean;
}

interface ParticipantAvatarsProps {
  activity: Activity;
  onViewAll?: () => void;
  onFollowParticipant?: (participantId: string) => void;
  onMessageParticipant?: (participantId: string) => void;
  onViewProfile?: (participantId: string) => void;
}

const ParticipantAvatars: FC<ParticipantAvatarsProps> = ({
  activity,
  onViewAll,
  onFollowParticipant,
  onMessageParticipant,
  onViewProfile,
}) => {
  const [hoveredParticipant, setHoveredParticipant] = useState<string | null>(
    null
  );

  // 模拟参与者数据 - 根据设计图的颜色方案，包含更详细的信息
  const participants: Participant[] = [
    {
      id: "org1",
      name: activity.organizer.username.slice(0, 2).toUpperCase(),
      fullName: activity.organizer.username,
      color: "#4E6FFF",
      age: 30,
      profession: "活动策划师",
      location: "杭州",
      activitiesCount: 25,
      organizedCount: 15,
      tags: ["户外", "摄影"],
      isOrganizer: true,
      isOnline: true,
      isFollowed: false,
    },
    {
      id: "1",
      name: "ZL",
      fullName: "张亮",
      color: "#65D1AA",
      age: 28,
      profession: "软件工程师",
      location: "杭州",
      activitiesCount: 5,
      organizedCount: 2,
      tags: ["摄影", "户外"],
      isOnline: true,
      isFollowed: false,
    },
    {
      id: "2",
      name: "XM",
      fullName: "小美",
      color: "#FF6B8B",
      age: 25,
      profession: "UI设计师",
      location: "上海",
      activitiesCount: 8,
      organizedCount: 0,
      tags: ["设计", "读书"],
      isOnline: false,
      isFollowed: true,
    },
    {
      id: "3",
      name: "LS",
      fullName: "李摄",
      color: "#8F7CFF",
      age: 32,
      profession: "摄影师",
      location: "北京",
      activitiesCount: 12,
      organizedCount: 3,
      tags: ["摄影", "旅行"],
      isOnline: false,
      isFollowed: false,
    },
    {
      id: "4",
      name: "WX",
      fullName: "文轩",
      color: "#FFB951",
      age: 26,
      profession: "产品经理",
      location: "深圳",
      activitiesCount: 7,
      organizedCount: 1,
      tags: ["产品", "科技"],
      isOnline: true,
      isFollowed: false,
    },
    {
      id: "5",
      name: "JL",
      fullName: "嘉丽",
      color: "#4E6FFF",
      age: 24,
      profession: "市场营销",
      location: "广州",
      activitiesCount: 3,
      organizedCount: 0,
      tags: ["营销", "社交"],
      isOnline: true,
      isFollowed: false,
    },
    {
      id: "6",
      name: "CY",
      fullName: "晨阳",
      color: "#65D1AA",
      age: 29,
      profession: "数据分析师",
      location: "杭州",
      activitiesCount: 6,
      organizedCount: 1,
      tags: ["数据", "分析"],
      isOnline: false,
      isFollowed: false,
    },
    {
      id: "7",
      name: "YN",
      fullName: "雨诺",
      color: "#FF6B8B",
      age: 27,
      profession: "教师",
      location: "南京",
      activitiesCount: 4,
      organizedCount: 0,
      tags: ["教育", "读书"],
      isOnline: false,
      isFollowed: false,
    },
  ];

  const displayParticipants = participants.slice(0, 7);
  const remainingCount = Math.max(0, activity.currentParticipants - 7);

  const handleMouseEnter = (participantId: string) => {
    setHoveredParticipant(participantId);
  };

  const handleMouseLeave = () => {
    setHoveredParticipant(null);
  };

  return (
    <div className="relative">
      <Card className="bg-white border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              已报名参与者 ({activity.currentParticipants}人)
            </h3>
            {activity.currentParticipants > 7 && (
              <Button variant="outline" size="sm" onClick={onViewAll}>
                查看全部
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {displayParticipants.map((participant, index) => (
              <div
                key={participant.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(participant.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* 头像 */}
                <div
                  className={`${
                    participant.isOrganizer ? "w-16 h-16" : "w-14 h-14"
                  } rounded-full flex items-center justify-center text-white font-medium text-sm relative cursor-pointer hover:scale-105 transition-transform`}
                  style={{ backgroundColor: participant.color }}
                >
                  {participant.name}

                  {/* 组织者标签 */}
                  {participant.isOrganizer && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-orange-400 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        组织者
                      </div>
                    </div>
                  )}

                  {/* 在线状态指示器 */}
                  {participant.isOnline && (
                    <div className="absolute -bottom-1 -right-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  )}
                </div>

                {/* 用户名 */}
                <div className="text-center mt-1">
                  <p className="text-xs text-gray-600 truncate w-16">
                    {participant.isOrganizer
                      ? activity.organizer.username
                      : participant.fullName || participant.name}
                  </p>
                </div>

                {/* 悬停显示的参与者卡片 - 固定在头像上方，智能调整位置 */}
                {hoveredParticipant === participant.id && (
                  <div
                    className={`absolute bottom-full mb-2 z-50 ${
                      index < 2
                        ? "left-0" // 前两个用户卡片左对齐
                        : index >= displayParticipants.length - 2
                        ? "right-0" // 后两个用户卡片右对齐
                        : "left-1/2 transform -translate-x-1/2" // 中间的用户卡片居中
                    }`}
                  >
                    <ParticipantCard
                      participant={participant}
                      onFollow={onFollowParticipant}
                      onMessage={onMessageParticipant}
                      onViewProfile={onViewProfile}
                      className="pointer-events-auto"
                    />
                  </div>
                )}
              </div>
            ))}

            {/* 更多参与者指示器 */}
            {remainingCount > 0 && (
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm cursor-pointer hover:bg-gray-200 transition-colors">
                  +{remainingCount}
                </div>
                <div className="text-center mt-1">
                  <p className="text-xs text-gray-600">更多</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantAvatars;
