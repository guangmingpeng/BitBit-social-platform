import { type FC } from "react";
import { Button, Card, CardContent } from "@/components/ui";
import type { Activity } from "@/shared/types";

interface ParticipantDetail {
  id: string;
  name: string;
  avatar?: string;
  color: string;
  age: number;
  profession: string;
  location: string;
  activitiesCount: number;
  organizedCount: number;
  tags: string[];
  isFollowed?: boolean;
  isOrganizer?: boolean;
}

interface ParticipantDetailsProps {
  activity?: Activity;
  participants?: ParticipantDetail[];
  onFollow?: (participantId: string) => void;
  onMessage?: (participantId: string) => void;
}

const ParticipantDetails: FC<ParticipantDetailsProps> = ({
  participants,
  onFollow,
  onMessage,
}) => {
  // 模拟详细参与者数据
  const defaultParticipants: ParticipantDetail[] = [
    {
      id: "1",
      name: "张亮",
      color: "#4E6FFF",
      age: 28,
      profession: "软件工程师",
      location: "杭州",
      activitiesCount: 5,
      organizedCount: 2,
      tags: ["摄影", "户外"],
      isFollowed: false,
    },
    {
      id: "2",
      name: "小美",
      color: "#FF6B8B",
      age: 25,
      profession: "UI设计师",
      location: "上海",
      activitiesCount: 8,
      organizedCount: 0,
      tags: ["设计", "读书"],
      isFollowed: true,
    },
  ];

  const displayParticipants = participants || defaultParticipants;

  const handleFollow = (participantId: string) => {
    if (onFollow) {
      onFollow(participantId);
    }
  };

  const handleMessage = (participantId: string) => {
    if (onMessage) {
      onMessage(participantId);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">参与者详情</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayParticipants.map((participant) => (
          <Card key={participant.id} className="border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {/* 头像 */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-medium text-lg"
                    style={{ backgroundColor: participant.color }}
                  >
                    {participant.name.slice(0, 2)}
                  </div>

                  {/* 用户信息 */}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {participant.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {participant.profession} · {participant.age}岁 ·{" "}
                      {participant.location}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      参与过{participant.activitiesCount}次活动 ·
                      {participant.organizedCount > 0
                        ? `组织过${participant.organizedCount}次活动`
                        : "新人"}
                    </p>

                    {/* 兴趣标签 */}
                    <div className="flex gap-2 mb-3">
                      {participant.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant={participant.isFollowed ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => handleFollow(participant.id)}
                  >
                    {participant.isFollowed ? "已关注" : "关注"}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleMessage(participant.id)}
                  >
                    私信
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ParticipantDetails;
